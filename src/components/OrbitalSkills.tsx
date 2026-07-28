import { useState, useEffect, useRef } from 'react'
import { ArrowRight, Link, Zap, X } from 'lucide-react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import type { TimelineItem } from './ui/radial-orbital-timeline'

interface OrbitalSkillsProps {
  skills: TimelineItem[]
}

export default function OrbitalSkills({ skills }: OrbitalSkillsProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({})
  const [rotationAngle, setRotationAngle] = useState<number>(0)
  const [autoRotate, setAutoRotate] = useState<boolean>(true)
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({})
  const [centerOffset, setCenterOffset] = useState({ x: 0, y: 0 })
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const orbitRef = useRef<HTMLDivElement>(null)
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({})

  useEffect(() => {
    if (!autoRotate) return
    const id = setInterval(() => {
      setRotationAngle((prev) => Number(((prev + 0.3) % 360).toFixed(3)))
    }, 50)
    return () => clearInterval(id)
  }, [autoRotate])

  useEffect(() => {
    if (activeNodeId !== null) {
      const idx = skills.findIndex((s) => s.id === activeNodeId)
      const targetAngle = (idx / skills.length) * 360
      setRotationAngle(270 - targetAngle)
    }
  }, [activeNodeId, skills])

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({})
      setActiveNodeId(null)
      setPulseEffect({})
      setAutoRotate(true)
    }
  }

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const next: Record<number, boolean> = {}
      Object.keys(prev).forEach((k) => {
        const key = parseInt(k)
        if (key !== id) next[key] = false
      })
      next[id] = !prev[id]
      return next
    })
    if (!expandedItems[id]) {
      setActiveNodeId(id)
      setAutoRotate(false)
      const current = skills.find((s) => s.id === id)
      const pulse: Record<number, boolean> = {}
      current?.relatedIds.forEach((rid) => (pulse[rid] = true))
      setPulseEffect(pulse)
    } else {
      setActiveNodeId(null)
      setAutoRotate(true)
      setPulseEffect({})
    }
  }

  const getRelatedItems = (id: number) => skills.find((s) => s.id === id)?.relatedIds ?? []

  const isRelatedToActive = (id: number) => {
    if (!activeNodeId) return false
    return getRelatedItems(activeNodeId).includes(id)
  }

  const getStatusStyles = (status: TimelineItem['status']) => {
    switch (status) {
      case 'completed':
        return 'text-white bg-black border-white'
      case 'in-progress':
        return 'text-black bg-white border-black'
      default:
        return 'text-white bg-black/40 border-white/50'
    }
  }

  const calculatePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360
    const radius = 220
    const radian = (angle * Math.PI) / 180
    const x = radius * Math.cos(radian) + centerOffset.x
    const y = radius * Math.sin(radian) + centerOffset.y
    const zIndex = Math.round(100 + 50 * Math.cos(radian))
    const opacity = Math.max(0.4, Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2)))
    return { x, y, zIndex, opacity }
  }

  return (
    <section
      id="skills"
      ref={containerRef}
      onClick={handleContainerClick}
      className="relative w-full min-h-screen flex flex-col items-center justify-center bg-black overflow-hidden py-20"
    >
      <div className="text-center mb-8 relative z-50 px-4">
        <p className="text-xs uppercase tracking-[0.4em] text-white/50 mb-3">Capabilities</p>
        <h2 className="font-display text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-teal-400 bg-clip-text text-transparent">
          Skills Orbit
        </h2>
        <p className="mt-4 text-white/60 max-w-xl mx-auto text-sm">
          Click any node to explore the skill and its connections.
        </p>
      </div>

      <div className="relative w-full max-w-5xl h-[700px] flex items-center justify-center">
        <div
          ref={orbitRef}
          className="absolute w-full h-full flex items-center justify-center"
          style={{ perspective: '1000px', transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)` }}
        >
          <div className="absolute w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 via-blue-500 to-teal-500 animate-pulse flex items-center justify-center z-10">
            <div className="absolute w-24 h-24 rounded-full border border-white/20 animate-ping opacity-70"></div>
            <div className="absolute w-28 h-28 rounded-full border border-white/10 animate-ping opacity-50" style={{ animationDelay: '0.5s' }}></div>
            <div className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md"></div>
          </div>

          <div className="absolute w-[440px] h-[440px] rounded-full border border-white/10"></div>
          <div className="absolute w-[300px] h-[300px] rounded-full border border-white/5"></div>

          {skills.map((skill, index) => {
            const pos = calculatePosition(index, skills.length)
            const isExpanded = expandedItems[skill.id]
            const isRelated = isRelatedToActive(skill.id)
            const isPulsing = pulseEffect[skill.id]
            const Icon = skill.icon
            return (
              <div
                key={skill.id}
                ref={(el) => {
                  nodeRefs.current[skill.id] = el
                }}
                className="absolute transition-all duration-700 cursor-pointer"
                style={{ transform: `translate(${pos.x}px, ${pos.y}px)`, zIndex: isExpanded ? 200 : pos.zIndex, opacity: isExpanded ? 1 : pos.opacity }}
                onClick={(e) => {
                  e.stopPropagation()
                  toggleItem(skill.id)
                }}
              >
                <div
                  className={`absolute rounded-full -inset-1 ${isPulsing ? 'animate-pulse' : ''}`}
                  style={{
                    background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)',
                    width: `${skill.energy * 0.5 + 50}px`,
                    height: `${skill.energy * 0.5 + 50}px`,
                    left: `-${(skill.energy * 0.5 + 50 - 40) / 2}px`,
                    top: `-${(skill.energy * 0.5 + 50 - 40) / 2}px`,
                  }}
                ></div>

                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center
                    ${isExpanded ? 'bg-white text-black' : isRelated ? 'bg-white/50 text-black' : 'bg-black text-white'}
                    border-2
                    ${isExpanded ? 'border-white shadow-lg shadow-white/30' : isRelated ? 'border-white animate-pulse' : 'border-white/40'}
                    transition-all duration-300 transform
                    ${isExpanded ? 'scale-150' : ''}
                  `}
                >
                  <Icon size={16} />
                </div>

                <div
                  className={`absolute top-12 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-semibold tracking-wider transition-all duration-300 ${isExpanded ? 'text-white scale-125' : 'text-white/70'}`}
                >
                  {skill.title}
                </div>

                {isExpanded && (
                  <Card className="absolute top-20 left-1/2 -translate-x-1/2 w-64 bg-black/90 backdrop-blur-lg border-white/30 shadow-xl shadow-white/10 overflow-visible">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-white/50"></div>
                    <Button size="icon" variant="ghost" onClick={(e) => { e.stopPropagation(); toggleItem(skill.id) }} className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-white text-black hover:bg-white/80 p-0">
                      <X size={12} />
                    </Button>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <Badge className={`px-2 text-xs ${getStatusStyles(skill.status)}`}>
                          {skill.status === 'completed' ? 'MASTERED' : skill.status === 'in-progress' ? 'GROWING' : 'LEARNING'}
                        </Badge>
                        <span className="text-xs font-mono text-white/50">{skill.date}</span>
                      </div>
                      <CardTitle className="text-sm mt-2">{skill.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs text-white/80">
                      <p>{skill.content}</p>
                      <div className="mt-4 pt-3 border-t border-white/10">
                        <div className="flex justify-between items-center text-xs mb-1">
                          <span className="flex items-center"><Zap size={10} className="mr-1" /> Proficiency</span>
                          <span className="font-mono">{skill.energy}%</span>
                        </div>
                        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500" style={{ width: `${skill.energy}%` }}></div>
                        </div>
                      </div>
                      {skill.relatedIds.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-white/10">
                          <div className="flex items-center mb-2">
                            <Link size={10} className="text-white/70 mr-1" />
                            <h4 className="text-xs uppercase tracking-wider font-medium text-white/70">Connected</h4>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {skill.relatedIds.map((rid) => {
                              const related = skills.find((s) => s.id === rid)
                              return (
                                <Button
                                  key={rid}
                                  variant="outline"
                                  size="sm"
                                  className="flex items-center h-6 px-2 py-0 text-xs rounded-none border-white/20 bg-transparent hover:bg-white/10 text-white/80 hover:text-white"
                                  onClick={(e) => { e.stopPropagation(); toggleItem(rid) }}
                                >
                                  {related?.title}
                                  <ArrowRight size={8} className="ml-1 text-white/60" />
                                </Button>
                              )
                            })}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
