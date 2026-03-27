import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Events from '@/components/Events'
import About from '@/components/About'
import Team from '@/components/Team'
import Gallery from '@/components/Gallery'
import MembershipCTA from '@/components/MembershipCTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Events />
      <About />
      <Team />
      <Gallery />
      <MembershipCTA />
      <Footer />
    </main>
  )
}
