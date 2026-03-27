'use client'
import { useState, useRef } from 'react'
import { motion } from 'framer-motion'

const items = [
  { id: 1, label: 'Diwali Night 2025', tag: 'Festival',    bg: '#2D1015', accent: '#FF9500', num: '01', tall: true  },
  { id: 2, label: 'Holi Festival',     tag: 'Celebration', bg: '#0D2320', accent: '#0FA3A3', num: '02', tall: false },
  { id: 3, label: 'Navratri Garba',   tag: 'Dance',       bg: '#2A1A08', accent: '#F0C040', num: '03', tall: false },
  { id: 4, label: 'India Food Fair',  tag: 'Food',        bg: '#2A1010', accent: '#C9452A', num: '04', tall: false },
  { id: 5, label: 'Bollywood Gala',   tag: 'Music',       bg: '#1A1028', accent: '#FF9500', num: '05', tall: false },
  { id: 6, label: 'Independence Day', tag: 'Community',   bg: '#0D2320', accent: '#0FA3A3', num: '06', tall: false },
]

type Item = (typeof items)[0]

function GalleryItem({ item, index }: { item: Item; index: number }) {
  const [hovered, setHovered] = useState(false)
  const dotRef = useRef<HTMLDivElement>(null)

  // Dot-pattern parallax: the rangoli pattern layer moves opposite to
  // the cursor, creating a depth "window" illusion — same tilt pattern
  // as Events and Team cards but applied to the background texture only.
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!dotRef.current) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x    = ((e.clientX - rect.left) / rect.width  - 0.5) * 18
    const y    = ((e.clientY - rect.top)  / rect.height - 0.5) * 18
    dotRef.current.style.transform = `translate(${-x * 0.4}px, ${-y * 0.4}px)`
  }
  const onLeave = () => {
    if (dotRef.current) dotRef.current.style.transform = 'translate(0px, 0px)'
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`relative rounded-2xl overflow-hidden cursor-pointer ${item.tall ? 'row-span-2' : ''}`}
      style={{
        background:  item.bg,
        aspectRatio: item.tall ? undefined : '1/1',
        minHeight:   item.tall ? '420px' : undefined,
      }}
    >
      {/* Dot pattern — rangoli-inspired; moves opposite to cursor */}
      <div
        ref={dotRef}
        className="absolute inset-[-20%] opacity-[0.07]"
        style={{
          backgroundImage: `radial-gradient(circle, ${item.accent} 1.5px, transparent 1.5px)`,
          backgroundSize:  '18px 18px',
          transition:      'transform 0.18s ease-out',
          willChange:      'transform',
        }}
      />

      {/* Large watermark number */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span
          className="font-display select-none leading-none"
          style={{ fontSize: 'clamp(80px, 12vw, 140px)', color: item.accent, opacity: 0.07 }}
        >
          {item.num}
        </span>
      </div>

      {/* Tag */}
      <div className="absolute top-4 right-4">
        <span
          className="font-body text-[9px] tracking-[0.3em] uppercase px-2.5 py-1 rounded-full"
          style={{ color: item.accent, background: `${item.accent}22`, border: `1px solid ${item.accent}35` }}
        >
          {item.tag}
        </span>
      </div>

      {/* Hover label overlay */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.22 }}
        className="absolute inset-0 flex items-end p-6"
        style={{ background: `linear-gradient(to top, ${item.bg}f0 0%, transparent 55%)` }}
      >
        <span className="font-body text-xs tracking-[0.2em] uppercase font-medium" style={{ color: item.accent }}>
          {item.label}
        </span>
      </motion.div>

      {/* Border glow */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{ boxShadow: `inset 0 0 0 1px ${item.accent}55` }}
      />
    </motion.div>
  )
}

export default function Gallery() {
  return (
    <section id="gallery" className="bg-green-deep py-28 md:py-36 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20"
        >
          <p className="font-body text-lime text-[10px] tracking-[0.45em] uppercase mb-5">Memories</p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2
              className="font-display text-white uppercase leading-none"
              style={{ fontSize: 'clamp(56px, 10vw, 112px)' }}
            >
              GALLERY
            </h2>
            <p className="font-body text-white/35 max-w-[260px] text-sm leading-relaxed">
              From Diwali diyas to Holi powder — a glimpse of life inside India Society.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {items.map((item, i) => (
            <GalleryItem key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
