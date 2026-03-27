'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = ['EVENTS', 'ABOUT', 'TEAM', 'GALLERY']

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-5 flex items-center justify-between transition-all duration-500 ${
        scrolled
          ? 'bg-[#140608]/95 backdrop-blur-md border-b border-white/5 shadow-lg shadow-black/30'
          : 'bg-transparent'
      }`}
    >
      {/* Logo — Ashoka Chakra dot + wordmark */}
      <a href="#" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
        {/* Small saffron dot suggesting the chakra */}
        <span
          className="w-2 h-2 rounded-full"
          style={{ background: '#FF9500', boxShadow: '0 0 8px #FF9500aa' }}
        />
        <span className="font-display text-xl tracking-tight" style={{ color: '#FF9500' }}>
          INDIAN SOC
        </span>
      </a>

      {/* Desktop nav */}
      <div className="hidden md:flex items-center gap-10">
        {navLinks.map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            className="font-body text-xs font-medium text-white/45 hover:text-[#FF9500] transition-colors duration-200 tracking-[0.25em]"
          >
            {link}
          </a>
        ))}
      </div>

      {/* CTA + social */}
      <div className="hidden md:flex items-center gap-6">
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noreferrer"
          className="text-white/30 hover:text-[#FF9500] transition-colors"
          aria-label="Instagram"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        </a>
        <a
          href="#join"
          className="font-display text-xs px-7 py-3 rounded-full hover:scale-105 transition-all duration-200 tracking-wider"
          style={{ background: '#FF9500', color: '#140608' }}
        >
          JOIN NOW
        </a>
      </div>

      {/* Mobile hamburger */}
      <button
        className="md:hidden flex flex-col gap-1.5 p-1 text-white"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <motion.span animate={menuOpen ? { rotate: 45, y: 8 }  : { rotate: 0, y: 0 }}  className="block w-6 h-0.5 bg-current origin-center" />
        <motion.span animate={menuOpen ? { opacity: 0 }         : { opacity: 1 }}        className="block w-6 h-0.5 bg-current" />
        <motion.span animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}  className="block w-6 h-0.5 bg-current origin-center" />
      </button>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 right-0 bg-[#140608] border-b border-white/8 overflow-hidden"
          >
            <div className="px-6 py-8 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                  className="font-display text-4xl text-white/65 uppercase tracking-tight py-2 hover:text-[#FF9500] transition-colors"
                >
                  {link}
                </motion.a>
              ))}
              <motion.a
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.25 }}
                href="#join"
                onClick={() => setMenuOpen(false)}
                className="mt-6 font-display text-sm px-8 py-4 rounded-full text-center tracking-wider"
                style={{ background: '#FF9500', color: '#140608' }}
              >
                JOIN NOW
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
