import { Instagram, Linkedin, Facebook, MapPin, Mail, Phone, ArrowUpRight } from 'lucide-react'
import { motion } from 'framer-motion'

const QUICK_LINKS = [
  { label: 'Inicio',    href: '#hero'         },
  { label: 'Nosotros',  href: '#about'        },
  { label: 'Servicios', href: '#services'     },
  { label: 'Galería',   href: '#gallery'      },
]

const LEGAL_LINKS = [
  { label: 'Aviso de Privacidad',    href: '#' },
  { label: 'Términos y Condiciones', href: '#' },
]

const SOCIAL = [
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Linkedin,  label: 'LinkedIn',  href: '#' },
  { icon: Facebook,  label: 'Facebook',  href: '#' },
]

const CONTACT_INFO = [
  { icon: Phone, text: '+52 33 3167 5489', href: 'https://wa.me/523331675489' },
  { icon: Mail, text: 'direcciong@frankoeventoscorporativos.mx', href: 'mailto:direcciong@frankoeventoscorporativos.mx' },
  { icon: MapPin, text: 'Guadalajara, Jalisco', href: 'https://maps.google.com/?q=Guadalajara,+Jalisco' },
]

export default function Footer() {
  const year = new Date().getFullYear()

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
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  }

  return (
    <footer
      className="relative overflow-hidden pt-24 pb-6 px-6 md:px-16"
      style={{
        background: 'var(--obsidian)',
      }}
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      <div className="absolute -top-[10%] left-[20%] w-[40%] h-[40%] rounded-full bg-gold/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[0%] right-[10%] w-[30%] h-[30%] rounded-full bg-gold/5 blur-[100px] pointer-events-none" />

      <motion.div 
        className="max-w-screen-xl mx-auto relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-16">

          {/* ── Brand Column ── */}
          <motion.div variants={itemVariants} className="md:col-span-12 lg:col-span-4 flex flex-col justify-between">
            <div>
              <a
                href="#hero"
                className="font-serif text-3xl text-cream tracking-wide hover:text-gold transition-colors inline-block mb-6 relative group"
              >
                Franko <span className="text-gold italic relative z-10">Eventos</span>
                <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-gold transition-all duration-500 group-hover:w-full"></span>
              </a>
              <p className="font-sans text-mist leading-relaxed max-w-sm text-[0.95rem] mb-8 font-light">
                Diseñamos experiencias corporativas que trascienden lo ordinario. 
                Cada evento, una obra maestra ejecutada con precisión y elegancia.
              </p>
            </div>

            {/* Social Links */}
            {/* <div>
              <p className="text-xs text-mist/60 uppercase tracking-widest mb-4">
                Conecta con nosotros
              </p>
              <div className="flex gap-4">
                {SOCIAL.map((s) => {
                  const Icon = s.icon
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      aria-label={s.label}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:border-gold hover:bg-gold/10 transition-all duration-300"
                    >
                      <Icon size={18} className="text-mist group-hover:text-gold transition-colors duration-300" strokeWidth={1.5} />
                      <div className="absolute inset-0 rounded-full border border-gold scale-150 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500"></div>
                    </a>
                  )
                })}
              </div>
            </div> */}
          </motion.div>

          {/* ── Contact Info Column ── */}
          <motion.div variants={itemVariants} className="md:col-span-6 lg:col-span-3">
            <p className="font-sans text-gold mb-6 text-xs tracking-[0.25em] uppercase font-semibold">
              Contacto
            </p>
            <ul className="space-y-6">
              {CONTACT_INFO.map((info, idx) => {
                const Icon = info.icon
                return (
                  <li key={idx} className="flex items-start gap-4 group">
                    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 border border-white/10 group-hover:border-gold/50 transition-colors duration-300 flex-shrink-0 mt-0.5">
                      <Icon size={14} className="text-gold" />
                    </div>
                    <a 
                      href={info.href}
                      target={info.href.startsWith('http') ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="text-[0.9rem] text-mist group-hover:text-cream transition-colors duration-300 leading-relaxed break-all"
                    >
                      {info.text}
                    </a>
                  </li>
                )
              })}
            </ul>
          </motion.div>

          {/* ── Quick Links Column ── */}
          <motion.div variants={itemVariants} className="md:col-span-3 lg:col-span-2">
            <p className="font-sans text-gold mb-6 text-xs tracking-[0.25em] uppercase font-semibold">
              Explorar
            </p>
            <ul className="space-y-4">
              {QUICK_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="group flex items-center gap-2 font-sans text-[0.9rem] text-mist hover:text-gold transition-colors duration-300"
                  >
                    <ArrowUpRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300" />
                    <span>{l.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* ── Legal & CTA Column ── */}
          <motion.div variants={itemVariants} className="md:col-span-3 lg:col-span-3">
            <p className="font-sans text-gold mb-6 text-xs tracking-[0.25em] uppercase font-semibold">
              Legal
            </p>
            <ul className="space-y-4 mb-10">
              {LEGAL_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="font-sans text-[0.9rem] text-mist hover:text-gold transition-colors duration-300"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>

            <a 
              href="#contact" 
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-gold text-gold hover:bg-gold hover:text-ink font-medium rounded-full transition-all duration-300 group"
            >
              <span>Cotizar Evento</span>
              <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </a>
          </motion.div>

        </div>

        {/* ── Bottom Bar ── */}
        <motion.div 
          variants={itemVariants}
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10"
        >
          <p className="font-sans text-mist/60 text-[0.8rem] tracking-wide text-center sm:text-left">
            © {year} Franko Eventos Corporativos.<br className="sm:hidden" /> Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse"></span>
            <p className="font-sans text-mist/60 text-[0.8rem] tracking-widest uppercase">
              Guadalajara, Jalisco
            </p>
          </div>
        </motion.div>

      </motion.div>
    </footer>
  )
}
