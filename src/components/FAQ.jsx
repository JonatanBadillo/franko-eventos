import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion'
import { ChevronDown, HelpCircle } from 'lucide-react'

const FAQ_ITEMS = [
  {
    q: '¿Con cuánta anticipación debo contratar sus servicios?',
    a: 'Recomendamos iniciar la planificación con un mínimo de 3 meses de anticipación para eventos medianos (hasta 300 personas) y 6 meses para congresos o galas de mayor escala. Sin embargo, tenemos capacidad para responder a solicitudes urgentes según disponibilidad y agenda.',
  },
  {
    q: '¿Trabajan fuera de la Ciudad de México?',
    a: 'Sí. Tenemos operaciones activas en más de 30 ciudades de México, incluyendo Monterrey, Guadalajara, Cancún, Los Cabos, Puebla y Mérida. También coordinamos eventos internacionales bajo solicitud especial con nuestra red de proveedores globales.',
  },
  {
    q: '¿Ofrecen servicios individuales o solo paquetes completos?',
    a: 'Ambos. Podemos encargarnos de la producción integral de su evento o proveer servicios específicos como producción audiovisual, catering o logística de invitados. Cada propuesta se personaliza completamente a las necesidades y presupuesto del cliente.',
  },
  {
    q: '¿Cómo es el proceso de cotización?',
    a: 'Tras recibir su solicitud, un ejecutivo de cuenta se pondrá en contacto en menos de 24 horas para agendar una sesión de briefing. Con base en sus necesidades, objetivos y presupuesto, elaboramos una propuesta detallada en un plazo de 72 horas hábiles.',
  },
  {
    q: '¿Qué garantías ofrecen respecto a proveedores y calidad?',
    a: 'Trabajamos exclusivamente con proveedores certificados y auditados periódicamente. Todos nuestros contratos incluyen cláusulas de garantía de servicio. Contamos con pólizas de seguro de responsabilidad civil y planes de contingencia documentados para cada evento.',
  },
  {
    q: '¿Pueden organizar eventos híbridos o totalmente virtuales?',
    a: 'Sí. Contamos con infraestructura tecnológica para eventos híbridos y virtuales: streaming profesional en múltiples plataformas, moderación en línea, salas virtuales de networking y producción audiovisual adaptada a formatos digitales.',
  },
]

function FaqItem({ item, isOpen, onToggle }) {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  }

  return (
    <motion.div variants={itemVariants} className="mb-4">
      <div
        className={`group relative overflow-hidden rounded-2xl border transition-all duration-500 ${
          isOpen
            ? 'bg-ink/80 border-gold/40 shadow-[0_15px_40px_-15px_rgba(180,152,90,0.15)]'
            : 'bg-ink/30 border-border/30 hover:bg-card/50 hover:border-gold/30'
        } backdrop-blur-md cursor-pointer`}
        onClick={onToggle}
      >
        {/* Glow en estado abierto */}
        <div
          className={`absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent transition-transform duration-700 origin-left ease-in-out ${
            isOpen ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-50'
          }`}
        ></div>

        <div className="flex items-center justify-between p-6 md:px-8 md:py-6 relative z-10">
          <div className="flex items-center gap-4 pr-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-500 ${
              isOpen ? 'bg-gold/20 text-gold' : 'bg-charcoal border border-border/50 text-mist/50 group-hover:text-gold/80 group-hover:border-gold/30'
            }`}>
              <HelpCircle size={14} strokeWidth={1.5} />
            </div>
            <h3
              className={`font-serif text-lg md:text-xl font-medium transition-colors duration-500 leading-snug ${
                isOpen ? 'text-white' : 'text-cream group-hover:text-gold-light'
              }`}
            >
              {item.q}
            </h3>
          </div>
          
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
              isOpen ? 'bg-gold text-obsidian rotate-180' : 'bg-transparent border border-border/30 text-gold group-hover:bg-gold/10 group-hover:border-gold/40'
            }`}
          >
            <ChevronDown size={16} strokeWidth={2} />
          </div>
        </div>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="px-6 md:px-8 pb-8 pt-2 pl-[4.5rem]">
                <p className="font-sans text-mist text-sm md:text-[0.9rem] font-light leading-relaxed">
                  {item.a}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '15%'])

  const toggle = (i) => setOpenIndex((prev) => (prev === i ? null : i))

  // Efecto de partículas doradas flotantes
  const [particles, setParticles] = useState([])
  useEffect(() => {
    const newParticles = Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5
    }))
    setParticles(newParticles)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  }

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="relative py-32 overflow-hidden bg-charcoal border-t border-border/30"
    >
      {/* ── Background glow ── */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-gold/5 rounded-full blur-[100px] pointer-events-none"></div>

      {/* ── Parallax background decoration ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          y: bgY,
          background:
            'radial-gradient(ellipse 60% 50% at 80% 20%, rgba(180,152,90,0.03) 0%, transparent 60%),' +
            'radial-gradient(ellipse 50% 60% at 20% 80%, rgba(180,152,90,0.02) 0%, transparent 60%)',
        }}
      />

      {/* Fine dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: 'radial-gradient(rgba(180,152,90,0.9) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* ── Partículas Doradas Flotantes ── */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            animate={{
              y: [0, -800],
              opacity: [0, 1, 0],
              rotate: [0, 360]
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
              ease: "linear"
            }}
            className="absolute rounded-full bg-gold shadow-[0_0_10px_rgba(180,152,90,0.8)]"
            style={{
              left: `${p.x}%`,
              bottom: `${-10}%`,
              width: p.size,
              height: p.size,
            }}
          />
        ))}
      </div>

      {/* Large decorative text — right watermark */}
      <div
        className="absolute -right-8 top-20 font-serif text-[15rem] lg:text-[25rem] font-bold text-gold/5 leading-none pointer-events-none select-none"
        aria-hidden
      >
        ?
      </div>

      <div className="relative z-10 max-w-screen-md mx-auto px-6 md:px-12">

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          {/* Hero-style pulsing badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/30 bg-obsidian/40 backdrop-blur-md mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse"></span>
            <span className="text-gold text-[0.65rem] tracking-[0.25em] uppercase font-sans">
              Preguntas Frecuentes
            </span>
          </div>

          <h2 className="font-serif text-transparent bg-clip-text bg-gradient-to-b from-white to-cream/80 leading-tight mb-6 drop-shadow-2xl text-4xl md:text-5xl lg:text-[3.5rem] font-medium">
            Todo lo que necesitas{' '}
            <em className="italic text-gold bg-clip-text font-light" style={{ textShadow: '0 0 30px rgba(180,152,90,0.3)' }}>
              Saber
            </em>
          </h2>
          <p className="font-sans text-mist/80 text-sm md:text-[0.95rem] font-light leading-relaxed max-w-lg mx-auto">
            Resolvemos tus dudas principales para que puedas dar el siguiente paso con total confianza.
          </p>
        </motion.div>

        {/* ── Accordion ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-col relative z-10"
        >
          {FAQ_ITEMS.map((item, i) => (
            <FaqItem
              key={i}
              item={item}
              isOpen={openIndex === i}
              onToggle={() => toggle(i)}
            />
          ))}
        </motion.div>

      </div>
    </section>
  )
}