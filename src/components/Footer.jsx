import { Instagram, Linkedin, Facebook } from 'lucide-react'

const QUICK_LINKS = [
  { label: 'Nosotros',  href: '#about'        },
  { label: 'Servicios', href: '#services'     },
  { label: 'Galería',   href: '#gallery'      },
  { label: 'Contacto',  href: '#contact'      },
]

const LEGAL_LINKS = [
  /* SWAP: Replace href with real pages */
  { label: 'Aviso de Privacidad',    href: '/privacidad'          },
  { label: 'Términos y Condiciones', href: '/terminos'            },
]

const SOCIAL = [
  { icon: Instagram, label: 'Instagram', href: '#' /* SWAP */ },
  { icon: Linkedin,  label: 'LinkedIn',  href: '#' /* SWAP */ },
  { icon: Facebook,  label: 'Facebook',  href: '#' /* SWAP */ },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      style={{
        background:   'var(--obsidian)',
        borderTop:    '1px solid var(--border)',
      }}
    >
      {/* ── Main footer body ── */}
      <div className="max-w-screen-xl mx-auto px-8 md:px-16 py-14 grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* Brand column */}
        <div>
          {/* SWAP: Replace text logo with <img src="/logo.svg" alt="Franko Eventos" className="h-8 mb-4" /> */}
          <a
            href="#hero"
            className="font-serif text-xl text-cream tracking-wide hover:text-gold transition-colors inline-block mb-4"
          >
            Franko <span className="text-gold">Eventos</span>
          </a>
          <p
            className="font-sans text-mist leading-relaxed max-w-xs"
            style={{ fontSize: '0.82rem' }}
          >
            Diseñamos experiencias corporativas que trascienden lo ordinario.
            Cada evento, una obra maestra.
          </p>

          <div className="flex gap-3 mt-6">
            {SOCIAL.map((s) => {
              const Icon = s.icon
              return (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 flex items-center justify-center border
                             text-mist hover:text-gold hover:border-gold
                             transition-all duration-300"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <Icon size={13} strokeWidth={1.5} />
                </a>
              )
            })}
          </div>
        </div>

        {/* Quick links */}
        <div>
          <p
            className="font-sans text-gold mb-5"
            style={{ fontSize: '0.65rem', letterSpacing: '0.28em', textTransform: 'uppercase' }}
          >
            Navegación
          </p>
          <ul className="space-y-3">
            {QUICK_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="font-sans text-mist hover:text-gold transition-colors duration-300"
                  style={{ fontSize: '0.82rem', letterSpacing: '0.05em' }}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal + CTA */}
        <div>
          <p
            className="font-sans text-gold mb-5"
            style={{ fontSize: '0.65rem', letterSpacing: '0.28em', textTransform: 'uppercase' }}
          >
            Legal
          </p>
          <ul className="space-y-3 mb-8">
            {LEGAL_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="font-sans text-mist hover:text-gold transition-colors duration-300"
                  style={{ fontSize: '0.82rem', letterSpacing: '0.05em' }}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <a href="#contact" className="btn-outline-gold">
            Cotizar Evento
          </a>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div
        className="max-w-screen-xl mx-auto px-8 md:px-16 py-5 flex flex-col sm:flex-row items-center justify-between gap-3"
        style={{ borderTop: '1px solid var(--border)' }}
      >
        <p
          className="font-sans text-mist text-center"
          style={{ fontSize: '0.7rem', letterSpacing: '0.08em' }}
        >
          © {year} Franko Eventos Corporativos. Todos los derechos reservados.
        </p>
        <p
          className="font-sans text-mist"
          style={{ fontSize: '0.7rem', letterSpacing: '0.06em', opacity: 0.5 }}
        >
          {/* SWAP: Replace with your city / tagline */}
          Ciudad de México, México
        </p>
      </div>
    </footer>
  )
}
