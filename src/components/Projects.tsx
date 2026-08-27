import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import telkomsigmaThumbnail from '@/telkomsigma/ChatGPT Image Aug 27, 2026, 11_16_50 AM.png'
import cangopiThumbnail from '@/3dAssetThumbnail/cangopi.jpeg'
import eateaseThumbnail from '@/3dAssetThumbnail/eatease.jpeg'

interface FeaturedProject {
  id: string
  title: string
  categories: string[]
  image: string
}

const featured: FeaturedProject[] = [
  {
    id: 'telkomsigma',
    title: 'Employee\nSelf System',
    categories: ['MOBILE APP', 'ENTERPRISE'],
    image: telkomsigmaThumbnail,
  },
  {
    id: 'cangopi-pos',
    title: 'Cangopi\nPOS System',
    categories: ['WEBSITE', 'FULLSTACK'],
    image: cangopiThumbnail,
  },
  {
    id: 'pradita-canteen',
    title: 'Pradita\nCanteen',
    categories: ['MOBILE APP', 'IOT'],
    image: eateaseThumbnail,
  },
]

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="projects-section">
      {/* Header */}
      <motion.div
        className="sp-header"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="sp-heading">Featured Work</h2>
        <Link to="/portfolio" className="sp-view-all">
          Explore All Projects <span aria-hidden="true">→</span>
        </Link>
      </motion.div>

      {/* Grid */}
      <div className="sp-grid">
        {featured.map((project, idx) => (
          <motion.div
            key={project.id}
            className="sp-card"
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, delay: idx * 0.12 }}
          >
            <Link to={`/project/${project.id}`} className="sp-card-link">
              <div className="sp-card-visual">
                {/* Image */}
                <div className="sp-card-img-wrap">
                  <img src={project.image} alt={project.title.replace('\n', ' ')} />
                </div>

                {/* Overlay: title + categories + arrow */}
                <div className="sp-card-overlay">
                  <div className="sp-card-overlay-text">
                    <h3 className="sp-card-title">
                      {project.title.split('\n').map((line, i) => (
                        <span key={i}>
                          {line}
                          {i < project.title.split('\n').length - 1 && <br />}
                        </span>
                      ))}
                    </h3>
                    <div className="sp-card-cats">
                      {project.categories.map((cat) => (
                        <span key={cat} className="sp-card-cat">{cat}</span>
                      ))}
                    </div>
                  </div>
                  <div className="sp-card-arrow" aria-hidden="true">
                    <ArrowIcon />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
