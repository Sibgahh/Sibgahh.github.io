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
    stack: ['React Native', 'TypeScript', 'Redux Toolkit', 'Axios', 'REST API', 'Git'],
    highlights: [
      'Architected and maintained a cross-platform React Native enterprise app for 2,300+ daily employees, resolving post-launch stability issues to ensure high availability.',
      'Engineered predictable global state with Redux Toolkit and integrated modular REST APIs via Axios for real-time synchronization.',
      'Achieved a 100% functional test pass rate and conducted a 25-stakeholder UAT evaluation, securing an 83.2% user satisfaction score.',
      'Streamlined sprint delivery in an Agile workflow through structured Git/GitHub branching and rigorous code reviews.',
    ],
  },
  {
    year: 'Early 2025',
    role: 'Frontend Developer',
    company: 'PT Humanis Siber Indonesia',
    companyLogo: humanisLogo,
    period: 'Mar 2025 – May 2025',
    stack: ['Vue.js', 'Tailwind CSS', 'JavaScript', 'Responsive Design', 'WCAG'],
    highlights: [
      'Developed a high-converting company profile website using Vue.js and Tailwind CSS with strategic CTAs, driving an estimated 31% traffic growth.',
      'Delivered WCAG-aligned accessibility and cross-platform fidelity across mobile, tablet, and desktop breakpoints.',
      'Collaborated closely with UI/UX designers to translate Figma mockups into reusable, performant frontend components.',
    ],
  },
  {
    year: '2024',
    role: 'Frontend Developer',
    company: 'Cangopi',
    companyLogo: cangopiLogo,
    period: 'Jun 2024 – Dec 2024',
    stack: ['JavaScript', 'HTML5/CSS3', 'Laravel', 'REST API', 'PHP'],
    highlights: [
      'Engineered an end-to-end web POS frontend on a Laravel backend, automating cashier orders, payment processing, and receipt generation.',
      'Built real-time inventory and stock reporting modules for ingredient movement tracking and daily reconciliation.',
      'Aligned REST API contracts with backend engineers and implemented modular vanilla JS patterns for maintainable code.',
    ],
  },
  {
    year: '2023',
    role: 'UI/UX Designer',
    company: 'CV. Anakpipa Sinergi Pratama',
    companyLogo: anakpipaLogo,
    period: 'Jun 2023 – Aug 2023',
    stack: ['Figma', 'User Research', 'Wireframing', 'Prototyping'],
    highlights: [
      'Spearheaded user research and workflow analysis to identify bottlenecks in an existing B2B sales and procurement platform.',
      'Designed wireframes and interactive prototypes in Figma, iterating across 2 client review cycles to balance usability and business goals.',
      'Validated prototypes against real B2B user workflows, eliminating design ambiguity prior to engineering handoff.',
    ],
  },
]

function ExperienceCard({ exp }: { exp: ExperienceEntry }) {
  return (
    <div className="timeline-card">
      <div className="timeline-card-header">
        <span className="timeline-logo-chip">
          <img src={exp.companyLogo} alt={`${exp.company} logo`} />
        </span>
        <div className="timeline-card-titles">
          <div className="timeline-role-row">
            <h4 className="timeline-role">{exp.role}</h4>
            <span className="timeline-period">{exp.period}</span>
          </div>
          <p className="timeline-company">{exp.company}</p>
        </div>
      </div>

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
