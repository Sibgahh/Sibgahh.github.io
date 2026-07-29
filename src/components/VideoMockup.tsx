import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronUp, ChevronDown } from 'lucide-react'
import {
  type BrandVideoProject,
  drivePreviewUrl,
  driveThumbnailUrl,
} from '@/data/videos'
import CategoryProjects from './CategoryProjects'
import PathTrail from './PathTrail'

interface VideoMockupProps {
  project: BrandVideoProject
}

export default function VideoMockup({ project }: VideoMockupProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    setActiveIndex(0)
  }, [project.id])

  useEffect(() => {
    const activeThumb = document.querySelector('.reels-strip-card.is-active')
    activeThumb?.scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest',
    })
  }, [activeIndex])

  const videos = project.videos
  const active = videos[activeIndex]

  function goTo(index: number) {
    if (index < 0 || index >= videos.length) return
    setActiveIndex(index)
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault()
        goTo(Math.min(activeIndex + 1, videos.length - 1))
      }
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault()
        goTo(Math.max(activeIndex - 1, 0))
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [activeIndex, videos.length])

  if (!active) {
    return (
      <section className="video-mockup-page">
        <p>No videos available for this brand.</p>
      </section>
    )
  }

  return (
    <section className="video-mockup-page">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="project-detail-nav"
      >
        <PathTrail
          className="project-back-link"
          items={[
            { label: 'Home', to: '/' },
            { label: 'Portfolio', to: '/portfolio' },
            { label: 'Video Editing', to: '/portfolio?category=video' },
            { label: project.title },
          ]}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="video-mockup-hero"
      >
        <span className="video-mockup-badge">Reels · {project.title}</span>
        <h1>{project.title}</h1>
        <p>{project.subtitle}</p>
      </motion.div>

      <div className="reels-layout">
        <div className="reels-stage">
          <div className="reels-stage-main">
            <button
              type="button"
              className="reels-nav-btn"
              aria-label="Previous reel"
              disabled={activeIndex === 0}
              onClick={() => goTo(activeIndex - 1)}
            >
              <ChevronUp size={22} />
            </button>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="video-player video-player--reel"
            >
              <div className="reels-progress" aria-hidden="true">
                {videos.map((video, idx) => (
                  <button
                    key={video.id}
                    type="button"
                    className={`reels-progress-seg ${
                      idx === activeIndex
                        ? 'is-active'
                        : idx < activeIndex
                          ? 'is-seen'
                          : ''
                    }`}
                    onClick={() => goTo(idx)}
                    aria-label={`Go to reel ${idx + 1}`}
                  />
                ))}
              </div>

              <div className="video-player-screen">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.driveFileId}
                    className="video-player-frame"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <iframe
                      src={drivePreviewUrl(active.driveFileId)}
                      title={active.title}
                      allow="autoplay; fullscreen"
                      allowFullScreen
                      loading="lazy"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="reels-overlay">
                <div className="reels-brand">
                  <span className="reels-avatar" aria-hidden="true">
                    <img src={project.logo} alt="" />
                  </span>
                  <div className="reels-brand-text">
                    <strong>{project.title}</strong>
                    <span>
                      Reel {activeIndex + 1} of {videos.length}
                    </span>
                  </div>
                </div>
                <p className="reels-caption">{active.title}</p>
              </div>
            </motion.div>

            <button
              type="button"
              className="reels-nav-btn"
              aria-label="Next reel"
              disabled={activeIndex === videos.length - 1}
              onClick={() => goTo(activeIndex + 1)}
            >
              <ChevronDown size={22} />
            </button>
          </div>

          <p className="reels-hint">Swipe with ↑ ↓ or tap a thumbnail</p>

          <div className="reels-strip" role="list">
            {videos.map((video, idx) => {
              const selected = idx === activeIndex
              return (
                <button
                  key={video.id}
                  type="button"
                  role="listitem"
                  className={`reels-strip-card ${selected ? 'is-active' : ''}`}
                  onClick={() => goTo(idx)}
                  aria-label={video.title}
                  aria-current={selected ? 'true' : undefined}
                >
                  <img
                    src={driveThumbnailUrl(video.driveFileId, 400)}
                    alt=""
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  {selected && <span className="reels-strip-now">Now</span>}
                </button>
              )
            })}
          </div>
        </div>

        <div className="video-mockup-body">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="video-mockup-about"
          >
            <h2>About This Series</h2>
            <p>{project.description}</p>
            <div className="video-mockup-meta">
              <div>
                <span>Role</span>
                <strong>{project.role}</strong>
              </div>
              <div>
                <span>Period</span>
                <strong>{project.period}</strong>
              </div>
              <div>
                <span>Format</span>
                <strong>1080 × 1920</strong>
              </div>
            </div>
            <div className="video-mockup-tags">
              {project.stack.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22 }}
            className="video-mockup-highlights"
          >
            <h2>Edit Notes</h2>
            <ul>
              {project.highlights.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      <CategoryProjects currentId={project.id} />
    </section>
  )
}
