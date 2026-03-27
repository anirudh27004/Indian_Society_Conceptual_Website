import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'India Society — Celebrating Culture. Building Community.',
  description:
    'The premier Indian student society. Diwali, Holi, Bollywood and everything in between.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
