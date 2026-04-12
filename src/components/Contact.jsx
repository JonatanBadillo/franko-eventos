import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Instagram, Linkedin, Facebook } from 'lucide-react'

const INFO = [
  {
    icon: Phone,
    label: 'Teléfono',
    /* SWAP: Replace with your real phone number */
    value: '+52 (55) 0000-0000',
    href: 'tel:+5255000000000',
  },
  {
    icon: Mail,
    label: 'Correo Corporativo',
    /* SWAP: Replace with your real email */
    value: 'contacto@frankoeventos.mx',
    href: 'mailto:contacto@frankoeventos.mx',
  },
  {
    icon: MapPin,
    label: 'Ubicación',
    /* SWAP: Replace with your real address */
    value: 'Paseo de la Reforma 255, Piso 12\nCol. Cuauhtémoc, CDMX',
    href: 'https://maps.google.com',
  },
]

const SOCIAL = [
  { icon: Instagram, label: 'Instagram', href: '#' /* SWAP: real URL */ },
  { icon: Linkedin,  label: 'LinkedIn',  href: '#' /* SWAP: real URL */ },
  { icon: Facebook,  label: 'Facebook',  href: '#' /* SWAP: real URL */ },
]

const EVENT_SIZES = [
  'Pequeño (hasta 100 personas)',
  'Mediano (100 – 500 personas)',
  'Grande (500 – 1,000 personas)',
  'Masivo (1,000+ personas)',
]

function FloatingInput({ id, label, type = 'text', as = 'input', options, rows = 4 }) {
  const commonProps = {
    id,
    name: id,
    placeholder: ' ',
    required: true,
    className: as === 'select' ? 'form-select' : as === 'textarea' ? 'form-textarea' : 'form-input',
  }

  return (
    <div className="form-group">
      {as === 'textarea' ? (
        <>
          <textarea {...commonProps} rows={rows} />
          <label className="form-label" htmlFor={id}>{label}</label>
        </>
      ) : as === 'select' ? (
        <select {...commonProps} defaultValue="">
          <option value="" disabled>{label}</option>
          {options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : (
        <>
          <input {...commonProps} type={type} />
          <label className="form-label" htmlFor={id}>{label}</label>
        </>
      )}
    </div>
  )
}

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)

  /* SWAP: Replace this handler with your real form submission logic
   * (e.g. Formspree, EmailJS, your own API, HubSpot, etc.)            */
  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const reveal = {
    initial:   { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport:  { once: true, amount: 0.15 },
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
  }

  return (
    <section
      id="contact"
      className="py-28 px-8 md:px-16"
      style={{ background: 'var(--ink)' }}
    >
      <div className="max-w-screen-xl mx-auto">

        {/* Header */}
        <motion.div {...reveal}>
          <span className="section-label">Contacto</span>
          <h2
            className="font-serif text-cream leading-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 500 }}
          >
            Hagamos algo{' '}
            <em className="italic text-gold-light">extraordinario</em>
            <br />juntos
          </h2>
          <div className="gold-line" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mt-4">

          {/* ── Left: Info ── */}
          <motion.div
            {...reveal}
            transition={{ ...reveal.transition, delay: 0.1 }}
          >
            <div className="space-y-8 mb-12">
              {INFO.map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.label} className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 flex items-center justify-center flex-shrink-0 border"
                      style={{ borderColor: 'var(--border)' }}
                    >
                      <Icon size={15} strokeWidth={1.3} className="text-gold" />
                    </div>
                    <div>
                      <span className="section-label" style={{ marginBottom: '0.2rem' }}>
                        {item.label}
                      </span>
                      <a
                        href={item.href}
                        className="font-sans text-mist text-[0.9rem] hover:text-gold transition-colors whitespace-pre-line"
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel="noopener noreferrer"
                      >
                        {item.value}
                      </a>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Social */}
            <p
              className="font-sans text-gold mb-4"
              style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}
            >
              Síguenos
            </p>
            <div className="flex gap-3">
              {SOCIAL.map((s) => {
                const Icon = s.icon
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="w-9 h-9 flex items-center justify-center border transition-all duration-300
                               hover:border-gold hover:text-gold text-mist"
                    style={{ borderColor: 'var(--border)' }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon size={14} strokeWidth={1.5} />
                  </a>
                )
              })}
            </div>
          </motion.div>

          {/* ── Right: Form ── */}
          <motion.div
            {...reveal}
            transition={{ ...reveal.transition, delay: 0.2 }}
          >
            {submitted ? (
              <div className="flex flex-col items-start justify-center h-full py-16">
                <div className="gold-line" />
                <h3
                  className="font-serif text-cream mt-4 mb-3"
                  style={{ fontSize: '1.8rem' }}
                >
                  Mensaje Recibido
                </h3>
                <p className="font-sans text-mist text-[0.9rem] leading-relaxed">
                  Gracias por contactarnos. Un ejecutivo de cuenta se comunicará
                  con usted dentro de las próximas 24 horas hábiles.
                </p>
              </div>
            ) : (
              /* SWAP: Add action="/your-endpoint" or onSubmit to your handler */
              <form onSubmit={handleSubmit} noValidate>
                <FloatingInput id="name"    label="Nombre Completo"        type="text"  />
                <FloatingInput id="email"   label="Correo Corporativo"     type="email" />
                <FloatingInput id="company" label="Empresa"                type="text"  />
                <FloatingInput
                  id="size"
                  label="Tamaño del Evento"
                  as="select"
                  options={EVENT_SIZES}
                />
                <FloatingInput
                  id="message"
                  label="Cuéntanos sobre tu Evento"
                  as="textarea"
                  rows={4}
                />

                <button
                  type="submit"
                  className="btn-primary w-full text-center mt-2"
                  style={{ padding: '1rem 2rem' }}
                >
                  Enviar Solicitud de Cotización →
                </button>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  )
}
