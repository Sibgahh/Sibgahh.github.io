import { motion } from 'framer-motion'
import { type ComponentType, type ReactNode } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CardSwap, { Card } from './CardSwap'
import eateaseThumbnail from '@/3dAssetThumbnail/eatease.jpeg'
import smsThumbnail from '@/3dAssetThumbnail/sms.jpeg'
import cangopiThumbnail from '@/3dAssetThumbnail/cangopi.jpeg'

interface FeaturedProject {
  id: string
  title: string
  listLabel: string
  tags: string[]
  image: string
}

const featured: FeaturedProject[] = [
  {
    id: 'pradita-canteen',
    title: 'Pradita Canteen',
    listLabel: 'Pradita Canteen – Food Order App',
    tags: ['APP', 'FULLSTACK'],
    image: eateaseThumbnail,
  },
  {
    id: 'summarecon',
    title: 'Summarecon Serpong',
    listLabel: 'Summarecon Serpong – Document System',
    tags: ['UI', 'UX'],
    image: smsThumbnail,
  },
  {
    id: 'cangopi-pos',
    title: 'Cangopi POS',
    listLabel: 'Cangopi POS – Point of Sale',
    tags: ['WEB', 'APP'],
    image: cangopiThumbnail,
  },
]

type CardSwapProps = {
  width?: number
  height?: number
  cardDistance?: number
  verticalDistance?: number
  delay?: number
  pauseOnHover?: boolean
  onCardClick?: (idx: number) => void
  skewAmount?: number
  easing?: string
  className?: string
  children?: ReactNode
}

type CardProps = {
  children?: ReactNode
  customClass?: string
}

const TypedCardSwap = CardSwap as ComponentType<CardSwapProps>
const TypedCard = Card as ComponentType<CardProps>

export default function Projects() {
  const navigate = useNavigate()

  return (
    <section id="projects" className="projects-section">
      <div className="projects-swap-layout">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="projects-swap-copy"
        >
          <h2 className="projects-swap-heading">
            Selected recent projects I&apos;ve designed and built
          </h2>
          <p className="projects-swap-lede">
            A selection of recent work showcasing product design and front-end
            engineering.
          </p>

          <ul className="projects-swap-list">
            {featured.map((project, idx) => (
              <motion.li
                key={project.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: idx * 0.08 + 0.15 }}
              >
                <Link to={`/project/${project.id}`}>{project.listLabel}</Link>
              </motion.li>
            ))}
          </ul>

          <Link to="/portfolio" className="projects-swap-all">
            View all projects <span aria-hidden="true">→</span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="projects-swap-stage"
        >
          <TypedCardSwap
            width={600}
            height={430}
            cardDistance={70}
            verticalDistance={75}
            delay={4500}
            pauseOnHover
            skewAmount={6}
            easing="elastic"
            className="projects-card-swap"
            onCardClick={(idx: number) => navigate(`/project/${featured[idx].id}`)}
          >
            {featured.map((project) => (
              <TypedCard key={project.id} customClass="project-swap-card">
                <div className="project-swap-chrome">
                  <div className="project-swap-dots" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </div>
                  <span className="project-swap-chrome-title">{project.title}</span>
                  <div className="project-swap-tags">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-swap-card-image"
                />
              </TypedCard>
            ))}
          </TypedCardSwap>
        </motion.div>
      </div>
    </section>
  )
}
