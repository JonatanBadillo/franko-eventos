import { motion } from 'framer-motion'
import {
  Search,
  Lightbulb,
  CalendarDays,
  Activity,
  BarChart3,
} from 'lucide-react'

const STEPS = [
  {
    num: '01',
    icon: Search,
    name: 'Diagnóstico',
    desc: 'Análisis profundo de objetivos, audiencia y contexto organizacional.',
  },
  {
    num: '02',
    icon: Lightbulb,
    name: 'Diseño',
    desc: 'Conceptualización estratégica y propuesta de experiencia única.',
  },
  {
    num: '03',
    icon: CalendarDays,
    name: 'Planificación',
    desc: 'Logística detallada, proveedores y cronograma preciso.',
  },
  {
    num: '04',
    icon: Activity,
    name: 'Ejecución',
    desc: 'Implementación impecable con monitoreo en tiempo real.',
  },
  {
    num: '05',
    icon: BarChart3,
    name: 'Evaluación',
    desc: 'Medición de resultados y aprendizajes para mejora continua.',
  },
]

export default function Services() {
  return (
    <section
      id="metodologia"
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
          className="text-center mb-16"
        >
          <span className="section-label" style={{ display: 'inline-block', marginBottom: '1rem' }}>Nuestro Proceso</span>
          <h2
            className="font-serif text-cream leading-tight mb-4"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 500 }}
          >
            Metodología <em className="italic text-gold-light">Franko</em>
          </h2>
          <p className="font-sans text-mist text-[0.95rem] font-light">
            Nuestro proceso probado en más de 500 eventos corporativos exitosos
          </p>
        </motion.div>

        {/* Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          style={{
            gap: '1.5px',
            background: 'var(--border)',
          }}
        >
          {/* Renderizado de los 5 pasos */}
          {STEPS.map((step, i) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{
                  duration: 0.75,
                  delay: (i % 3) * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -4 }}
                className="group relative overflow-hidden cursor-pointer"
                style={{ background: 'var(--card)', padding: '2.5rem 2rem' }}
              >
                {/* Hover gradient overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: 'linear-gradient(135deg, var(--gold-pale), transparent)' }}
                />

                {/* Box shadow on hover */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={false}
                  whileHover={{ boxShadow: '0 24px 60px rgba(0,0,0,0.55)' }}
                />

                {/* Number */}
                <span
                  className="font-serif leading-none mb-4 block transition-colors duration-500"
                  style={{
                    fontSize: '3.2rem',
                    fontWeight: 300,
                    color: 'rgba(180,152,90,0.12)',
                  }}
                >
                  {step.num}
                </span>

                {/* Icon */}
                <div
                  className="w-11 h-11 flex items-center justify-center mb-5
                             border transition-all duration-500
                             group-hover:border-gold group-hover:bg-gold-pale"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <Icon
                    size={16}
                    strokeWidth={1.3}
                    className="text-gold"
                  />
                </div>

                {/* Name */}
                <h3
                  className="font-serif text-cream mb-3 leading-snug"
                  style={{ fontSize: '1.3rem', fontWeight: 500 }}
                >
                  {step.name}
                </h3>

                {/* Description */}
                <p className="font-sans text-mist text-[0.85rem] leading-relaxed">
                  {step.desc}
                </p>

                {/* Arrow */}
                <span
                  className="absolute bottom-5 right-5 text-gold text-lg
                             opacity-0 translate-x-[-8px]
                             group-hover:opacity-100 group-hover:translate-x-0
                             transition-all duration-400"
                >
                  →
                </span>
              </motion.div>
            )
          })}

          {/* TARJETA 6: CALL TO ACTION (Rellena el hueco) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.75, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center justify-center text-center relative overflow-hidden"
            style={{ 
              background: 'linear-gradient(135deg, var(--card), #14171f)', 
              padding: '2.5rem 2rem' 
            }}
          >
            <div className="absolute inset-0 pointer-events-none" style={{ border: '1px solid rgba(180,152,90,0.1)' }} />
            <h3 className="font-serif text-gold-light mb-4" style={{ fontSize: '1.8rem', fontWeight: 500 }}>
              ¿Listo para empezar?
            </h3>
            <p className="font-sans text-mist text-[0.9rem] mb-8 px-4 leading-relaxed">
              Hablemos sobre los objetivos de tu próximo evento corporativo y cómo podemos hacerlo extraordinario.
            </p>
            <a 
              href="#contact" 
              className="px-8 py-3 text-[0.75rem] tracking-[0.2em] uppercase border border-gold text-gold hover:bg-gold hover:text-obsidian transition-colors duration-400"
            >
              Cotizar Evento
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  )
}