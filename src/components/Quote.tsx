import { motion } from 'framer-motion'

export default function Quote() {
  return (
    <section className="quote-section">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
        className="quote-card"
      >
        <span className="quote-mark">"</span>
        <div className="quote-content">
          <p className="quote-text">
            Good design is not just how it looks, but how it works.
          </p>
          <span className="quote-signature">Sibgah</span>
        </div>
        <span className="quote-cta">
          LET'S CREATE SOMETHING GREAT TOGETHER.
        </span>
      </motion.div>
    </section>
  )
}
