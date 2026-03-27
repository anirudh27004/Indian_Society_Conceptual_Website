'use client'
import { useRef } from 'react'
import { motion } from 'framer-motion'

const perks = [
  'Free entry to Diwali Night & Holi Bash',
  'Priority tickets to all cultural events',
  'Access to traditional dance workshops',
  'Authentic Indian food at every event',
  'Bollywood film screening nights',
  'Members-only WhatsApp & Discord',
]

export default function MembershipCTA() {
  const cardRef = useRef<HTMLDivElement>(null)

  const onCardMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current
    if (!el) return
    const { left, top, width, height } = el.getBoundingClientRect()
    const x = ((e.clientX - left) / width  - 0.5) * 12
    const y = ((e.clientY - top)  / height - 0.5) * 12
    el.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg) translateZ(10px)`
  }
  const onCardLeave = () => {
    if (cardRef.current)
      cardRef.current.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0px)'
  }

  return (
    <section id="join" className="bg-coral py-28 md:py-36 px-6 overflow-hidden relative">
      {/* Decorative circles — like a mandala border */}
      <div className="absolute -top-36 -right-36 w-[540px] h-[540px] rounded-full border border-white/8  pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-96   h-96   rounded-full border border-white/5  pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-80 h-80   rounded-full border border-white/8  pointer-events-none" />
      <div className="absolute top-[20%] right-[12%] w-28 h-28  rounded-full border border-white/10 pointer-events-none" />

      {/* Gold glow */}
      <div
        className="absolute bottom-0 right-0 w-[450px] h-[450px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #F0C04012 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-16">
          {/* Headline */}
          <div className="flex-1">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-body text-white/50 text-[10px] tracking-[0.45em] uppercase mb-5"
            >
              Become a member
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-white uppercase leading-none mb-8"
              style={{ fontSize: 'clamp(60px, 10vw, 128px)' }}
            >
              JOIN<br />THE<br />
              <span style={{ color: '#F0C040' }}>FAMILY</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="font-body text-white/55 max-w-sm leading-relaxed"
            >
              Whether you are from Delhi or Dublin, Bengaluru or Birmingham — you belong here.
            </motion.p>
          </div>

          {/* Membership card — 3D tilt on hover */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.96 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            ref={cardRef}
            onMouseMove={onCardMove}
            onMouseLeave={onCardLeave}
            className="w-full max-w-sm rounded-3xl p-9"
            style={{
              background:       'rgba(255,255,255,0.10)',
              backdropFilter:   'blur(12px)',
              border:           '1px solid rgba(255,255,255,0.18)',
              transformStyle:   'preserve-3d',
              transition:       'transform 0.12s ease-out',
              willChange:       'transform',
            }}
          >
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-display text-2xl text-white uppercase tracking-tight leading-tight">
                Annual<br />Membership
              </h3>
              <span
                className="font-body text-[10px] text-white/40 px-3 py-1 rounded-full tracking-widest uppercase"
                style={{ background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.15)' }}
              >
                2026–27
              </span>
            </div>

            <div className="flex items-baseline gap-2 mt-6 mb-8">
              <span className="font-display text-6xl leading-none" style={{ color: '#F0C040' }}>
                £10
              </span>
              <span className="font-body text-white/40 text-sm">/ year</span>
            </div>

            <ul className="space-y-3 mb-9">
              {perks.map((perk) => (
                <li key={perk} className="flex items-start gap-3">
                  <span className="text-base leading-snug mt-0.5 shrink-0" style={{ color: '#F0C040' }}>✓</span>
                  <span className="font-body text-sm text-white/65 leading-snug">{perk}</span>
                </li>
              ))}
            </ul>

            <button
              className="w-full font-display text-sm py-4 rounded-full hover:scale-[1.02] transition-all duration-200 tracking-wider"
              style={{ background: '#F0C040', color: '#140608' }}
            >
              JOIN NOW
            </button>

            <p className="font-body text-[10px] text-white/30 text-center mt-4">
              Payment via Student Union portal
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
