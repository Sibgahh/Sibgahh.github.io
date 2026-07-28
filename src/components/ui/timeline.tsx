import { useScroll, useTransform, motion } from 'motion/react'
import React, { useEffect, useRef, useState } from 'react'

interface TimelineEntry {
  title: string
  content: React.ReactNode
}

interface TimelineProps {
  data: TimelineEntry[]
}

export const Timeline = ({ data }: TimelineProps) => {
  const trackRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (!trackRef.current) return

    const updateHeight = () => {
      if (trackRef.current) {
        setHeight(trackRef.current.getBoundingClientRect().height)
      }
    }

    updateHeight()
    const observer = new ResizeObserver(updateHeight)
    observer.observe(trackRef.current)
    return () => observer.disconnect()
  }, [])

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 75%', 'end 60%'],
  })

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height])
  const opacityTransform = useTransform(scrollYProgress, [0, 0.08], [0, 1])

  return (
    <div className="timeline-root" ref={containerRef}>
      <div className="timeline-track-wrap" ref={trackRef}>
        <div className="timeline-line" style={{ height }}>
          <motion.div
            className="timeline-line-fill"
            style={{ height: heightTransform, opacity: opacityTransform }}
          />
        </div>

        {data.map((item, index) => (
          <div className="timeline-row" key={index}>
            <span className="timeline-dot" aria-hidden="true" />
            <span className="timeline-year">{item.title}</span>
            {item.content}
          </div>
        ))}
      </div>
    </div>
  )
}
