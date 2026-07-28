import { motion } from 'framer-motion'
import { Timeline } from '@/components/ui/timeline'
import telkomLogo from '@/logo/Company_Logo/TelkomSigma.webp'
import humanisLogo from '@/logo/Company_Logo/logofooter.png'
import cangopiLogo from '@/logo/Company_Logo/img-02.webp'
import anakpipaLogo from '@/logo/Company_Logo/logo-main.png'

interface ExperienceEntry {
  year: string
  role: string
  company: string
  companyLogo: string
  period: string
  stack: string[]
  highlights: string[]
}

const experiences: ExperienceEntry[] = [
  {
    year: '2025',
    role: 'Mobile Developer',
    company: 'PT Sigma Cipta Caraka (Telkomsigma)',
    companyLogo: telkomLogo,
    period: 'Jun 2025 – Dec 2025',
    stack: ['React Native', 'TypeScript', 'Redux', 'REST API', 'Git'],
    highlights: [
      'Engineered a cross-platform React Native app digitising HR and admin functions for 2,300+ employees.',
      'Integrated REST APIs and managed state with Redux for consistent real-time data flow.',
      'Collaborated with backend engineers and UI/UX designers across the full feature lifecycle.',
    ],
  },
  {
    year: 'Early 2025',
    role: 'Frontend Developer',
    company: 'PT Humanis Siber Indonesia',
    companyLogo: humanisLogo,
    period: 'Apr 2025 – Jun 2025',
    stack: ['Vue.js', 'Tailwind CSS', 'JavaScript'],
    highlights: [
      'Designed and developed conversion-focused landing pages with Vue.js and Tailwind CSS.',
      'Ensured full responsiveness and WCAG-aligned accessibility across all viewports.',
    ],
  },
  {
    year: '2024',
    role: 'Frontend Developer',
    company: 'Cangopi',
    companyLogo: cangopiLogo,
    period: 'Jun 2024 – Dec 2024',
    stack: ['Laravel', 'Blade', 'PHP', 'JavaScript', 'CSS'],
    highlights: [
      'Built a web-based POS app with Laravel for cashier transactions, menu management, and stock reporting.',
      'Developed end-to-end frontend modules for order processing, payment handling, and receipt generation.',
      'Applied component-based UI principles for reusable, maintainable frontend components.',
    ],
  },
  {
    year: '2023',
    role: 'UI/UX Designer',
    company: 'CV. Anakpipa Sinergi Pratama',
    companyLogo: anakpipaLogo,
    period: 'Jun 2023 – Oct 2023',
    stack: ['Figma', 'User Research', 'Wireframing', 'Prototyping'],
    highlights: [
      'Designed a B2B sales platform web interface focused on task efficiency and navigation clarity.',
      'Conducted user research and iterated designs through client feedback with interactive Figma prototypes.',
    ],
  },
]

function ExperienceCard({ exp }: { exp: ExperienceEntry }) {
  return (
    <div className="timeline-card">
      <div className="timeline-card-top">
        <span className="timeline-logo-chip">
          <img src={exp.companyLogo} alt={`${exp.company} logo`} />
        </span>
        <span className="timeline-period">{exp.period}</span>
      </div>

      <h4 className="timeline-role">{exp.role}</h4>
      <p className="timeline-company">{exp.company}</p>

      <ul className="timeline-highlights">
        {exp.highlights.map((h, idx) => (
          <li key={idx}>{h}</li>
        ))}
      </ul>

      <div className="timeline-stack">
        {exp.stack.map((tech) => (
          <span key={tech} className="timeline-tag">
            {tech}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Experience() {
  const data = experiences.map((exp) => ({
    title: exp.year,
    content: <ExperienceCard exp={exp} />,
  }))

  return (
    <section id="experience" className="experience-section">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="experience-header"
      >
        <h2>WORK EXPERIENCE</h2>
        <div className="experience-header-line" />
      </motion.div>

      <Timeline data={data} />
    </section>
  )
}
