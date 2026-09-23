import { useState } from 'react'
import { motion } from 'framer-motion'

function StarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className="marquee-star-icon"
      aria-hidden="true"
    >
      <path d="M12 0L14.7 9.3L24 12L14.7 14.7L12 24L9.3 14.7L0 12L9.3 9.3L12 0Z" />
    </svg>
  )
}

function ArrowUpRight() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="contact-pill-arrow"
    >
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  )
}

const marqueeItems = [
  "LET'S WORK TOGETHER",
  "LET'S WORK TOGETHER",
  "LET'S WORK TOGETHER",
  "LET'S WORK TOGETHER",
  "LET'S WORK TOGETHER",
  "LET'S WORK TOGETHER",
]

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [service, setService] = useState('Both web design and development')
  const [message, setMessage] = useState('')
  const [accepted, setAccepted] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name || !email) return

    // Construct mailto link
    const subject = encodeURIComponent(`Project Inquiry from ${name}`)
    const body = encodeURIComponent(
      `Hi Sibgah,\n\nName: ${name}\nEmail: ${email}\nInterested in: ${service}\n\nProject Details:\n${message}\n`
    )
    window.open(`mailto:sibgahrk190@gmail.com?subject=${subject}&body=${body}`, '_blank')
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 5000)
  }

  return (
    <section id="contact" className="contact-cta-section">
      {/* --- Giant Marquee Ticker --- */}
      <div className="contact-marquee-wrap" aria-hidden="true">
        <div className="contact-marquee-track">
          {[...marqueeItems, ...marqueeItems].map((text, i) => (
            <div key={i} className="contact-marquee-item">
              <span>{text}</span>
              <StarIcon />
            </div>
          ))}
        </div>
      </div>

      {/* --- Contact Form Content --- */}
      <div className="contact-cta-container">
        <div className="contact-cta-grid">
          {/* Left Column: Heading & Hook */}
          <motion.div
            className="contact-cta-left"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6 }}
          >
            <div className="contact-kicker">
              <span className="contact-kicker-star">✦</span>
              <span>Contact me</span>
            </div>

            <h2 className="contact-main-heading">
              Start Your Project
            </h2>

            <p className="contact-main-desc">
              I'll help you plan and build a website and mobile app that actually performs.
            </p>
          </motion.div>

          {/* Right Column: Minimalist Underline Form */}
          <motion.div
            className="contact-cta-right"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, delay: 0.1 }}
          >
            <form onSubmit={handleSubmit} className="contact-form">
              {/* Row 1: Name and Email */}
              <div className="contact-form-row">
                <div className="contact-field">
                  <label htmlFor="contact-name" className="contact-label">
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder=""
                    className="contact-input"
                  />
                </div>

                <div className="contact-field">
                  <label htmlFor="contact-email" className="contact-label">
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder=""
                    className="contact-input"
                  />
                </div>
              </div>

              {/* Row 2: Service Selection */}
              <div className="contact-field full-width">
                <label htmlFor="contact-service" className="contact-label">
                  I am interested in
                </label>
                <div className="contact-select-wrap">
                  <select
                    id="contact-service"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="contact-select"
                  >
                    <option value="Both web design and development">
                      Both web design and development
                    </option>
                    <option value="Mobile App Development (React Native / Flutter)">
                      Mobile App Development (React Native / Flutter)
                    </option>
                    <option value="Frontend Web Engineering (React / Vue / Next.js)">
                      Frontend Web Engineering (React / Vue / Next.js)
                    </option>
                    <option value="UI/UX Prototyping & Design Systems">
                      UI/UX Prototyping & Design Systems
                    </option>
                    <option value="Full-Stack Application Development">
                      Full-Stack Application Development
                    </option>
                  </select>
                  <span className="contact-select-chevron" aria-hidden="true">
                    ▾
                  </span>
                </div>
              </div>

              {/* Row 3: Tell me about your project */}
              <div className="contact-field full-width">
                <label htmlFor="contact-message" className="contact-label">
                  Tell me about your project
                </label>
                <textarea
                  id="contact-message"
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder=""
                  className="contact-textarea"
                />
              </div>

              {/* Row 4: Privacy Checkbox */}
              <div className="contact-checkbox-row">
                <label className="contact-checkbox-label">
                  <input
                    type="checkbox"
                    checked={accepted}
                    onChange={(e) => setAccepted(e.target.checked)}
                    className="contact-checkbox-input"
                  />
                  <span className="contact-checkbox-box" aria-hidden="true" />
                  <span className="contact-checkbox-text">
                    By submitting this form I accept the{' '}
                    <span className="contact-privacy-link">Privacy Policy</span> of this site.
                  </span>
                </label>
              </div>

              {/* Row 5: Submit Button */}
              <div className="contact-submit-row">
                <button
                  type="submit"
                  disabled={!accepted}
                  className={`contact-submit-btn ${!accepted ? 'is-disabled' : ''}`}
                >
                  <span className="contact-submit-text">Send Project Details</span>
                  <span className="contact-submit-circle" aria-hidden="true">
                    <ArrowUpRight />
                  </span>
                </button>

                {submitted && (
                  <span className="contact-success-msg">
                    Opening your email client... Thank you!
                  </span>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
