import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Building2, GraduationCap, Palette, Megaphone, ArrowUpRight } from 'lucide-react'

/* ─────────────────────────────────────────────────────────────────────────────
 * DATA
 * ───────────────────────────────────────────────────────────────────────────── */
const SERVICES = [
  {
    id: 1,
    icon: Building2,
    number: '01',
    title: 'Eventos Sociales\nCorporativos',
    short: 'Galas · Aniversarios',
    description:
      'Celebraciones empresariales, galas y reconocimientos que fortalecen la cultura organizacional.',
    tags: ['Galas', 'Aniversarios', 'Cenas'],
    accent: '#b4985a',
  },
  {
    id: 2,
    icon: GraduationCap,
    number: '02',
    title: 'Capacitación\ny Desarrollo',
    short: 'Conferencias · Talleres',
    description:
      'Conferencias y seminarios diseñados para impulsar el crecimiento profesional de tu equipo.',
    tags: ['Conferencias', 'Workshops', 'Seminarios'],
    accent: '#d4b878', // Lighter gold
  },
  {
    id: 3,
    icon: Palette,
    number: '03',
    title: 'Eventos\nCulturales',
    short: 'Arte · Experiencias',
    description:
      'Experiencias artísticas y culturales que enriquecen el ambiente y proyectan valores.',
    tags: ['Exposiciones', 'Arte', 'Inmersión'],
    accent: '#b4985a',
  },
  {
    id: 4,
    icon: Megaphone,
    number: '04',
    title: 'Branding\ny Lanzamientos',
    short: 'Impacto · Presentaciones',
    description:
      'Lanzamientos de productos y eventos de marca que generan impacto real y recordación.',
    tags: ['Lanzamientos', 'Marca', 'Activaciones'],
    accent: '#d4b878', // Lighter gold
  },
]

/* ═══════════════════════════════════════════════════════════
 * SERVICE CARD
 * ═══════════════════════════════════════════════════════════ */
