import { useState, useEffect } from 'react'
import { Menu, X, ArrowUpRight } from 'lucide-react'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'

const NAV_LINKS = [
  { label: 'Nosotros',     href: '#about'        },
  { label: 'Metodología',  href: '#metodologia'  },
  { label: 'Servicios',    href: '#specialized-services' },
  { label: 'Casos de Éxito',href: '#casos-exito' },
  { label: 'Testimonios',  href: '#testimonials' },
  { label: 'FAQ',          href: '#faq'          },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50)
  })

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [menuOpen])

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 border-b ${
          scrolled
            ? 'py-4 bg-obsidian/80 backdrop-blur-xl border-border/30 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]'
            : 'py-6 bg-gradient-to-b from-obsidian/80 to-transparent border-transparent'
        }`}
      >
        <div className="flex items-center justify-between max-w-screen-xl mx-auto px-6 md:px-12">

          {/* ── Logo ── */}
          <a
            href="#hero"
            className="group relative flex items-center gap-2 z-50"
            onClick={() => setMenuOpen(false)}
          >
            <div className="flex flex-col">
              <span className="font-serif text-2xl md:text-[1.7rem] leading-none text-cream tracking-wide group-hover:text-white transition-colors duration-300">
                Franko
              </span>
              <span className="font-sans text-[0.55rem] md:text-[0.6rem] tracking-[0.3em] uppercase text-gold leading-none mt-1 group-hover:text-gold-light transition-colors duration-300">
                Eventos Corporativos
              </span>
            </div>
            {/* Decorative dot */}
            <span className="absolute -right-3 top-2 w-1 h-1 rounded-full bg-gold opacity-0 group-hover:opacity-100 transition-all duration-500 scale-0 group-hover:scale-100"></span>
          </a>

          {/* ── Desktop Links ── */}
          <div className="hidden lg:flex items-center gap-1">
            <div className="flex items-center bg-ink/40 backdrop-blur-md border border-border/20 rounded-full px-2 py-1.5 mr-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="relative group px-5 py-2"
                >
                  <span className="relative z-10 font-sans text-[0.65rem] tracking-[0.2em] uppercase text-mist/80 group-hover:text-gold transition-colors duration-300">
                    {link.label}
                  </span>
                  {/* Hover background pill */}
                  <span className="absolute inset-0 bg-gold/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-95 group-hover:scale-100"></span>
                </a>
              ))}
            </div>

            <a 
              href="#contact" 
              className="group relative flex items-center gap-2 px-6 py-3 bg-transparent border border-gold/50 rounded-full overflow-hidden transition-all duration-500 hover:border-gold hover:shadow-[0_0_20px_rgba(180,152,90,0.2)]"
            >
              <span className="relative z-10 font-sans text-[0.65rem] tracking-[0.2em] uppercase text-gold group-hover:text-obsidian transition-colors duration-500 font-medium">
                Cotizar
              </span>
              <ArrowUpRight size={14} strokeWidth={2} className="relative z-10 text-gold group-hover:text-obsidian transition-colors duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              {/* Fill background */}
              <div className="absolute inset-0 bg-gold translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            </a>
          </div>

          {/* ── Mobile Hamburger ── */}
          <button
            className="lg:hidden relative z-50 flex items-center justify-center w-12 h-12 rounded-full bg-ink/50 backdrop-blur-md border border-border/30 text-gold hover:bg-gold/10 transition-colors"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
          </button>
        </div>
      </motion.nav>

      {/* ── Mobile Menu Overlay ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[90] bg-obsidian/95 backdrop-blur-2xl flex flex-col lg:hidden pt-32 pb-10 px-8"
          >
            {/* Background decorative glows */}
            <div className="absolute top-1/4 left-0 w-[300px] h-[300px] bg-gold/5 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-0 w-[300px] h-[300px] bg-gold/5 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="flex-1 flex flex-col justify-center gap-6 relative z-10">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 + 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="group flex items-center justify-between border-b border-border/20 pb-4"
                >
                  <span className="font-serif text-3xl md:text-4xl text-mist group-hover:text-gold transition-colors duration-400">
                    {link.label}
                  </span>
                  <ArrowUpRight size={24} strokeWidth={1} className="text-mist/30 group-hover:text-gold transition-all duration-400 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </motion.a>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: NAV_LINKS.length * 0.05 + 0.2, duration: 0.5 }}
              className="relative z-10 mt-10"
            >
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center gap-3 w-full bg-gold text-obsidian py-5 rounded-full font-sans text-[0.8rem] tracking-[0.2em] uppercase font-medium hover:bg-gold-light transition-colors shadow-[0_10px_30px_-10px_rgba(180,152,90,0.4)]"
              >
                <span>Cotizar mi Evento</span>
                <ArrowUpRight size={18} strokeWidth={2} />
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}