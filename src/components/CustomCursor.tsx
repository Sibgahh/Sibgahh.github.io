import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

const DOT_SIZE = 8
const RING_SIZE = 40

const INTERACTIVE_SELECTOR =
  'a, button, input, textarea, select, label, summary, [role="button"], [data-cursor-hover]'

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isPressed, setIsPressed] = useState(false)

  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)
  const ringX = useSpring(mouseX, { damping: 28, stiffness: 320, mass: 0.5 })
  const ringY = useSpring(mouseY, { damping: 28, stiffness: 320, mass: 0.5 })

  const dotX = useTransform(mouseX, (v) => v - DOT_SIZE / 2)
  const dotY = useTransform(mouseY, (v) => v - DOT_SIZE / 2)
  const ringOffsetX = useTransform(ringX, (v) => v - RING_SIZE / 2)
  const ringOffsetY = useTransform(ringY, (v) => v - RING_SIZE / 2)

  // Only take over the cursor on devices that actually have a precise,
  // hover-capable pointer (mouse/trackpad) — never on touch devices.
  useEffect(() => {
    const query = window.matchMedia('(hover: hover) and (pointer: fine)')
    setEnabled(query.matches)
    const onChange = (e: MediaQueryListEvent) => setEnabled(e.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('has-custom-cursor', enabled)
    if (!enabled) return

    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      setIsVisible(true)
      const target = e.target as HTMLElement | null
      setIsHovering(Boolean(target?.closest(INTERACTIVE_SELECTOR)))
    }
    const handleDown = () => setIsPressed(true)
    const handleUp = () => setIsPressed(false)
    const handleLeave = () => setIsVisible(false)

    window.addEventListener('mousemove', handleMove)
    window.addEventListener('mousedown', handleDown)
    window.addEventListener('mouseup', handleUp)
    document.documentElement.addEventListener('mouseleave', handleLeave)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      window.removeEventListener('mousedown', handleDown)
      window.removeEventListener('mouseup', handleUp)
      document.documentElement.removeEventListener('mouseleave', handleLeave)
    }
  }, [enabled, mouseX, mouseY])

  useEffect(() => {
    return () => document.documentElement.classList.remove('has-custom-cursor')
  }, [])

  if (!enabled) return null

  return (
    <>
      <motion.div
        className="custom-cursor-dot"
        style={{ x: dotX, y: dotY }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isPressed ? 0.5 : isHovering ? 0 : 1,
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      />
      <motion.div
        className="custom-cursor-ring"
        style={{ x: ringOffsetX, y: ringOffsetY }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isPressed ? 0.85 : isHovering ? 1.5 : 1,
          backgroundColor: isHovering
            ? 'rgba(230, 57, 70, 0.12)'
            : 'rgba(230, 57, 70, 0)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      />
    </>
  )
}
