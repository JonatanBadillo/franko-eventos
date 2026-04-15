import { motion } from 'framer-motion'

const PILARES = [
  { titulo: 'Precisión',  etiqueta: 'Logística Impecable' },
  { titulo: 'Diseño',     etiqueta: 'Conceptos a Medida'  },
  { titulo: 'Impacto',    etiqueta: 'Experiencias Únicas' },
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
          
          <h2
            className="font-serif text-cream mb-4 leading-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 500 }}
          >
            Nuestro<em className="italic text-gold-light"> Propósito</em>
          </h2>
          <div className="gold-line" />

          <div className="space-y-4 text-mist font-sans font-light text-[0.93rem] leading-relaxed">
            <p>
            Cada evento corporativo es una oportunidad única para fortalecer la imagen, cultura y relaciones de tu organización.
            </p>
            <p>
            Diseñamos experiencias estratégicas que trascienden lo convencional.
            </p>
          </div>

          {/* Pilares de la marca en lugar de números */}
          <div className="flex flex-wrap gap-x-12 gap-y-8 mt-10">
            {PILARES.map((p) => (
              <div key={p.titulo} className="flex flex-col gap-1 border-l border-border pl-4">
                <span
                  className="font-serif text-gold font-light leading-none"
                  style={{ fontSize: '1.8rem' }}
                >
                  {p.titulo}
                </span>
                <span className="font-sans text-mist text-[0.70rem] tracking-[0.15em] uppercase">
                  {p.etiqueta}
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

          {/* Large card — top right */}
          <motion.div
            whileHover={{ y: -8, scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 220, damping: 22 }}
            className="absolute top-0 right-0 border border-border overflow-hidden"
            style={{
              width: '65%', height: '360px',
              backgroundImage: `url('${import.meta.env.BASE_URL}images/proposito1.png')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Gold badge */}
            <div
              className="absolute -bottom-4 -right-4 z-10 text-center"
              style={{ background: 'var(--gold)', padding: '1rem 1.2rem' }}
            >
              <span className="font-serif block leading-none text-obsidian" style={{ fontSize: '2rem', fontWeight: 600 }}>+15</span>
              <span className="font-sans text-obsidian text-[0.55rem] tracking-[0.14em] uppercase">
                Años de<br />excelencia
              </span>
            </div>
          </motion.div>

          {/* Small card — bottom left */}
          <motion.div
            whileHover={{ y: -8, scale: 1.01 }}
            transition={{ type: 'spring', stiffness: 220, damping: 22 }}
            className="absolute bottom-0 left-0 rounded-xl border border-border overflow-hidden shadow-lg z-10"
            style={{
              width: '55%', 
              height: '260px',
              backgroundImage: `url('${import.meta.env.BASE_URL}images/proposito2.png')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
          </motion.div>

        </motion.div>

      </div>
    </section>
  )
}