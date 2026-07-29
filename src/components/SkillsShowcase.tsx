import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import OrbitImages from './ui/OrbitImages'
import { useTheme } from '@/theme'

import dartLogo from '@/logo/Dart-logo.png'
import figmaLogo from '@/logo/Figma-logo.svg.png'
import firebaseLogo from '@/logo/Firebase_Logo.png'
import flutterLogo from '@/logo/flutter.png'
import javascriptLogo from '@/logo/JavaScript-Logo.png'
import mysqlLogo from '@/logo/MySQL-Logo.wine.png'
import phpLogo from '@/logo/PHP-logo.svg.png'
import reduxLogo from '@/logo/toppng.com-redux-logo-537x512.png'
import restApiLogo from '@/logo/7955-rest-api.png'
import tailwindLogo from '@/logo/tailwind-css-icon-2048x1229-u8dzt4uh.png'
import vueLogo from '@/logo/Vue.png'

// Not yet in src/logo — keep these from framework_Icon until added there.
import laravelLogo from '@/framework_Icon/Laravel.svg.webp'
import pythonLogo from '@/framework_Icon/Python-logo-notext.svg.webp'
import reactLogo from '@/framework_Icon/React-icon.svg.webp'
import typescriptLogo from '@/framework_Icon/typescript.png'

type SkillCategory =
  | 'Mobile'
  | 'Frontend'
  | 'Backend'
  | 'Database'
  | 'Design'
  | 'Tools'

interface SkillItem {
  name: string
  category: SkillCategory
  color: string
  logo: string
  // Whether this skill appears in the orbiting ring above the marquee.
  orbit?: boolean
}

const skills: SkillItem[] = [
  { name: 'React Native', category: 'Mobile', color: '#61DAFB', logo: reactLogo, orbit: true },
  { name: 'Flutter', category: 'Mobile', color: '#02569B', logo: flutterLogo, orbit: true },
  { name: 'Dart', category: 'Mobile', color: '#0175C2', logo: dartLogo },
  { name: 'TypeScript', category: 'Frontend', color: '#3178C6', logo: typescriptLogo, orbit: true },
  { name: 'JavaScript', category: 'Frontend', color: '#F7DF1E', logo: javascriptLogo, orbit: true },
  { name: 'Vue.js', category: 'Frontend', color: '#4FC08D', logo: vueLogo },
  { name: 'React', category: 'Frontend', color: '#61DAFB', logo: reactLogo },
  { name: 'Tailwind CSS', category: 'Frontend', color: '#38BDF8', logo: tailwindLogo, orbit: true },
  { name: 'Redux', category: 'Frontend', color: '#764ABC', logo: reduxLogo },
  { name: 'Laravel', category: 'Backend', color: '#FF2D20', logo: laravelLogo, orbit: true },
  { name: 'PHP', category: 'Backend', color: '#777BB4', logo: phpLogo },
  { name: 'Python', category: 'Backend', color: '#3776AB', logo: pythonLogo, orbit: true },
  { name: 'Firebase', category: 'Backend', color: '#FFCA28', logo: firebaseLogo },
  { name: 'REST API', category: 'Backend', color: '#0EA5E9', logo: restApiLogo },
  { name: 'MySQL', category: 'Database', color: '#00758F', logo: mysqlLogo },
  { name: 'Figma', category: 'Design', color: '#A259FF', logo: figmaLogo },
]

// Only the original curated 7 orbit — dedupe shared logos (React / React Native)
// so the ring doesn't show the same image twice.
const seenLogos = new Set<string>()
const orbitSkills = skills.filter((skill) => {
  if (!skill.orbit || seenLogos.has(skill.logo)) return false
  seenLogos.add(skill.logo)
  return true
})

const categoryOrder: SkillCategory[] = [
  'Mobile',
  'Frontend',
  'Backend',
  'Database',
  'Design',
  'Tools',
]

