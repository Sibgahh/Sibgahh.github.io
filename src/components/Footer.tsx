import type { SVGProps } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Mail, Phone, MapPin } from 'lucide-react'

function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
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
      xmlns="http://www.w3.org/2000/svg"
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
      xmlns="http://www.w3.org/2000/svg"
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

interface FooterLink {
  label: string
  path: string
  hash: string | null
}

const quickLinks: FooterLink[] = [
  { label: 'Home', path: '/', hash: 'home' },
  { label: 'About', path: '/', hash: 'about' },
  { label: 'Work', path: '/', hash: 'projects' },
  { label: 'Portfolio', path: '/portfolio', hash: null },
  { label: 'Experience', path: '/', hash: 'experience' },
  { label: 'Contact', path: '/', hash: 'contact' },
]

const serviceLinks: FooterLink[] = [
  { label: 'Web Development', path: '/', hash: 'services' },
  { label: 'Mobile App Development', path: '/', hash: 'services' },
  { label: 'UI/UX Design', path: '/', hash: 'services' },
  { label: 'Video Editing', path: '/', hash: 'services' },
  { label: 'Graphic Design', path: '/', hash: 'services' },
]

const contactInfo = [
  {
    icon: Mail,
    label: 'sibgahrk190@gmail.com',
    href: 'mailto:sibgahrk190@gmail.com',
  },
  {
    icon: Phone,
    label: '+62 813-1414-7941',
    href: 'tel:+6281314147941',
  },
  {
    icon: MapPin,
    label: 'Tangerang, Indonesia',
    href: undefined,
  },
]

const socials = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/sibgah/',
    icon: LinkedinIcon,
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/sibgahh/',
    icon: InstagramIcon,
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@hypernutss',
    icon: TikTokIcon,
  },
  {
    label: 'Email',
    href: 'mailto:sibgahrk190@gmail.com',
    icon: Mail,
  },
  {
    label: 'Phone',
    href: 'tel:+6281314147941',
    icon: Phone,
  },
]

function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const offset = 88
  const top = el.getBoundingClientRect().top + window.scrollY - offset
  window.scrollTo({ top, behavior: 'smooth' })
}

export default function Footer() {
  const navigate = useNavigate()
  const location = useLocation()

  function handleLinkClick(e: React.MouseEvent, link: FooterLink) {
    e.preventDefault()

    if (link.path === '/portfolio') {
      navigate('/portfolio')
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    if (!link.hash) {
      navigate('/')
      return
    }

    if (location.pathname === '/') {
      navigate(`/#${link.hash}`, { replace: true })
      scrollToId(link.hash)
      return
    }

    navigate(`/#${link.hash}`)
  }

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="footer-logo-text">Sibgah R. Kusuma</span>
            </div>
            <p className="footer-tagline">
              I design and build stylish, user-focused mobile &amp; web
              experiences that combine creativity with strategy.
            </p>
            <div className="footer-socials">
              {socials.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  className="footer-social"
                  aria-label={label}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  <Icon className="footer-social-icon" aria-hidden />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h3 className="footer-col-title">Quick Links</h3>
            <nav className="footer-links">
              {quickLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.hash ? `/#${link.hash}` : link.path}
                  className="footer-link"
                  onClick={(e) => handleLinkClick(e, link)}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div className="footer-col">
            <h3 className="footer-col-title">Services</h3>
            <nav className="footer-links">
              {serviceLinks.map((link) => (
                <a
                  key={link.label}
                  href={`/#${link.hash}`}
                  className="footer-link"
                  onClick={(e) => handleLinkClick(e, link)}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="footer-col">
            <h3 className="footer-col-title">Contact Info</h3>
            <div className="footer-contact-list">
              {contactInfo.map(({ icon: Icon, label, href }) => {
                const Wrapper = href ? 'a' : 'div'
                const linkProps = href ? { href } : {}
                return (
                  <Wrapper
                    key={label}
                    className="footer-contact-item"
                    {...(linkProps as any)}
                  >
                    <Icon className="footer-contact-icon" aria-hidden />
                    <span>{label}</span>
                  </Wrapper>
                )
              })}
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            Copyright {new Date().getFullYear()} Sibgah Rabbani Kusuma. All
            rights reserved.
          </span>
        </div>
      </div>
    </footer>
  )
}
