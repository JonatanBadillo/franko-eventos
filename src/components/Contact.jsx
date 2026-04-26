import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, Instagram, Linkedin, Facebook, Send } from 'lucide-react'

// Icono personalizado de WhatsApp
const WhatsAppIcon = ({ size = 24, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
)

const INFO = [
  {
    icon: WhatsAppIcon,
    label: 'WhatsApp',
    value: '+52 33 3167 5489',
    href: 'https://wa.me/523331675489',
  },
  {
    icon: Mail,
    label: 'Email Corporativo',
    value: 'direcciong@frankoeventoscorporativos.mx',
    href: 'mailto:direcciong@frankoeventoscorporativos.mx',
  },
  {
    icon: MapPin,
    label: 'Sede',
    value: 'Guadalajara, México',
    href: 'https://maps.google.com/?q=Guadalajara,+Jalisco',
  },
]

// Tipos de eventos basados en la información de tus servicios
const EVENT_TYPES = [
  'Evento Social Corporativo',
  'Capacitación y Desarrollo',
  'Evento Cultural',
  'Branding y Lanzamiento',
  'Congreso o Convención',
  'Otro'
]

function FloatingInput({ id, label, type = 'text', as = 'input', options, rows = 4 }) {
  const commonProps = {
    id,
    name: id,
    placeholder: ' ',
    required: true,
    className: `w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-cream focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-all duration-300 peer placeholder-transparent ${as === 'textarea' ? 'resize-none' : ''}`,
  }

  return (
    <div className="relative mb-6 group">
      {as === 'textarea' ? (
        <textarea {...commonProps} rows={rows} />
      ) : as === 'select' ? (
        <select {...commonProps} defaultValue="" className={`${commonProps.className} appearance-none`}>
          <option value="" disabled className="bg-gray-900 text-mist">{label}</option>
          {options.map((o) => <option key={o} value={o} className="bg-gray-900 text-mist">{o}</option>)}
        </select>
      ) : (
        <input {...commonProps} type={type} />
      )}
      <label 
        htmlFor={id} 
        className={`absolute left-4 text-mist transition-all duration-300 pointer-events-none
          ${as === 'select' 
            ? '-top-6 text-xs text-gold' 
            : 'top-3 peer-focus:-top-6 peer-focus:text-xs peer-focus:text-gold peer-valid:-top-6 peer-valid:text-xs peer-valid:text-gold-light'
          }`}
      >
        {label}
      </label>
      {as === 'select' && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg className="w-4 h-4 text-mist" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      )}
    </div>
  )
}

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Obtener los datos del nuevo formulario
    const formData = new FormData(e.target)
    const name = formData.get('name')
    const company = formData.get('company')
    const email = formData.get('email')
    const whatsapp = formData.get('whatsapp')
    const eventType = formData.get('eventType') || 'No especificado'
    const message = formData.get('message')

    // Construir el asunto y cuerpo del correo actualizado
    const subject = `Nueva Solicitud - ${name} (${company})`
    const body = `Nombre Completo: ${name}\nEmpresa: ${company}\nEmail Corporativo: ${email}\nWhatsApp: ${whatsapp}\nTipo de Evento: ${eventType}\n\nDetalles del Proyecto:\n${message}`

    // Abrir cliente de correo predeterminado
    window.location.href = `mailto:direcciong@frankoeventoscorporativos.mx?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    
    setSubmitted(true)
  }

  const reveal = {
    initial:   { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport:  { once: true, amount: 0.1 },
    transition: { duration: 0.8, ease: "easeOut" },
  }

  return (
    <section
      id="contact"
      className="relative py-32 px-6 md:px-16 overflow-hidden"
      style={{ background: 'var(--ink)' }}
    >
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-gold/5 blur-[120px]" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-gold/5 blur-[120px]" />
      </div>

      <div className="max-w-screen-xl mx-auto relative z-10">

        {/* ── Header adaptado a la imagen ── */}
        <motion.div {...reveal} className="text-center mb-20">
          <span className="inline-block py-1 px-3 rounded-full border border-gold/30 text-gold text-sm tracking-widest uppercase mb-6 shadow-[0_0_15px_rgba(212,175,55,0.1)]">
            Inicia tu transformación
          </span>
          <h2
            className="font-serif text-cream leading-tight mb-6"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 500 }}
          >
            Conversemos sobre tu{' '}
            <span className="relative inline-block">
              <em className="italic text-gold-light relative z-10">próximo</em>
              <span className="absolute bottom-1 left-0 w-full h-3 bg-gold/20 -z-10 -rotate-2"></span>
            </span>
            <br />evento
          </h2>
          <p className="text-mist max-w-2xl mx-auto font-light text-lg">
            Cuéntanos tu visión y un consultor estratégico te contactará en menos de 24 horas para una sesión exploratoria sin compromiso.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">

          {/* ── Left: Info & WhatsApp CTA ── */}
          <motion.div
            {...reveal}
            transition={{ ...reveal.transition, delay: 0.1 }}
            className="lg:col-span-5 flex flex-col justify-between"
          >
            <div>
              {/* WhatsApp Prominent Button Mantenido */}
              <motion.a
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="https://wa.me/523331675489"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center gap-6 p-6 rounded-2xl bg-gradient-to-br from-[#25D366]/20 to-[#128C7E]/10 border border-[#25D366]/30 mb-12 overflow-hidden shadow-[0_0_30px_rgba(37,211,102,0.15)] hover:shadow-[0_0_40px_rgba(37,211,102,0.25)] transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#25D366]/0 via-[#25D366]/10 to-[#25D366]/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                
                <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-[#25D366] text-white shadow-lg flex-shrink-0 group-hover:rotate-12 transition-transform duration-300">
                  <WhatsAppIcon size={32} />
                  <span className="absolute -top-1 -right-1 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-white/90"></span>
                  </span>
                </div>
                <div>
                  <h3 className="text-white font-medium text-lg mb-1">Contacto Directo</h3>
                  <p className="text-[#25D366] font-semibold tracking-wide">+52 33 3167 5489</p>
                </div>
              </motion.a>

              {/* Other Info adaptada */}
              <div className="space-y-8 mb-12 pl-2">
                {INFO.map((item, idx) => {
                  if (item.label === 'WhatsApp') return null;
                  const Icon = item.icon
                  return (
                    <div key={item.label} className="flex items-start gap-5 group">
                      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 group-hover:border-gold/50 group-hover:bg-gold/10 transition-all duration-300 flex-shrink-0">
                        <Icon size={20} className="text-gold group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <div className="pt-1">
                        <span className="block text-xs text-mist/60 uppercase tracking-widest mb-1">
                          {item.label}
                        </span>
                        <a
                          href={item.href}
                          className="font-sans text-cream text-[1rem] hover:text-gold transition-colors whitespace-pre-line block"
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
            </div>
          </motion.div>

          {/* ── Right: Form ── */}
          <motion.div
            {...reveal}
            transition={{ ...reveal.transition, delay: 0.3 }}
            className="lg:col-span-7"
          >
            <div className="bg-white/[0.02] border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-sm shadow-2xl relative overflow-hidden">
              {/* Brillo sutil de fondo del formulario */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-[80px] -z-10 pointer-events-none" />

              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center h-full py-20 text-center"
                >
                  <div className="w-20 h-20 bg-gold/20 rounded-full flex items-center justify-center mb-6">
                    <Send size={32} className="text-gold" />
                  </div>
                  <h3 className="font-serif text-cream text-3xl mb-4">
                    ¡Mensaje Preparado!
                  </h3>
                  <p className="font-sans text-mist text-lg leading-relaxed max-w-md">
                    Se ha abierto tu cliente de correo electrónico. Envía el mensaje y un consultor estratégico se comunicará contigo pronto.
                  </p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="mt-8 text-gold hover:text-gold-light border-b border-gold/30 hover:border-gold transition-colors pb-1"
                  >
                    Enviar otra solicitud
                  </button>
                </motion.div>
              ) : (
                <>
                  <form onSubmit={handleSubmit}>
                    {/* Campos ajustados a la imagen */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                      <FloatingInput id="name"    label="Nombre Completo"    type="text"  />
                      <FloatingInput id="company" label="Empresa"            type="text"  />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                      <FloatingInput id="email"   label="Email Corporativo"  type="email" />
                      <FloatingInput id="whatsapp" label="WhatsApp"          type="tel"   />
                    </div>
                    <FloatingInput
                      id="eventType"
                      label="Tipo de Evento"
                      as="select"
                      options={EVENT_TYPES}
                    />
                    <FloatingInput
                      id="message"
                      label="Cuéntanos sobre tu proyecto (Objetivos, audiencia, fecha...)"
                      as="textarea"
                      rows={5}
                    />

                    <button
                      type="submit"
                      className="group relative w-full flex items-center justify-center gap-3 bg-gold hover:bg-gold-light text-ink font-medium py-4 px-8 rounded-xl overflow-hidden transition-all duration-300 mt-4"
                    >
                      <span className="relative z-10 text-[1.05rem]">Enviar solicitud</span>
                      <Send size={18} className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                      
                      {/* Efecto hover del botón */}
                      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                    </button>
                    
                    {/* Texto del footer del formulario */}
                    <p className="text-center text-xs text-mist/60 mt-6 font-light">
                      Respuesta garantizada en menos de 24 horas hábiles.
                    </p>
                  </form>
                </>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}