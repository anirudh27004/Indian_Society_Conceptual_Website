'use client'

const links = {
  Society:   ['About', 'Events', 'Team', 'Gallery'],
  Connect:   ['Instagram', 'Facebook', 'LinkedIn', 'WhatsApp'],
  Resources: ['Membership', 'Newsletter', 'Press Kit', 'Contact'],
}

export default function Footer() {
  return (
    <footer className="bg-green-dark border-t border-white/6 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            {/* Logo mark */}
            <div className="flex items-center gap-2.5 mb-4">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ background: '#FF9500', boxShadow: '0 0 10px #FF950088' }}
              />
              <span className="font-display text-4xl leading-none" style={{ color: '#FF9500' }}>
                IS
              </span>
            </div>
            <p className="font-body text-white/35 text-sm leading-relaxed max-w-[200px]">
              India Society — celebrating culture, building community, one event at a time.
            </p>

            {/* Social */}
            <div className="flex gap-4 mt-6">
              <a href="#" aria-label="Instagram" className="text-white/25 hover:text-[#FF9500] transition-colors duration-200">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="font-body text-[10px] text-white/25 tracking-[0.35em] uppercase mb-6">
                {category}
              </h4>
              <ul className="space-y-3">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="font-body text-sm text-white/40 hover:text-[#FF9500] transition-colors duration-200"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 pt-8 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="font-body text-[11px] text-white/20">
            © 2026 India Society. All rights reserved.
          </p>
          <p className="font-body text-[11px] text-white/15">
            University of Excellence · Student Union Building, Room 12
          </p>
        </div>
      </div>
    </footer>
  )
}
