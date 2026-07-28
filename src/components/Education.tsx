import { motion } from 'framer-motion'
import universityLogo from '@/School_Logo/logo_universitas.png'
import schoolLogo from '@/School_Logo/Logo-Sekolah.png'

const education = [
  {
    degree: 'Bachelor of Computer Science (S.Kom)',
    school: 'Pradita University',
    location: 'Tangerang, Indonesia',
    years: '2021 – 2025',
    logo: universityLogo,
  },
  {
    degree: 'Senior High School — Multimedia',
    school: 'SMK Islamic Village',
    location: 'Tangerang, Indonesia',
    years: '2018 – 2021',
    logo: schoolLogo,
  },
]

export default function Education() {
  return (
    <section id="education" className="education-section">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="education-header"
      >
        <h2>EDUCATION</h2>
        <div className="education-header-line" />
      </motion.div>

      <div className="education-cards">
        {education.map((edu, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            className="education-card"
          >
            <div className="education-card-logo">
              <img src={edu.logo} alt={edu.school} />
            </div>
            <div className="education-card-content">
              <h3>{edu.degree}</h3>
              <p className="education-card-school">{edu.school}</p>
              <p className="education-card-location">{edu.location}</p>
            </div>
            <span className="education-card-year">{edu.years}</span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
