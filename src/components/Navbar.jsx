import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Nosotros',     href: '#about'        },
  { label: 'Servicios',    href: '#services'     },
  { label: 'Galería',      href: '#gallery'      },
  { label: 'Clientes',     href: '#testimonials' },
  { label: 'Contacto',     href: '#contact'      },
]

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500
        ${scrolled
          ? 'bg-obsidian/90 backdrop-blur-xl border-b border-border py-4 px-8 md:px-16'
          : 'bg-transparent py-6 px-8 md:px-16'
        }`}
    >
      <div className="flex items-center justify-between max-w-screen-xl mx-auto">

        {/* ── Logo ── SWAP: replace with <img src="/logo.svg" alt="Franko Eventos" /> */}
        <a
          href="#hero"
          className="font-serif text-xl tracking-wide text-cream hover:text-gold transition-colors duration-300"
        >
          Franko <span className="text-gold">Eventos</span>
        </a>

        {/* ── Desktop Links ── */}
        <div className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-mist hover:text-gold transition-colors duration-300
                         text-[0.7rem] tracking-[0.14em] uppercase font-sans"
            >
              {link.label}
            </a>
          ))}

          <a href="#contact" className="btn-outline-gold ml-2">
            Cotizar Evento
          </a>
        </div>

        {/* ── Mobile Hamburger ── */}
        <button
          className="md:hidden text-cream p-1"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* ── Mobile Drawer ── */}
      {menuOpen && (
        <div
          className="md:hidden absolute top-full left-0 right-0
                     bg-ink/95 backdrop-blur-xl border-b border-border
                     flex flex-col gap-0"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-mist hover:text-gold hover:bg-gold-pale
                         text-[0.72rem] tracking-[0.16em] uppercase
                         px-8 py-4 border-b border-border transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="btn-outline-gold m-6 text-center"
          >
            Cotizar Evento
          </a>
        </div>
      )}
    </nav>
  )
}
