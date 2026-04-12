import { motion } from 'framer-motion'

const STATS = [
  { num: '500+', label: 'Eventos realizados'    },
  { num: '10+',  label: 'Años de experiencia'   },
  { num: '98%',  label: 'Clientes satisfechos'  },
]

const reveal = {
  initial:   { opacity: 0, y: 36 },
  whileInView: { opacity: 1, y: 0 },
  viewport:  { once: true, amount: 0.15 },
  transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
}

export default function AboutUs() {
  return (
    <section
      id="about"
      className="py-28 px-8 md:px-16"
      style={{ background: 'var(--obsidian)' }}
    >
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-28 items-center">

        {/* ── Left: Text ── */}
        <motion.div {...reveal}>
          <span className="section-label">Quiénes Somos</span>
          <h2
            className="font-serif text-cream mb-4 leading-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 500 }}
          >
            Más de una Década<br />
            Creando <em className="italic text-gold-light">Momentos</em>
          </h2>
          <div className="gold-line" />

          <div className="space-y-4 text-mist font-sans font-light text-[0.93rem] leading-relaxed">
            <p>
              Franko Eventos Corporativos nació de la convicción de que cada evento es una
              oportunidad de comunicar grandeza. Somos un equipo de especialistas en producción,
              logística y diseño de experiencias que trabajan en perfecta sincronía.
            </p>
            <p>
              Nuestra misión es transformar los objetivos corporativos de nuestros clientes en
              eventos memorables que fortalecen la cultura organizacional, las relaciones
              comerciales y la identidad de marca.
            </p>
            <p>
              Con presencia en todo México y una red de proveedores premium, garantizamos
              estándares de calidad internacionales en cada proyecto.
            </p>
          </div>

          {/* Mini stats */}
          <div className="flex flex-wrap gap-10 mt-10">
            {STATS.map((s) => (
              <div key={s.label} className="flex items-baseline gap-2">
                <span
                  className="font-serif text-gold font-light leading-none"
                  style={{ fontSize: '2.8rem' }}
                >
                  {s.num}
                </span>
                <span className="font-sans text-mist text-[0.75rem] tracking-wide uppercase">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Right: Image composition ── */}
        <motion.div
          {...reveal}
          transition={{ ...reveal.transition, delay: 0.15 }}
          className="relative hidden lg:block"
          style={{ height: '520px' }}
        >
          {/*
           * SWAP: Add real photos by replacing the gradient backgrounds below with:
           *   style={{ backgroundImage: "url('/images/about-1.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}
           */}

          {/* Large card — top right */}
          <motion.div
            whileHover={{ y: -8, scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 220, damping: 22 }}
            className="absolute top-0 right-0 border border-border overflow-hidden"
            style={{
              width: '65%', height: '360px',
              background: 'linear-gradient(135deg, #1e2532, #2a2015)',
            }}
          >
            {/* SWAP: <img src="/images/about-1.jpg" className="w-full h-full object-cover" alt="Evento corporativo" /> */}
            <span className="absolute bottom-3 left-3 text-[0.6rem] tracking-[0.2em] uppercase text-white/20 font-sans">
              ← Foto del equipo / evento
            </span>

            {/* Gold badge */}
            <div
              className="absolute -bottom-4 -right-4 z-10 text-center"
              style={{ background: 'var(--gold)', padding: '1rem 1.2rem' }}
            >
              <span className="font-serif block leading-none text-obsidian" style={{ fontSize: '2rem', fontWeight: 600 }}>10</span>
              <span className="font-sans text-obsidian text-[0.55rem] tracking-[0.14em] uppercase">
                Años de<br />excelencia
              </span>
            </div>
          </motion.div>

          {/* Small card — bottom left */}
          <motion.div
            whileHover={{ y: -8, scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 220, damping: 22 }}
            className="absolute bottom-0 left-0 border border-border overflow-hidden z-10"
            style={{
              width: '55%', height: '260px',
              background: 'linear-gradient(135deg, #201a12, #1a2028)',
            }}
          >
            {/* SWAP: <img src="/images/about-2.jpg" className="w-full h-full object-cover" alt="Evento flagship" /> */}
            <span className="absolute bottom-3 left-3 text-[0.6rem] tracking-[0.2em] uppercase text-white/20 font-sans">
              ← Foto evento flagship
            </span>
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}
