import { motion } from 'framer-motion'

const contactItems = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
    label: 'EMAIL',
    value: 'sibgahrk190@gmail.com',
    href: 'mailto:sibgahrk190@gmail.com',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    ),
    label: 'LINKEDIN',
    value: 'linkedin.com/in/sibgah',
    href: 'https://www.linkedin.com/in/sibgah/',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    label: 'PHONE',
    value: '+62 813-1414-7941',
    href: 'tel:+6281314147941',
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    label: 'LOCATION',
    value: 'Tangerang, Indonesia',
    href: undefined,
  },
]

export default function Contact() {
  return (
    <section id="contact" className="contact-section">
      <div className="contact-grid">
        {/* Left side */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="contact-left"
        >
          <h2>
            LET'S WORK<br />TOGETHER
          </h2>
          <p className="contact-description">
            I'm currently open for new projects and collaborations. Let's create 
            something amazing that drives results.
          </p>
          <a href="mailto:sibgahrk190@gmail.com" className="contact-freelance-badge">
            <span className="badge-arrow">→</span>
            <span>AVAILABLE FOR FREELANCE</span>
          </a>
        </motion.div>

        {/* Right side: Contact items */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="contact-right"
        >
          {contactItems.map((item, idx) => {
            const Wrapper = item.href ? 'a' : 'div'
            const linkProps = item.href
              ? {
                  href: item.href,
                  target: item.href.startsWith('http') ? '_blank' : undefined,
                  rel: item.href.startsWith('http') ? 'noopener noreferrer' : undefined,
                }
              : {}

            return (
              <Wrapper key={idx} className="contact-item" {...(linkProps as any)}>
                <div className="contact-item-icon">{item.icon}</div>
                <div className="contact-item-content">
                  <span className="contact-item-label">{item.label}</span>
                  <span className="contact-item-value">{item.value}</span>
                </div>
              </Wrapper>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
