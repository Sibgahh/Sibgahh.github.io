import { motion } from 'framer-motion'

const education = [
  {
    degree: 'Bachelor of Computer Science (S.Kom)',
    school: 'Pradita University',
    years: '2021 – 2025',
  },
  {
    degree: 'Senior High School — Multimedia',
    school: 'SMK Islamic Village',
    years: '2018 – 2021',
  },
]

const skills = [
  'REACT NATIVE',
  'TYPESCRIPT',
  'FLUTTER',
  'VUE.JS',
  'TAILWIND CSS',
  'FIGMA',
  'LARAVEL',
  'FIREBASE',
  'REDUX',
  'REST API',
  'GIT / GITHUB',
  'AGILE',
]

export default function EducationSkills() {
  return (
    <section id="skills" className="edu-work-section">
      {/* Education & Skills — full width */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7 }}
        className="edu-skills-panel"
      >
        <h2 className="panel-title">EDUCATION & SKILLS</h2>

        <div className="edu-skills-grid-inner">
          {/* Education column */}
          <div>
            <div className="edu-subtitle">EDUCATION</div>
            {education.map((edu, idx) => (
              <div key={idx} className="edu-item">
                <div className="edu-item-info">
                  <h4>{edu.degree}</h4>
                  <p>{edu.school}</p>
                </div>
                <span className="edu-item-year">{edu.years}</span>
              </div>
            ))}
          </div>

          {/* Skills column */}
          <div>
            <div className="edu-subtitle">SKILLS</div>
            <div className="skill-tags">
              {skills.map((skill) => (
                <span key={skill} className="skill-tag">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
