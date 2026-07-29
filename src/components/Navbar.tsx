import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Home,
  Briefcase,
  LayoutGrid,
  History,
  Mail,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "@/theme";

const navLinks = [
  { label: "Home", path: "/", hash: "home" },
  { label: "About", path: "/", hash: "about" },
  { label: "Work", path: "/", hash: "projects" },
  { label: "Portfolio", path: "/portfolio", hash: null },
  { label: "Experience", path: "/", hash: "experience" },
  { label: "Services", path: "/", hash: "services" },
  { label: "Contact", path: "/", hash: "contact" },
];

// A focused subset for the mobile bottom tab bar.
const tabLinks = [
  { label: "Home", path: "/", hash: "home", icon: Home },
  { label: "Work", path: "/", hash: "projects", icon: Briefcase },
  { label: "Portfolio", path: "/portfolio", hash: null, icon: LayoutGrid },
  { label: "Experience", path: "/", hash: "experience", icon: History },
  { label: "Contact", path: "/", hash: "contact", icon: Mail },
];

interface NavLink {
  label: string;
  path: string;
  hash: string | null;
}

const NAV_OFFSET = 88;

function scrollToId(id: string, behavior: ScrollBehavior = "smooth") {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
  window.scrollTo({ top, behavior });
}

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const shellRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [activeHash, setActiveHash] = useState("");
  const [glowing, setGlowing] = useState(false);
  const pinnedHashRef = useRef<string | null>(null);
  const releasePinRef = useRef<() => void>(() => {});
  // Track previous pathname so hash jumps from /portfolio (etc.) land
  // instantly on the section instead of animating down from Home.
  const prevPathRef = useRef(location.pathname);

  // Pin the active tab to a target section immediately (optimistic), ignoring
  // scroll-based detection until the resulting smooth-scroll settles. Without
  // this, jumping from e.g. /portfolio to a far-down section on "/" briefly
  // renders at scrollY 0, so the scroll tracker below would flash "Home" and
  // sweep through every section it passes on the way to the real target.
  function pinActive(hash: string) {
    releasePinRef.current();
    pinnedHashRef.current = hash;
    setActiveHash(hash);

    const release = () => {
      pinnedHashRef.current = null;
      window.removeEventListener("scrollend", release);
      window.removeEventListener("wheel", release);
      window.removeEventListener("touchstart", release);
      window.clearTimeout(timeoutId);
    };
    window.addEventListener("scrollend", release, { passive: true });
    window.addEventListener("wheel", release, { passive: true });
    window.addEventListener("touchstart", release, { passive: true });
    const timeoutId = window.setTimeout(release, 1600);
    releasePinRef.current = release;
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll to hash after route change (e.g. from /portfolio → /#experience).
  // useLayoutEffect + instant scroll when coming from another page so the
  // hero entrance never plays while we "start from home".
  useLayoutEffect(() => {
    const cameFromOtherPage = prevPathRef.current !== "/";
    prevPathRef.current = location.pathname;

    if (location.pathname !== "/") return;
    const hash = location.hash.replace("#", "");
    if (!hash) return;

    pinActive(hash);

    const behavior: ScrollBehavior = cameFromOtherPage ? "auto" : "smooth";
    scrollToId(hash, behavior);

    // Retry once after paint in case section layout settles late.
    const raf = window.requestAnimationFrame(() => {
      scrollToId(hash, behavior);
    });
    return () => window.cancelAnimationFrame(raf);
  }, [location.pathname, location.hash]);

  // Highlight current section while scrolling on home
  useEffect(() => {
    if (location.pathname !== "/") {
      setActiveHash("");
      return;
    }

    const sectionIds = navLinks
      .map((l) => l.hash)
      .filter((h): h is string => Boolean(h));

    const onScroll = () => {
      if (pinnedHashRef.current) return;

      const probe = window.scrollY + 120;
      let current = sectionIds[0] ?? "";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= probe) current = id;
      }
      setActiveHash(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [location.pathname]);

  function handleShellMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = shellRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--nav-glow-x", `${x}%`);
    el.style.setProperty("--nav-glow-y", `${y}%`);
  }

  function isActive(link: NavLink) {
    if (link.path === "/portfolio") {
      return location.pathname.startsWith("/portfolio");
    }
    if (location.pathname !== "/") return false;
    return link.hash === activeHash;
  }

  function handleNavClick(e: React.MouseEvent, link: NavLink) {
    e.preventDefault();

    if (link.path === "/portfolio") {
      navigate("/portfolio");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const hash = link.hash ?? "home";
    pinActive(hash);

    if (!link.hash) {
      navigate("/");
      return;
    }

    if (location.pathname === "/") {
      navigate(`/#${link.hash}`, { replace: true });
      scrollToId(link.hash, "smooth");
      return;
    }

    // Cross-route: navigate with hash; useLayoutEffect jumps instantly.
    navigate(`/#${link.hash}`);
  }

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className={`nav-header ${scrolled ? "is-scrolled" : ""}`}
      >
        <div
          ref={shellRef}
          className={`nav-shell nav-shell--links-only ${glowing ? "is-glowing" : ""}`}
          onMouseMove={handleShellMove}
          onMouseEnter={() => setGlowing(true)}
          onMouseLeave={() => setGlowing(false)}
        >
          <div className="nav-shell-glow" aria-hidden="true" />
          <nav className="nav-links" aria-label="Primary">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.hash ? `/#${link.hash}` : link.path}
                className={`nav-link ${isActive(link) ? "is-active" : ""}`}
                onClick={(e) => handleNavClick(e, link)}
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={
                theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
              }
              title={theme === "dark" ? "Light mode" : "Dark mode"}
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </nav>
        </div>
      </motion.header>

      <button
        type="button"
        className="theme-toggle theme-toggle--mobile"
        onClick={toggleTheme}
        aria-label={
          theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
        }
        title={theme === "dark" ? "Light mode" : "Dark mode"}
      >
        {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
      </button>

      <motion.nav
        className="mobile-tabbar"
        aria-label="Mobile primary"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      >
        {tabLinks.map((link) => {
          const Icon = link.icon;
          const active = isActive(link);
          return (
            <a
              key={link.label}
              href={link.hash ? `/#${link.hash}` : link.path}
              className={`mobile-tab ${active ? "is-active" : ""}`}
              aria-label={link.label}
              onClick={(e) => handleNavClick(e, link)}
            >
              <Icon size={20} strokeWidth={active ? 2.25 : 1.75} />
              <span className="mobile-tab-label">{link.label}</span>
            </a>
          );
        })}
      </motion.nav>
    </>
  );
}
