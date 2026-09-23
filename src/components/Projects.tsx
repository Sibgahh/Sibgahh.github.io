import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import telkomsigmaThumbnail from '@/telkomsigma/ChatGPT Image Aug 27, 2026, 11_16_50 AM.png'
import cangopiThumbnail from '@/3dAssetThumbnail/cangopi.jpeg'
import eateaseThumbnail from '@/3dAssetThumbnail/eatease.jpeg'
import smsThumbnail from '@/3dAssetThumbnail/sms.jpeg'
import todoThumbnail from '@/3dAssetThumbnail/todo.jpeg'
import anakpipaThumbnail from '@/3dAssetThumbnail/anakpipa.jpeg'
import ukmThumbnail from '@/3dAssetThumbnail/ukm.jpeg'
import thesisThumbnail from '@/3dAssetThumbnail/thesis.png'
import sibertahanThumbnail from '@/3dAssetThumbnail/Sibertahan.png'
import hypermartThumbnail from '@/3dAssetThumbnail/Hypermart Warehouse.png'

interface FeaturedProject {
  id: string
  title: string
  subtitle: string
  tag: string
  watermark: string
  image: string
}

const softwareProjects: FeaturedProject[] = [
  {
    id: 'telkomsigma',
    title: 'Employee Self-Service System',
    subtitle: 'Cross-platform enterprise mobile app for 2,300+ daily employees.',
    tag: 'Mobile App',
    watermark: 'TELKOM',
    image: telkomsigmaThumbnail,
  },
  {
    id: 'hypermart-wms',
    title: 'Hypermart Warehouse Management',
    subtitle: 'Streamlined logistics, real-time stock handling & supply chain system.',
    tag: 'Web Development',
    watermark: 'WAREHOUSE',
    image: hypermartThumbnail,
  },
  {
    id: 'cangopi-pos',
    title: 'Cangopi POS & Order System',
    subtitle: 'Point of sale and real-time inventory management platform for F&B.',
    tag: 'Web Development',
    watermark: 'CANGOPI',
    image: cangopiThumbnail,
  },
  {
    id: 'sibertahan',
    title: 'Sibertahan Cybersecurity Platform',
    subtitle: 'Penetration testing and security consulting agency website.',
    tag: 'Web Development',
    watermark: 'CYBER',
    image: sibertahanThumbnail,
  },
  {
    id: 'summarecon',
    title: 'Summarecon Serpong Document System',
    subtitle: 'Internal enterprise digital document archival and approval platform.',
    tag: 'UI/UX Design',
    watermark: 'SERPONG',
    image: smsThumbnail,
  },
  {
    id: 'pradita-canteen',
    title: 'Pradita Canteen Mobile App',
    subtitle: 'IoT-connected smart food ordering and queue notification solution.',
    tag: 'Mobile App',
    watermark: 'CANTEEN',
    image: eateaseThumbnail,
  },
  {
    id: 'anakpipa',
    title: 'Anak Pipa B2B Procurement Platform',
    subtitle: 'Enterprise workflow design and comprehensive visual design system.',
    tag: 'UI/UX Design',
    watermark: 'ANAKPIPA',
    image: anakpipaThumbnail,
  },
  {
    id: 'cheetask',
    title: 'Cheetask Task Management App',
    subtitle: 'Minimalist task organizer and productivity mobile application.',
    tag: 'Mobile App',
    watermark: 'CHEETASK',
    image: todoThumbnail,
  },
  {
    id: 'ukm-finance',
    title: 'UKM Financial Management System',
    subtitle: 'Financial ledger, revenue analytics and bookkeeping system.',
    tag: 'Web Development',
    watermark: 'FINANCE',
    image: ukmThumbnail,
  },
  {
    id: 'thesis-portal',
    title: 'Academic Thesis Portal',
    subtitle: 'University manuscript review, repository and evaluation portal.',
    tag: 'Web Development',
    watermark: 'THESIS',
    image: thesisThumbnail,
  },
]

function ArrowDiagonal() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="sp-arrow-icon"
    >
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  )
}

function ProjectCard({
  project,
  index,
}: {
  project: FeaturedProject
  index: number
}) {
  return (
    <motion.div
      className="sp-card-item"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link to={`/project/${project.id}`} className="sp-card-link">
        <div className="sp-visual-frame">
          {/* Subtle watermark typography in background */}
          <span className="sp-visual-watermark" aria-hidden="true">
            {project.watermark}
          </span>

          {/* Project preview thumbnail */}
          <div className="sp-visual-inner">
            <img
              src={project.image}
              alt={project.title}
              className="sp-visual-img"
              loading="lazy"
            />
          </div>

          {/* Top-right floating hover arrow badge */}
          <div className="sp-hover-badge" aria-hidden="true">
            <ArrowDiagonal />
          </div>
        </div>

        {/* Project info beneath the image frame */}
        <div className="sp-meta-block">
          <h3 className="sp-title">{project.title}</h3>
          <p className="sp-desc">{project.subtitle}</p>
          <div className="sp-tags-row">
            <span className="sp-tag-pill">{project.tag}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

function SectionHeader() {
  return (
    <div className="sp-header-block">
      <div className="sp-kicker">
        <span className="sp-kicker-dot" />
        <span>Some Recent Projects</span>
      </div>
      <h2 className="sp-section-heading">
        Selected Work That Delivers Results
      </h2>
    </div>
  )
}

function QuoteBlock() {
  return (
    <div className="sp-quote-block">
      <p className="sp-quote-text">
        I strive to pay attention
        <br />
        to the smallest details
      </p>
    </div>
  )
}

function ExploreButton() {
  return (
    <div className="sp-explore-block">
      <Link to="/portfolio" className="sp-explore-btn">
        <span className="sp-explore-text">See All Works</span>
        <span className="sp-explore-arrow-circle" aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="sp-explore-circle-arrow"
          >
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </span>
      </Link>
    </div>
  )
}

export default function Projects() {
  // 4 featured projects (2 left, 2 right) matching the screenshot layout exactly
  const activeProjects = softwareProjects.slice(0, 4)

  const leftColumnProjects = activeProjects.filter((_, idx) => idx % 2 === 0)
  const rightColumnProjects = activeProjects.filter((_, idx) => idx % 2 === 1)

  return (
    <section id="projects" className="projects-section">
      <div className="sp-container">
        {/* Desktop Layout: Asymmetrical Staggered 2-Column Grid */}
        <div className="sp-desktop-layout">
          {/* Left Column: Starts directly with Card 0, followed by Card 2, and ends with Quote + Explore */}
          <div className="sp-col sp-col-left">
            {leftColumnProjects.map((project, idx) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={idx * 2}
              />
            ))}
            <div className="sp-left-bottom">
              <QuoteBlock />
              <ExploreButton />
            </div>
          </div>

          {/* Right Column: Starts with Header, followed by Card 1 and Card 3 */}
          <div className="sp-col sp-col-right">
            <SectionHeader />
            {rightColumnProjects.map((project, idx) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={idx * 2 + 1}
              />
            ))}
          </div>
        </div>

        {/* Mobile Layout (< 900px): Clean Sequential Stack */}
        <div className="sp-mobile-layout">
          <SectionHeader />
          <div className="sp-mobile-cards">
            {activeProjects.map((project, idx) => (
              <ProjectCard key={project.id} project={project} index={idx} />
            ))}
          </div>
          <QuoteBlock />
          <ExploreButton />
        </div>
      </div>
    </section>
  )
}
