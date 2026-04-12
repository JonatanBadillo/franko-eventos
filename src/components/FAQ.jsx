import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

/* SWAP: Replace with your actual FAQ content */
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
  return (
    <div style={{ borderBottom: '1px solid var(--border)' }}>
      <button
        onClick={onToggle}
        className="w-full text-left py-6 flex items-center justify-between gap-4
                   font-serif text-cream transition-colors duration-300 hover:text-gold-light"
        style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.12rem', fontWeight: 500 }}
      >
        <span>{item.q}</span>
        <ChevronDown
          size={18}
          strokeWidth={1.4}
          className="text-gold flex-shrink-0 transition-transform duration-400"
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <p
              className="font-sans text-mist leading-relaxed pb-6"
              style={{ fontSize: '0.9rem' }}
            >
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  const toggle = (i) => setOpenIndex((prev) => (prev === i ? null : i))

  return (
    <section
      id="faq"
      className="py-28 px-8 md:px-16"
      style={{ background: 'var(--charcoal)' }}
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
          <span className="section-label" style={{ display: 'block' }}>
            Preguntas Frecuentes
          </span>
          <h2
            className="font-serif text-cream"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 500 }}
          >
            Todo lo que necesitas{' '}
            <em className="italic text-gold-light">saber</em>
          </h2>
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto"
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