function ServiceCard({ svc }) {
  const Icon = svc.icon

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  }

  return (
    <motion.div
      variants={itemVariants}
      className="group relative h-full flex flex-col rounded-2xl bg-card/30 backdrop-blur-md border border-border/40 hover:bg-card/70 hover:border-gold/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(180,152,90,0.15)] overflow-hidden cursor-default"
    >
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

      {/* Top Accent Line */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left ease-in-out"></div>

      <div className="p-8 lg:p-10 flex flex-col h-full relative z-10">

        {/* Header row */}
        <div className="flex items-start justify-between mb-8">
          {/* Number Watermark */}
          <span className="font-serif font-light text-[3.5rem] leading-none text-border/30 group-hover:text-gold/20 transition-colors duration-500 select-none">
            {svc.number}
          </span>

          {/* Icon box */}
          <div className="relative flex items-center justify-center w-14 h-14 rounded-full bg-charcoal border border-border/50 group-hover:border-gold/60 group-hover:bg-gold/10 transition-all duration-500">
             <Icon size={24} strokeWidth={1.5} className="text-gold/70 group-hover:text-gold-light group-hover:scale-110 transition-all duration-500" />
          </div>
        </div>

        {/* Category pill */}
        <span className="font-sans text-[0.65rem] tracking-[0.2em] uppercase text-gold/80 mb-3 group-hover:text-gold-light transition-colors duration-500">
          {svc.short}
        </span>

        {/* Title */}
        <h3 className="font-serif text-cream text-2xl lg:text-[1.7rem] font-medium leading-tight mb-5 whitespace-pre-line group-hover:text-white transition-colors duration-500">
          {svc.title}
        </h3>

        {/* Description */}
        <p className="font-sans text-mist text-sm font-light leading-relaxed flex-1 mb-8 group-hover:text-cream/90 transition-colors duration-500">
          {svc.description}
        </p>

        {/* Tags and Action */}
        <div className="flex items-end justify-between mt-auto">
          <div className="flex flex-wrap gap-2 max-w-[80%]">
            {svc.tags.map((tag) => (
              <span
                key={tag}
                className="font-sans text-[0.6rem] tracking-wider uppercase px-2.5 py-1 rounded-full border border-border/30 text-mist/60 group-hover:border-gold/30 group-hover:text-gold/90 transition-all duration-500 bg-obsidian/30"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-transparent border border-transparent group-hover:border-gold/30 group-hover:bg-gold/10 transition-all duration-500">
            <ArrowUpRight size={16} strokeWidth={1.5} className="text-transparent group-hover:text-gold transition-all duration-500" />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════
 * MAIN EXPORT
 * ═══════════════════════════════════════════════════════════ */
export default function SpecializedServices() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.1 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  }

  return (
    <section
      id="specialized-services"
      className="relative py-32 overflow-hidden bg-obsidian border-t border-border"
    >
      {/* ── Background glow and decorations ── */}
      <div className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-gold/5 rounded-full blur-[150px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[120px] pointer-events-none animate-pulse2"></div>

      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, var(--gold) 1px, transparent 0)', backgroundSize: '40px 40px' }}
      ></div>

      <div className="absolute -right-8 top-8 font-serif select-none pointer-events-none text-[15rem] lg:text-[25rem] font-bold text-gold/5 leading-none" aria-hidden>
        S
      </div>

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-12" ref={containerRef}>

        {/* ── Section header ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-end mb-20">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="inline-block py-1 px-3 mb-6 border border-gold/30 rounded-full font-sans text-[0.7rem] tracking-[0.2em] text-gold uppercase bg-gold/5 backdrop-blur-sm">
              Servicios Especializados
            </span>
            <h2 className="font-serif text-cream leading-tight text-4xl md:text-5xl lg:text-6xl font-medium">
              Soluciones <em className="italic text-gold-light font-light">integrales</em><br className="hidden md:block" />
              para cada necesidad <em className="italic text-gold-light font-light">corporativa</em>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:pb-2"
          >
            <div className="w-12 h-[1px] bg-gold mb-6" />
            <p className="font-sans text-mist text-base font-light leading-relaxed mb-8">
              Desde celebraciones íntimas hasta mega-eventos de miles de personas,
              nuestro equipo adapta cada solución a los objetivos estratégicos de
              tu organización. Excelencia, creatividad y precisión en cada detalle.
            </p>

            <a href="#contact" className="inline-flex items-center gap-2 font-sans text-sm tracking-[0.15em] text-gold uppercase hover:text-gold-light transition-colors duration-300 group">
              <span className="border-b border-gold/30 group-hover:border-gold transition-colors pb-1">Solicitar Información</span>
              <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </a>
          </motion.div>
        </div>

        {/* ── Cards grid ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {SERVICES.map((svc) => (
            <ServiceCard key={svc.id} svc={svc} />
          ))}
        </motion.div>

        {/* ── Marquee ticker ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-32 overflow-hidden relative border-y border-border/50 py-5 bg-obsidian/50"
        >
          {/* Fade edges */}
          <div className="absolute top-0 left-0 bottom-0 w-32 z-10 pointer-events-none bg-gradient-to-r from-obsidian to-transparent" />
          <div className="absolute top-0 right-0 bottom-0 w-32 z-10 pointer-events-none bg-gradient-to-l from-obsidian to-transparent" />

          {/* Scrolling text */}
          <div className="flex gap-16 w-max animate-marquee">
            {[...Array(4)].flatMap(() => [
              'Eventos Sociales', '·', 'Capacitación', '·', 'Cultura Corporativa', '·', 'Branding', '·', 'Galas', '·', 'Talleres', '·', 'Lanzamientos', '·'
            ]).map((word, i) => (
              <span
                key={i}
                className="font-serif text-sm tracking-[0.25em] uppercase whitespace-nowrap"
                style={{ color: word === '·' ? 'var(--gold)' : 'rgba(240,236,228,0.4)' }}
              >
                {word}
              </span>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}