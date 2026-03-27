import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'green-deep': '#140608',   // deep maroon (primary dark bg)
        'green-dark': '#0E0305',   // darker maroon
        'green-mid':  '#2D1015',   // mid maroon (card bg)
        lime:         '#FF9500',   // saffron orange (primary accent)
        coral:        '#C9452A',   // crimson (CTA section bg)
        'off-white':  '#FFF8EE',   // warm cream (about section bg)
        gold:         '#F0C040',   // gold accent
        peacock:      '#0FA3A3',   // peacock teal accent
      },
      fontFamily: {
        display: ['Anton', 'Impact', 'sans-serif'],
        body: ['Space Grotesk', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
