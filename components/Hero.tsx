'use client'
import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'

const HeroCanvas = dynamic(() => import('./HeroCanvas'), { ssr: false })

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 30 },
  animate:    { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
})

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center bg-green-deep overflow-hidden">
      {/* Three.js atmospheric canvas — desktop only */}
      {!isMobile && <HeroCanvas />}

      {/* Gradient edges — provide depth on mobile too */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-deep/70 via-transparent to-green-deep pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-green-deep/75 via-transparent to-green-deep/75 pointer-events-none" />

      {/* Saffron warmth from below — replaces the old redundant glow div */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120vw] h-64 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 100%, #FF950018 0%, transparent 70%)' }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto w-full">
        {/* Eyebrow */}
        <motion.p
          {...fadeUp(0.3)}
          className="font-body text-lime text-xs tracking-[0.5em] uppercase mb-5"
        >
          Student Cultural Society · Est. 2012
        </motion.p>

        {/* Main headline — fully readable against the clear centre */}
        <motion.div {...fadeUp(0.45)}>
          <h1
            className="font-display uppercase leading-none tracking-tight text-white"
            style={{ fontSize: 'clamp(72px, 17vw, 200px)' }}
          >
            INDIA
          </h1>
          <h2
            className="font-display uppercase leading-none tracking-tight"
            style={{
              fontSize:   'clamp(28px, 5.5vw, 72px)',
              color:      '#FF9500',
              marginTop:  '-0.05em',
            }}
          >
            SOCIETY
          </h2>
        </motion.div>

        {/* Divider rule */}
        <motion.div
          {...fadeUp(0.55)}
          className="flex items-center justify-center gap-3 mt-5 mb-6"
        >
          <div className="h-px w-12 bg-lime/35" />
          <span className="font-body text-xs tracking-[0.35em] uppercase" style={{ color: '#FF9500', opacity: 0.7 }}>
            Celebrating culture. Building community.
          </span>
          <div className="h-px w-12 bg-lime/35" />
        </motion.div>

        {/* Subtext */}
        <motion.p
          {...fadeUp(0.65)}
          className="font-body text-white/45 text-base md:text-lg max-w-md mx-auto leading-relaxed"
        >
          From Diwali lights to Holi colours — we bring the richness of India to campus, for everyone.
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...fadeUp(0.78)}
          className="flex flex-col sm:flex-row gap-3 justify-center mt-10"
        >
          <a
            href="#join"
            className="font-display text-sm px-10 py-4 rounded-full hover:scale-105 transition-all duration-300 tracking-wider"
            style={{ background: '#FF9500', color: '#140608' }}
          >
            JOIN THE SOCIETY
          </a>
          <a
            href="#events"
            className="font-body text-sm border border-white/20 text-white/65 px-10 py-4 rounded-full hover:border-[#FF9500] hover:text-[#FF9500] transition-all duration-300 tracking-wide"
          >
            Explore Events
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="mt-24 flex flex-wrap gap-10 justify-center"
        >
          {[
            { num: '300+', label: 'Members' },
            { num: '25+',  label: 'Events / year' },
            { num: '30+',  label: 'Countries' },
            { num: '12',   label: 'Years running' },
          ].map(({ num, label }) => (
            <div key={label} className="text-center">
              <div
                className="font-display leading-none"
                style={{ fontSize: 'clamp(32px, 5vw, 52px)', color: '#FF9500' }}
              >
                {num}
              </div>
              <div className="font-body text-[10px] text-white/30 tracking-[0.35em] mt-1.5 uppercase">
                {label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-body text-[10px] text-white/20 tracking-[0.4em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className="w-px h-10"
          style={{ background: 'linear-gradient(to bottom, #FF9500aa, transparent)' }}
        />
      </motion.div>
    </section>
  )
}
