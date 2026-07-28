import { motion } from 'framer-motion'

interface SkillGroup {
  title: string
  items: { name: string; level: number }[]
}

const skillGroups: SkillGroup[] = [
  {
    title: 'Mobile & Frontend',
    items: [
      { name: 'React Native', level: 90 },
      { name: 'TypeScript / JavaScript', level: 88 },
      { name: 'Flutter / Dart', level: 82 },
      { name: 'Vue.js', level: 80 },
      { name: 'Tailwind CSS', level: 92 },
      { name: 'Laravel / PHP', level: 78 },
    ],
  },
  {
    title: 'State & Backend',
    items: [
      { name: 'Redux', level: 85 },
      { name: 'REST API (Axios/Fetch)', level: 88 },
      { name: 'Firebase (Auth, Firestore)', level: 80 },
      { name: 'MySQL', level: 72 },
    ],
  },
  {
    title: 'Tools & Design',
    items: [
      { name: 'Git / GitHub', level: 90 },
      { name: 'Figma', level: 92 },
      { name: 'Agile / Scrum', level: 85 },
    ],
  },
]

export default function Skills() {
  return (
    <section id="skills-detail" className="skills-section">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="skills-header"
      >
        <h2>TECHNICAL SKILLS</h2>
        <div className="skills-header-line" />
      </motion.div>

      {/* Skills grid */}
      <div className="skills-grid">
        {skillGroups.map((group, gIdx) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: gIdx * 0.12 }}
            className="skills-group-card"
          >
            <h3 className="skills-group-title">{group.title}</h3>
            <div className="skills-list">
              {group.items.map((skill) => (
                <div key={skill.name} className="skill-item">
                  <div className="skill-item-top">
                    <span className="skill-item-name">{skill.name}</span>
                    <span className="skill-item-pct">{skill.level}%</span>
                  </div>
                  <div className="skill-bar-track">
                    <motion.div
                      className="skill-bar-fill"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