export default function SkillsShowcase() {
  const { theme } = useTheme()
  const [showAll, setShowAll] = useState(false)
  const [activeFilter, setActiveFilter] = useState<SkillCategory | 'All'>('All')

  useEffect(() => {
    if (!showAll) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowAll(false)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [showAll])

  useEffect(() => {
    if (showAll) setActiveFilter('All')
  }, [showAll])

  const visibleSkills =
    activeFilter === 'All'
      ? skills
      : skills.filter((skill) => skill.category === activeFilter)

  const visibleTabs = categoryOrder.filter((category) =>
    skills.some((skill) => skill.category === category),
  )

  return (
    <section id="skills" className="skills-showcase-section">
      <div className="skills-ambient">
        <div className="skills-ambient-orb skills-ambient-orb-1" />
        <div className="skills-ambient-orb skills-ambient-orb-2" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="skills-showcase-header"
      >
        <span className="skills-showcase-label">MY TOOLKIT</span>
        <h2>SKILLS & TECHNOLOGIES</h2>
        <p className="skills-showcase-subtitle">
          Technologies I use to bring digital products to life.{' '}
          <button
            type="button"
            className="skills-more-btn"
            onClick={() => setShowAll(true)}
          >
            More
          </button>
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="skills-orbit-wrapper"
      >
        <OrbitImages
          images={orbitSkills.map((skill) => skill.logo)}
          imageScales={orbitSkills.map((skill) => {
            if ([laravelLogo, typescriptLogo, reactLogo].includes(skill.logo)) return 0.72
            if (skill.logo === javascriptLogo) return 1.3
            return 1
          })}
          altPrefix="Skill logo"
          shape="ellipse"
          baseWidth={1100}
          radiusX={460}
          radiusY={150}
          rotation={-6}
          duration={85}
          itemSize={130}
          responsive
          showPath
          pathColor={
            theme === "light" ? "rgba(20, 20, 24, 0.22)" : "rgba(255,255,255,0.14)"
          }
          pathWidth={1.5}
          className="skills-orbit-images"
        />
      </motion.div>

      <div className="skills-marquee-container">
        <div className="skills-marquee">
          {[...skills, ...skills].map((skill, idx) => (
            <span key={idx} className="skills-marquee-item">
              {skill.name}
              <span className="skills-marquee-dot">✦</span>
            </span>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {showAll && (
          <motion.div
            className="skills-modal-overlay"
            onClick={() => setShowAll(false)}
            role="dialog"
            aria-modal="true"
            aria-label="All skills and technologies"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.div
              className="skills-modal"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, y: 28, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="skills-modal-header">
                <div className="skills-modal-title">
                  <span>Technology Stack</span>
                </div>
                <button
                  type="button"
                  className="skills-modal-close"
                  onClick={() => setShowAll(false)}
                  aria-label="Close"
                >
                  <X aria-hidden />
                </button>
              </div>

              <div className="skills-modal-tabs">
                <button
                  type="button"
                  className={`skills-modal-tab ${activeFilter === 'All' ? 'is-active' : ''}`}
                  onClick={() => setActiveFilter('All')}
                >
                  All
                </button>
                {visibleTabs.map((category) => (
                  <button
                    key={category}
                    type="button"
                    className={`skills-modal-tab ${activeFilter === category ? 'is-active' : ''}`}
                    onClick={() => setActiveFilter(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <div className="skills-modal-body">
                <motion.div
                  key={activeFilter}
                  className="skills-modal-grid"
                  initial="hidden"
                  animate="show"
                  variants={{
                    hidden: {},
                    show: {
                      transition: { staggerChildren: 0.035 },
                    },
                  }}
                >
                  {visibleSkills.map((skill) => (
                    <motion.div
                      key={skill.name}
                      className="skills-modal-item"
                      variants={{
                        hidden: { opacity: 0, y: 12, scale: 0.96 },
                        show: { opacity: 1, y: 0, scale: 1 },
                      }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <span
                        className="skills-modal-item-icon"
                        style={{
                          background: 'rgba(255, 255, 255, 0.06)',
                        }}
                      >
                        <img src={skill.logo} alt="" />
                      </span>
                      <span className="skills-modal-item-name">{skill.name}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
