import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, X, Download, ExternalLink } from "lucide-react";
import profileImg from "@/image/1767262655546.png";
import SideRays from "./SideRays";

const CV_URL = encodeURI("/CV Sibgah RK.pdf");

const ROLES = [
  "Web Developer",
  "Mobile Developer",
  "UI/UX Designer",
  "IoT Engineer",
  "Graphic Design",
  "Video Editor",
];

const TYPING_SPEED_MS = 70;
const DELETING_SPEED_MS = 40;
const PAUSE_AFTER_TYPE_MS = 1600;
const PAUSE_AFTER_DELETE_MS = 300;

export default function Hero() {
  const [cvOpen, setCvOpen] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);
  const [typedRole, setTypedRole] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!cvOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setCvOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [cvOpen]);

  useEffect(() => {
    const currentRole = ROLES[roleIndex];

    if (!isDeleting && typedRole === currentRole) {
      const timeout = setTimeout(
        () => setIsDeleting(true),
        PAUSE_AFTER_TYPE_MS,
      );
      return () => clearTimeout(timeout);
    }

    if (isDeleting && typedRole === "") {
      const timeout = setTimeout(() => {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % ROLES.length);
      }, PAUSE_AFTER_DELETE_MS);
      return () => clearTimeout(timeout);
    }

    const nextLength = typedRole.length + (isDeleting ? -1 : 1);
    const timeout = setTimeout(
      () => setTypedRole(currentRole.slice(0, nextLength)),
      isDeleting ? DELETING_SPEED_MS : TYPING_SPEED_MS,
    );
    return () => clearTimeout(timeout);
  }, [typedRole, isDeleting, roleIndex]);

  return (
    <section id="home" className="hero">
      {/* SideRays background */}
      <div className="hero-siderays">
        <SideRays
          speed={2.5}
          rayColor1="#EAB308"
          rayColor2="#96c8ff"
          intensity={2}
          spread={2}
          origin="top-right"
          tilt={0}
          saturation={1.5}
          blend={0.75}
          falloff={1.6}
          opacity={1.0}
        />
      </div>

      {/* Noise overlay for texture */}
      <div className="noise-overlay" />

      {/* Giant PORTFOLIO background text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, ease: "easeOut" }}
        className="hero-portfolio-text"
      >
        portfolio
      </motion.div>

      {/* Content overlay */}
      <div className="hero-content">
        {/* Left side: Name, role, description */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="hero-left"
        >
          <span className="hero-greeting">Hello, I'm</span>
          <h1 className="hero-name">
            SIBGAH
            <br />
            RABBANI
            <br />
            KUSUMA
          </h1>

          <div className="hero-role">
            <span className="hero-role-text">{typedRole}</span>
            <span className="hero-role-cursor" aria-hidden="true" />
          </div>
          <p className="hero-description">
            I design and build stylish, user-focused mobile & web experiences
            that combine creativity with strategy. Passionate about clean
            design, smooth interactions, and details that make a difference.
          </p>
          <button
            type="button"
            className="hero-cv-btn"
            onClick={() => setCvOpen(true)}
          >
            <FileText className="hero-cv-btn-icon" aria-hidden />
            <span>View CV</span>
          </button>
        </motion.div>

        {/* Photo sits below the name. This lives as a sibling of .hero-left
            (not nested inside it) because .hero-left is a motion.div that
            animates its own `y` — any element with a non-none `transform`
            becomes the containing block for its absolutely-positioned
            descendants (per the CSS spec), regardless of that element's own
            `position`. Nesting .hero-photo-container inside .hero-left would
            silently position it relative to .hero-left's animating box
            instead of .hero's box, causing it to visibly drift while the
            entrance animation plays. The outer div here owns the static
            centering transform (translateX(-50%)); the inner motion.div only
            handles the fade-in, since Framer Motion would otherwise
            overwrite that CSS transform with its own inline one. */}
        <div className="hero-photo-container">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.9,
              delay: 0.3,
              ease: "easeOut",
            }}
          >
            <img src={profileImg} alt="Sibgah Rabbani Kusuma" />
          </motion.div>
        </div>

        {/* Right side: Tagline bubble + stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="hero-right"
        >
          <div className="hero-tagline-bubble">
            <p>Turning ideas into powerful digital experiences.</p>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <motion.span
                className="hero-stat-number"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.6,
                  delay: 1.0,
                  type: "spring",
                  stiffness: 200,
                }}
              >
                1+
              </motion.span>
              <span className="hero-stat-label">YEARS EXPERIENCE</span>
            </div>
            <div className="hero-stat">
              <motion.span
                className="hero-stat-number"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.6,
                  delay: 1.15,
                  type: "spring",
                  stiffness: 200,
                }}
              >
                10+
              </motion.span>
              <span className="hero-stat-label">PROJECTS COMPLETED</span>
            </div>
            <div className="hero-stat">
              <motion.span
                className="hero-stat-number"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.6,
                  delay: 1.3,
                  type: "spring",
                  stiffness: 200,
                }}
              >
                10+
              </motion.span>
              <span className="hero-stat-label">HAPPY CLIENTS</span>
            </div>
          </div>
        </motion.div>
      </div>
      {/* CV Modal */}
      <AnimatePresence>
        {cvOpen && (
          <motion.div
            className="cv-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setCvOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="CV preview"
          >
            <motion.div
              className="cv-modal"
              initial={{ opacity: 0, y: 24, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="cv-modal-header">
                <div className="cv-modal-title">
                  <FileText aria-hidden />
                  <span>CV — Sibgah Rabbani Kusuma</span>
                </div>
                <div className="cv-modal-actions">
                  <a
                    href={CV_URL}
                    download="CV Sibgah RK.pdf"
                    className="cv-modal-action"
                    title="Download CV"
                  >
                    <Download aria-hidden />
                  </a>
                  <a
                    href={CV_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cv-modal-action"
                    title="Open in new tab"
                  >
                    <ExternalLink aria-hidden />
                  </a>
                  <button
                    type="button"
                    className="cv-modal-action"
                    onClick={() => setCvOpen(false)}
                    aria-label="Close"
                  >
                    <X aria-hidden />
                  </button>
                </div>
              </div>
              <div className="cv-modal-body">
                <iframe
                  src={CV_URL}
                  title="CV Sibgah Rabbani Kusuma"
                  className="cv-modal-frame"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
