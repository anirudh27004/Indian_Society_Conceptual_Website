'use client'
import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useMotionValue, animate, useInView } from 'framer-motion'

// Stats with numeric values separated from display suffix
const stats = [
  { value: 300, suffix: '+', label: 'Active members',   bg: '#2D1015', accent: '#FF9500' },
  { value: 30,  suffix: '+', label: 'Countries',         bg: '#0D2320', accent: '#0FA3A3' },
  { value: 25,  suffix: '+', label: 'Events / year',     bg: '#2D1015', accent: '#F0C040' },
  { value: 12,  suffix: '',  label: 'Years of heritage', bg: '#2A1010', accent: '#C9452A' },
]

const pillars = [
  { icon: '🪔', label: 'Heritage' },
  { icon: '🎨', label: 'Culture'  },
  { icon: '🤝', label: 'Unity'    },
  { icon: '🌺', label: 'Community'},
]

// ── Animated counter ───────────────────────────────────────────
function AnimatedNumber({ value, suffix, accent }: { value: number; suffix: string; accent: string }) {
  const ref      = useRef<HTMLSpanElement>(null)
  const inView   = useInView(ref, { once: true, margin: '-60px' })
  const motionVal = useMotionValue(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(motionVal, value, {
      duration: 1.8,
      ease:     [0.22, 1, 0.36, 1],
    })
    return controls.stop
  }, [inView, motionVal, value])

  // Subscribe to motionVal and update the DOM directly (no re-render per frame)
  useEffect(() => {
    return motionVal.on('change', (latest) => {
      if (ref.current) {
        ref.current.textContent = `${Math.round(latest)}${suffix}`
      }
    })
  }, [motionVal, suffix])

  return (
    <span
      ref={ref}
      className="font-display leading-none"
      style={{ fontSize: 'clamp(34px, 4.5vw, 50px)', color: accent }}
    >
      0{suffix}
    </span>
  )
}

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '8%'])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="bg-off-white py-28 md:py-36 px-6 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Text column */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-body text-[10px] tracking-[0.45em] uppercase mb-6"
              style={{ color: '#140608', opacity: 0.4 }}
            >
              Who we are
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-display uppercase leading-none mb-8"
              style={{ fontSize: 'clamp(48px, 7.5vw, 96px)', color: '#140608' }}
            >
              ONE<br />BILLION<br />
              <span style={{ color: '#FF9500' }}>STORIES.</span><br />
              ONE<br />SOCIETY.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="font-body leading-relaxed text-base mb-4"
              style={{ color: '#140608', opacity: 0.6 }}
            >
              India Society was founded to be a home away from home — a space where Indian students and anyone who loves Indian culture can celebrate, connect, and thrive together.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.28 }}
              className="font-body leading-relaxed text-sm mb-10"
              style={{ color: '#140608', opacity: 0.40 }}
            >
              From classical dance to cricket, from biryani to boardrooms — we embrace every dimension of the subcontinent's extraordinary culture.
            </motion.p>

            {/* Pillars */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35 }}
              className="flex flex-wrap gap-3 mb-10"
            >
              {pillars.map((p) => (
                <div
                  key={p.label}
                  className="flex items-center gap-2 rounded-full px-4 py-2"
                  style={{ background: 'rgba(20,6,8,0.07)', border: '1px solid rgba(20,6,8,0.10)' }}
                >
                  <span className="text-sm">{p.icon}</span>
                  <span className="font-body text-xs tracking-wider" style={{ color: 'rgba(20,6,8,0.55)' }}>
                    {p.label}
                  </span>
                </div>
              ))}
            </motion.div>

            <motion.a
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              href="#join"
              className="inline-block font-display text-sm px-9 py-4 rounded-full hover:scale-105 transition-all duration-300 tracking-wider"
              style={{ background: '#140608', color: '#FF9500' }}
            >
              OUR STORY →
            </motion.a>
          </div>

          {/* Stats grid — numbers count up when scrolled into view */}
          <motion.div style={{ y: bgY }} className="grid grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.88 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-2xl p-8 flex flex-col justify-between min-h-[160px] cursor-default transition-all duration-300 hover:scale-[1.02]"
                style={{ background: s.bg, border: `1px solid ${s.accent}20` }}
              >
                <AnimatedNumber value={s.value} suffix={s.suffix} accent={s.accent} />
                <span
                  className="font-body text-[10px] tracking-[0.3em] uppercase"
                  style={{ color: `${s.accent}80` }}
                >
                  {s.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
