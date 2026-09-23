import type { SVGProps } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function ArrowUpRight() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="footer-pill-arrow"
    >
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  )
}

function PhoneIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

function MailIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}

function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

function TikTokIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  )
}

interface NavItem {
  label: string
  hash: string
}

const quickLinks: NavItem[] = [
  { label: 'About', hash: 'about' },
  { label: 'Services', hash: 'services' },
  { label: 'Projects', hash: 'projects' },
  { label: 'Experience', hash: 'experience' },
]

export default function Footer() {
  const navigate = useNavigate()
  const location = useLocation()

  function scrollToSection(hash: string) {
    if (location.pathname !== '/') {
      navigate(`/#${hash}`)
      return
    }
    const el = document.getElementById(hash)
    if (el) {
      const offset = 80
      const top = el.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <footer className="footer-redesign">
      <div className="footer-redesign-container">
        {/* --- Top 3-Column Info Row --- */}
        <div className="footer-top-grid">
          {/* Left Column: Mission & CTA Button */}
          <div className="footer-top-col footer-col-pitch">
            <h3 className="footer-pitch-heading">
              Not just a website,
              <br />
              real business results
            </h3>

            <button
              type="button"
              onClick={() => scrollToSection('contact')}
              className="footer-start-project-btn"
            >
              <span>Start a Project</span>
              <span className="footer-btn-circle" aria-hidden="true">
                <ArrowUpRight />
              </span>
            </button>
          </div>

          {/* Middle Column: Quick Links */}
          <div className="footer-top-col footer-col-links">
            <h4 className="footer-section-title">Quick Links</h4>
            <nav className="footer-nav-list">
              {quickLinks.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => scrollToSection(item.hash)}
                  className="footer-nav-link"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Right Column: Contact System */}
          <div className="footer-top-col footer-col-contact">
            <h4 className="footer-section-title">Contact System</h4>
            <div className="footer-contact-system-list">
              <a
                href="https://wa.me/6281314147941"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-contact-row"
              >
                <span className="footer-contact-icon-chip" aria-hidden="true">
                  <PhoneIcon className="footer-contact-icon-svg" />
                </span>
                <span className="footer-contact-text">+62 813-1414-7941</span>
              </a>

              <a
                href="https://www.linkedin.com/in/sibgah/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-contact-row"
              >
                <span className="footer-contact-icon-chip" aria-hidden="true">
                  <LinkedinIcon className="footer-contact-icon-svg" />
                </span>
                <span className="footer-contact-text">linkedin.com/in/sibgah</span>
              </a>

              <a
                href="mailto:sibgahrk190@gmail.com"
                className="footer-contact-row"
              >
                <span className="footer-contact-icon-chip" aria-hidden="true">
                  <MailIcon className="footer-contact-icon-svg" />
                </span>
                <span className="footer-contact-text">sibgahrk190@gmail.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* --- Giant SIBGAH Watermark Banner --- */}
        <div className="footer-giant-watermark-wrap" aria-hidden="true">
          <span className="footer-giant-watermark-text">SIBGAH</span>
        </div>

        {/* --- Bottom Row: Socials & Copyright --- */}
        <div className="footer-bottom-bar">
          <div className="footer-social-chips">
            <a
              href="https://www.linkedin.com/in/sibgah/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-chip"
              aria-label="LinkedIn"
            >
              <LinkedinIcon />
            </a>

            <a
              href="https://www.instagram.com/sibgahh/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-chip"
              aria-label="Instagram"
            >
              <InstagramIcon />
            </a>

            <a
              href="https://www.tiktok.com/@hypernutss"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-chip"
              aria-label="TikTok"
            >
              <TikTokIcon />
            </a>
          </div>

          <div className="footer-copyright">
            <span>© {new Date().getFullYear()}. SIBGAH - All rights reserved</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
