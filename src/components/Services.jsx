import { motion, useInView } from 'framer-motion'
import {
  Search,
  Lightbulb,
  CalendarDays,
  Activity,
  BarChart3,
  ArrowRight
} from 'lucide-react'
import { useRef } from 'react'

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
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.1 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  }

  return (
    <section
      id="metodologia"
      className="relative py-28 px-6 md:px-12 bg-ink overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[500px] bg-gold/5 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="relative z-10 max-w-screen-xl mx-auto" ref={containerRef}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <span className="inline-block py-1 px-3 mb-6 border border-gold/30 rounded-full font-sans text-[0.7rem] tracking-[0.2em] text-gold uppercase bg-gold/5 backdrop-blur-sm">
            Nuestro Proceso
          </span>
          <h2 className="font-serif text-cream leading-tight mb-5 text-4xl md:text-5xl lg:text-6xl font-medium">
            Metodología <em className="italic text-gold-light font-light">Franko</em>
          </h2>
          <p className="font-sans text-mist text-base md:text-lg max-w-2xl mx-auto font-light">
            Nuestro proceso estructurado y perfeccionado a través de más de 500 eventos corporativos extraordinarios.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {STEPS.map((step) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.num}
                variants={itemVariants}
                className="group relative flex flex-col p-8 md:p-10 rounded-2xl bg-card/40 backdrop-blur-sm border border-border/30 hover:bg-card/80 hover:border-gold/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(180,152,90,0.15)] overflow-hidden cursor-default"
              >
                {/* Subtle hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-gold/0 via-gold/0 to-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                {/* Watermark Number */}
                <div className="absolute -right-4 -top-6 font-serif text-[8rem] font-light text-border/20 group-hover:text-gold/10 transition-colors duration-500 select-none pointer-events-none">
                  {step.num}
                </div>

                {/* Header: Icon & Step Number */}
                <div className="flex items-start justify-between mb-8 relative z-10">
                  <div className="relative flex items-center justify-center w-14 h-14 rounded-full border border-border/50 bg-charcoal group-hover:border-gold/50 group-hover:bg-gold/10 transition-all duration-500">
                    <Icon size={24} strokeWidth={1.5} className="text-gold group-hover:text-gold-light group-hover:scale-110 transition-all duration-500" />
                  </div>
                  <span className="font-sans text-sm font-medium tracking-widest text-mist/60 group-hover:text-gold transition-colors duration-500 mt-2">
                    PASO {step.num}
                  </span>
                </div>

                {/* Content */}
                <div className="relative z-10 flex-grow">
                  <h3 className="font-serif text-cream text-2xl font-medium mb-3 group-hover:text-white transition-colors duration-500">
                    {step.name}
                  </h3>
                  <p className="font-sans text-mist text-sm leading-relaxed group-hover:text-cream/80 transition-colors duration-500">
                    {step.desc}
                  </p>
                </div>
                
                {/* Decorative bottom line */}
                <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-gold to-gold-light group-hover:w-full transition-all duration-700 ease-in-out"></div>
              </motion.div>
            )
          })}

          {/* Call to Action Card */}
          <motion.div
            variants={itemVariants}
            className="group relative flex flex-col items-center justify-center text-center p-8 md:p-10 rounded-2xl bg-gradient-to-br from-charcoal to-obsidian border border-gold/20 overflow-hidden hover:border-gold/50 transition-all duration-500"
          >
            {/* Animated background glow inside CTA */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/10 via-transparent to-transparent opacity-50 group-hover:opacity-100 group-hover:scale-150 transition-all duration-700 pointer-events-none"></div>

            <div className="relative z-10">
              <h3 className="font-serif text-gold-light text-3xl font-medium mb-4">
                ¿Listo para empezar?
              </h3>
              <p className="font-sans text-mist text-sm leading-relaxed mb-8 px-2 group-hover:text-cream transition-colors duration-500">
                Hablemos sobre los objetivos de tu próximo evento y cómo podemos hacerlo extraordinario.
              </p>
              
              <a 
                href="#contact" 
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-transparent border border-gold text-gold font-sans text-xs tracking-[0.2em] uppercase hover:bg-gold hover:text-obsidian transition-all duration-400 rounded-full"
              >
                <span>Cotizar Evento</span>
                <ArrowRight size={16} strokeWidth={2} className="group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  )
}