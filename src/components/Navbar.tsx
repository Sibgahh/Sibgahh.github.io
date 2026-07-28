import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Briefcase, LayoutGrid, History, Mail } from "lucide-react";

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

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const offset = 88;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: "smooth" });
}

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const shellRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [activeHash, setActiveHash] = useState("");
  const [glowing, setGlowing] = useState(false);
  const pinnedHashRef = useRef<string | null>(null);
  const releasePinRef = useRef<() => void>(() => {});

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

  // Scroll to hash after route change (e.g. from /portfolio → /#services)
  useEffect(() => {
    if (location.pathname !== "/") return;
    const hash = location.hash.replace("#", "");
    if (!hash) return;
    pinActive(hash);
    const timer = window.setTimeout(() => scrollToId(hash), 80);
    return () => window.clearTimeout(timer);
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

    pinActive(link.hash ?? "home");

    if (!link.hash) {
      navigate("/");
      return;
    }

    if (location.pathname === "/") {
      navigate(`/#${link.hash}`, { replace: true });
      scrollToId(link.hash);
      return;
    }

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
          </nav>
        </div>
      </motion.header>

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
