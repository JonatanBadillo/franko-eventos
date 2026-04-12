import { motion } from 'framer-motion'

/*
 * SWAP: Replace each { name } entry with a real logo.
 * Import each as an SVG/PNG and render:
 *   <img src={logo.src} alt={logo.name} className="h-8 object-contain" />
 *
 * Keep filter: 'grayscale(1) brightness(1.8)' on the <img> for the
 * monochrome premium aesthetic.
 */
const CLIENTS = [
  { name: 'Grupo Bimbo'   },
  { name: 'FEMSA'         },
  { name: 'Banorte'       },
  { name: 'Cemex'         },
  { name: 'América Móvil' },
  { name: 'Grupo Modelo'  },
  { name: 'Liverpool'     },
  { name: 'Televisa'      },
  { name: 'BBVA México'   },
  { name: 'Scotiabank'    },
  { name: 'Heineken MX'   },
  { name: 'Nissan MX'     },
]

// Duplicate array so the marquee loops seamlessly
const TRACK = [...CLIENTS, ...CLIENTS]

export default function ClientsCarousel() {
  return (
    <section
      id="clients"
      className="py-20 overflow-hidden"
      style={{ background: 'var(--charcoal)' }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="text-center mb-12 px-8"
      >
        <span className="section-label" style={{ display: 'block' }}>
          Marcas que confían en nosotros
        </span>
        <h2
          className="font-serif text-cream"
          style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 500 }}
        >
          Nuestros <em className="italic text-gold-light">Clientes</em>
        </h2>
      </motion.div>

      {/* Marquee wrapper */}
      <div className="relative overflow-hidden">

        {/* Fade edges */}
        <div
          className="pointer-events-none absolute top-0 left-0 bottom-0 z-10 w-32"
          style={{ background: 'linear-gradient(to right, var(--charcoal), transparent)' }}
        />
        <div
          className="pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-32"
          style={{ background: 'linear-gradient(to left, var(--charcoal), transparent)' }}
        />

        {/* Moving track */}
        <div
          className="marquee-track flex gap-16 w-max"
        >
          {TRACK.map((client, i) => (
            <div
              key={i}
              className="flex items-center justify-center h-10 transition-opacity duration-300"
              style={{
                opacity: 0.32,
                filter: 'grayscale(1) brightness(1.8)',
                cursor: 'default',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.75')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '0.32')}
            >
              {/*
               * SWAP: Replace the <span> below with your actual logo image:
               * <img src={`/images/clients/${client.slug}.svg`} alt={client.name} className="h-8 object-contain" />
               */}
              <span
                className="font-serif text-cream whitespace-nowrap"
                style={{ fontSize: '1.05rem', letterSpacing: '0.15em' }}
              >
                {client.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
