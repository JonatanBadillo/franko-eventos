import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const TESTIMONIALS = [
  {
    quote:
      'Franko Eventos superó todas nuestras expectativas. La organización fue impecable y la producción, verdaderamente de clase mundial. Nuestro congreso anual quedó grabado en la mente de los 1,200 asistentes.',
    name:  'Lic. Patricia Mendoza',
    role:  'Directora de Recursos Humanos',
    company: 'Grupo Industrial del Norte',
    stars: 5,
  },
  {
    quote:
      'El nivel de atención al detalle es extraordinario. Desde el primer briefing hasta el desmontaje del evento, el equipo demostró un profesionalismo que no habíamos encontrado en ninguna otra agencia.',
    name:  'Ing. Roberto Salas',
    role:  'VP de Marketing',
    company: 'Corporativo Avanzado S.A.',
    stars: 5,
  },
  {
    quote:
      'Llevamos 4 años consecutivos confiando en Franko para nuestra gala anual. Cada año elevan el estándar. Son verdaderamente socios estratégicos, no solo proveedores de servicios.',
    name:  'Mtra. Claudia Vega',
    role:  'Gerente de Comunicación Corporativa',
    company: 'Financiera Alianza',
    stars: 5,
  },
]

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="py-28 px-8 md:px-16"
      style={{ background: 'var(--ink)' }}
    >
      <div className="max-w-screen-xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <span className="section-label" style={{ display: 'block' }}>Testimonios</span>
          <h2
            className="font-serif text-cream"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 500 }}
          >
            Lo que dicen nuestros{' '}
            <em className="italic text-gold-light">Clientes</em>
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.8,
                delay: i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -6, boxShadow: '0 20px 50px rgba(0,0,0,0.45)' }}
              className="relative p-8 border transition-shadow duration-400"
              style={{ background: 'var(--card)', borderColor: 'var(--border)' }}
            >
              {/* Decorative quote mark */}
              <span
                className="absolute top-5 right-6 font-serif text-gold pointer-events-none leading-none select-none"
                style={{ fontSize: '5rem', fontWeight: 700, opacity: 0.07 }}
              >
                "
              </span>

              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {Array.from({ length: t.stars }).map((_, si) => (
                  <Star
                    key={si}
                    size={13}
                    strokeWidth={0}
                    fill="var(--gold)"
                    className="text-gold"
                  />
                ))}
              </div>

              {/* Quote */}
              <blockquote
                className="font-serif italic text-cream leading-relaxed mb-6"
                style={{ fontSize: '1.08rem' }}
              >
                "{t.quote}"
              </blockquote>

              {/* Divider */}
              <div className="gold-line" style={{ margin: '0 0 1rem' }} />

              {/* Author */}
              <p className="font-sans text-cream text-[0.8rem] font-medium tracking-wide">
                {t.name}
              </p>
              <p className="font-sans text-mist text-[0.72rem] mt-0.5">
                {t.role} · {t.company}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
