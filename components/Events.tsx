'use client'
import { useRef } from 'react'
import { motion } from 'framer-motion'

const events = [
  {
    id: 1,
    category: 'FESTIVAL',
    title: 'Diwali Night',
    date: 'OCT 24',
    year: '2026',
    description:
      'The Festival of Lights — our biggest night of the year. Lanterns, rangoli, live music, traditional sweets, and a whole lot of sparkle.',
    accent: '#FF9500',
    spots: '250 spots left',
  },
  {
    id: 2,
    category: 'CELEBRATION',
    title: 'Holi Bash',
    date: 'MAR 29',
    year: '2026',
    description:
      'Welcome spring with colour, music, and bhangra. A mass colour-throwing event that turns the whole campus into a canvas.',
    accent: '#0FA3A3',
    spots: '300 spots left',
  },
  {
    id: 3,
    category: 'CULTURE',
    title: 'Bollywood Night',
    date: 'NOV 8',
    year: '2026',
    description:
      'The ultimate Bollywood extravaganza. Dance battles, live performances, best-dressed awards, and an all-night dance floor.',
    accent: '#F0C040',
    spots: '180 spots left',
  },
  {
    id: 4,
    category: 'FOOD & CULTURE',
    title: 'India Food Fair',
    date: 'FEB 20',
    year: '2026',
    description:
      'Thirty dishes. Twelve regions. One hall. Sample authentic flavours from Kerala to Kashmir, curated by our members.',
    accent: '#C9452A',
    spots: '150 spots left',
  },
]

function TiltCard({ ev, index }: { ev: (typeof events)[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current
    if (!el) return
    const { left, top, width, height } = el.getBoundingClientRect()
    const x = ((e.clientX - left) / width  - 0.5) * 10
    const y = ((e.clientY - top)  / height - 0.5) * 10
    el.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg) translateZ(12px)`
  }

  const onLeave = () => {
    if (cardRef.current)
      cardRef.current.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0px)'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transformStyle: 'preserve-3d', transition: 'transform 0.12s ease-out' }}
      className="bg-green-mid border border-white/8 rounded-2xl p-7 md:p-9 flex flex-col justify-between group cursor-pointer hover:border-white/15 transition-colors duration-300 min-h-[290px]"
    >
      {/* Top row */}
      <div className="flex items-start justify-between mb-6">
        <span
          className="font-body text-[10px] tracking-[0.3em] uppercase px-3 py-1 rounded-full"
          style={{
            color: ev.accent,
            background: `${ev.accent}18`,
            border: `1px solid ${ev.accent}35`,
          }}
        >
          {ev.category}
        </span>
        <div className="text-right">
          <div className="font-body text-xs text-white/50">{ev.date}</div>
          <div className="font-body text-[10px] text-white/25">{ev.year}</div>
        </div>
      </div>

      {/* Title */}
      <div className="flex-1">
        <h3
          className="font-display uppercase leading-none mb-3 tracking-tight transition-colors duration-300"
          style={{
            fontSize: 'clamp(28px, 4vw, 42px)',
            color: 'white',
          }}
        >
          {ev.title}
        </h3>
        <p className="font-body text-white/40 text-sm leading-relaxed">{ev.description}</p>
      </div>

      {/* Bottom row */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/8">
        <span className="font-body text-[11px] text-white/25 tracking-wider">{ev.spots}</span>
        <button
          className="font-body text-xs text-white/50 border border-white/15 px-5 py-2 rounded-full transition-all duration-200"
          style={{ transition: 'border-color 0.2s, color 0.2s' }}
          onMouseEnter={(e) => {
            ;(e.currentTarget as HTMLButtonElement).style.borderColor = ev.accent
            ;(e.currentTarget as HTMLButtonElement).style.color = ev.accent
          }}
          onMouseLeave={(e) => {
            ;(e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.15)'
            ;(e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.5)'
          }}
        >
          Register →
        </button>
      </div>
    </motion.div>
  )
}

export default function Events() {
  return (
    <section id="events" className="bg-green-deep py-28 md:py-36 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20"
        >
          <p className="font-body text-lime text-[10px] tracking-[0.45em] uppercase mb-5">What's on</p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2
              className="font-display text-white uppercase leading-none"
              style={{ fontSize: 'clamp(56px, 10vw, 112px)' }}
            >
              EVENTS
            </h2>
            <p className="font-body text-white/35 max-w-[270px] text-sm leading-relaxed">
              Diwali. Holi. Bollywood. Food fairs. There is always something worth celebrating.
            </p>
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {events.map((ev, i) => (
            <TiltCard key={ev.id} ev={ev} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-14"
        >
          <button className="font-body text-white/30 text-xs tracking-[0.3em] uppercase hover:text-[#FF9500] transition-colors duration-200">
            View all events →
          </button>
        </motion.div>
      </div>
    </section>
  )
}
