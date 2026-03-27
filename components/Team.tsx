'use client'
import { useRef } from 'react'
import { motion } from 'framer-motion'

const team = [
  { name: 'Arjun Sharma',   role: 'President',        initials: 'AS', accent: '#FF9500', bg: '#2D1015' },
  { name: 'Priya Nair',     role: 'VP Events',         initials: 'PN', accent: '#0FA3A3', bg: '#0D2320' },
  { name: 'Rohan Mehta',    role: 'Head of Tech',      initials: 'RM', accent: '#F0C040', bg: '#2A1A08' },
  { name: 'Ananya Singh',   role: 'Creative Director', initials: 'AS', accent: '#C9452A', bg: '#2A1010' },
]

function TeamCard({ member, index }: { member: (typeof team)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const { left, top, width, height } = el.getBoundingClientRect()
    const x = ((e.clientX - left) / width  - 0.5) * 7
    const y = ((e.clientY - top)  / height - 0.5) * 7
    el.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${-y}deg) translateZ(8px)`
  }

  const onLeave = () => {
    if (ref.current)
      ref.current.style.transform = 'perspective(800px) rotateY(0) rotateX(0) translateZ(0)'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ transformStyle: 'preserve-3d', transition: 'transform 0.15s ease-out' }}
      className="group cursor-pointer"
    >
      {/* Card */}
      <div
        className="w-full aspect-[3/4] rounded-2xl flex items-center justify-center relative overflow-hidden mb-4 group-hover:border-white/15 transition-colors duration-300"
        style={{ background: member.bg, border: `1px solid ${member.accent}20` }}
      >
        {/* Subtle radial mandala pattern background */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, ${member.accent} 1px, transparent 1px)`,
            backgroundSize: '20px 20px',
          }}
        />

        {/* Initials */}
        <span
          className="font-display select-none leading-none opacity-20 group-hover:opacity-35 transition-opacity duration-300"
          style={{ fontSize: 'clamp(72px, 12vw, 110px)', color: member.accent }}
        >
          {member.initials}
        </span>

        {/* Glow on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: `radial-gradient(circle at 50% 60%, ${member.accent}20 0%, transparent 65%)` }}
        />

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-28 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: `linear-gradient(to top, ${member.bg}ff, transparent)` }}
        />
      </div>

      {/* Name + role */}
      <div>
        <h3 className="font-display text-2xl text-white uppercase leading-none tracking-tight">
          {member.name}
        </h3>
        <p
          className="font-body text-[10px] tracking-[0.35em] uppercase mt-1.5"
          style={{ color: member.accent }}
        >
          {member.role}
        </p>
      </div>
    </motion.div>
  )
}

export default function Team() {
  return (
    <section id="team" className="bg-green-dark py-28 md:py-36 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20"
        >
          <p className="font-body text-lime text-[10px] tracking-[0.45em] uppercase mb-5">The people</p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2
              className="font-display text-white uppercase leading-none"
              style={{ fontSize: 'clamp(56px, 10vw, 112px)' }}
            >
              TEAM
            </h2>
            <p className="font-body text-white/35 max-w-[260px] text-sm leading-relaxed">
              Driven by passion, united by culture. Meet the committee behind India Society.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-6">
          {team.map((member, i) => (
            <TeamCard key={`${member.name}-${i}`} member={member} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-14"
        >
          <button
            className="font-body text-white/30 text-xs tracking-[0.3em] uppercase transition-colors duration-200"
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = '#FF9500')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.3)')}
          >
            Meet the full committee →
          </button>
        </motion.div>
      </div>
    </section>
  )
}
