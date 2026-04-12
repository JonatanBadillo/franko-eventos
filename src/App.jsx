import Navbar            from './components/Navbar'
import Hero              from './components/Hero'
import AboutUs           from './components/AboutUs'
import Stats             from './components/Stats'
import Services          from './components/Services'
import ExperienceGallery from './components/ExperienceGallery'
import ClientsCarousel   from './components/ClientsCarousel'
import Testimonials      from './components/Testimonials'
import FAQ               from './components/FAQ'
import Contact           from './components/Contact'
import Footer            from './components/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <AboutUs />
        <Stats />
        <Services />
        <ExperienceGallery />
        <ClientsCarousel />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
