import { useState, useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { Shield, Users, Award, ArrowUpRight } from 'lucide-react'

/* ─────────────────────────────────────────────────────────
 * DATA
 * ───────────────────────────────────────────────────────── */
const PILLARS = [
  {
    id: 1,
    icon: Award,
    label: 'Experiencia',
    headline: '15+ años',
    sub: '500+ eventos',
    description:
      'Más de una década y media perfeccionando el arte de crear momentos corporativos que perduran en la memoria de cada organización.',
  },
  {
    id: 2,
    icon: Users,
    label: 'Equipo',
    headline: '30+',
    sub: 'profesionales expertos',
    description:
      'Un equipo multidisciplinario con expertise en estrategia empresarial, producción, diseño de experiencias y relaciones corporativas.',
  },
  {
    id: 3,
    icon: Shield,
    label: 'Valores',
    headline: 'Ética',
    sub: 'excelencia · innovación',
    description:
      'Tres pilares que guían cada decisión: integridad en cada acuerdo, excelencia en cada detalle e innovación constante en cada propuesta.',
  },
]

/* ═══════════════════════════════════════
 * PILLAR CARD
 * ═══════════════════════════════════════ */
function PillarCard({ p }) {
  const Icon = p.icon

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  }

  return (
    <motion.div
      variants={itemVariants}
      className="group relative flex flex-col rounded-2xl bg-ink/50 backdrop-blur-md border border-border/30 hover:bg-card/60 hover:border-gold/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_50px_-12px_rgba(180,152,90,0.15)] overflow-hidden cursor-default"
    >
      {/* Ambient radial glow on hover */}
      <div className="absolute -top-32 -right-32 w-72 h-72 rounded-full bg-gold/10 opacity-0 group-hover:opacity-100 group-hover:scale-150 blur-3xl transition-all duration-700 pointer-events-none"></div>

      {/* Top accent line — slides in on hover */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left ease-in-out"></div>

      {/* Noise texture overlay for depth */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }}
      />

      <div className="relative z-10 p-8 lg:p-10 flex flex-col h-full">

        {/* Index + icon row */}
        <div className="flex items-start justify-between mb-8">
          <span className="font-serif font-light text-[4.5rem] leading-none text-border/30 group-hover:text-gold/20 transition-colors duration-500 select-none">
            0{p.id}
          </span>
          <div className="relative flex items-center justify-center w-14 h-14 rounded-full bg-charcoal border border-border/50 group-hover:border-gold/60 group-hover:bg-gold/10 transition-all duration-500">
            <Icon size={24} strokeWidth={1.5} className="text-gold/70 group-hover:text-gold-light group-hover:scale-110 transition-all duration-500" />
          </div>
        </div>

        {/* Label pill */}
        <span className="font-sans text-[0.65rem] tracking-[0.25em] uppercase text-gold/70 mb-4 block group-hover:text-gold-light transition-colors duration-500">
          {p.label}
        </span>

        {/* Big headline */}
        <h3 className="font-serif text-cream text-3xl lg:text-[2.5rem] font-medium leading-tight mb-2 group-hover:text-white transition-colors duration-500">
          {p.headline}
        </h3>
        <p className="font-sans text-[0.7rem] tracking-[0.15em] uppercase text-gold/60 mb-6 group-hover:text-gold/90 transition-colors duration-500">
          {p.sub}
        </p>

        {/* Animated divider */}
        <div className="mb-6 h-[1px] w-8 bg-gold/40 group-hover:w-16 group-hover:bg-gold transition-all duration-500 ease-in-out"></div>

        {/* Description */}
        <p className="font-sans text-mist text-sm font-light leading-relaxed flex-1 group-hover:text-cream/80 transition-colors duration-500">
          {p.description}
        </p>
      </div>
    </motion.div>
  )
}

/* ═══════════════════════════════════════
 * MAIN EXPORT
 * ═══════════════════════════════════════ */
export default function Liderazgo() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  /* Parallax layers */
  const bgY       = useTransform(scrollYProgress, [0, 1], ['0%',   '20%'])
  const watermarkY = useTransform(scrollYProgress, [0, 1], ['10%', '-10%'])

  // Efecto de partículas doradas flotantes (Hero style)
  const [particles, setParticles] = useState([])
  useEffect(() => {
    const newParticles = Array.from({ length: 15 }).map((_, i) => ({
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
      transition: { staggerChildren: 0.15, delayChildren: 0.3 }
    }
  }

  return (
    <section
      id="liderazgo"
      ref={sectionRef}
      className="relative py-32 overflow-hidden bg-obsidian border-t border-border/30"
    >
      {/* ── Background glow ── */}
      <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[150px] pointer-events-none"></div>

      {/* ── Parallax background decoration ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          y: bgY,
          background:
            'radial-gradient(ellipse 65% 55% at 15% 40%, rgba(180,152,90,0.04) 0%, transparent 65%),' +
            'radial-gradient(ellipse 50% 60% at 85% 60%, rgba(180,152,90,0.02) 0%, transparent 65%)',
        }}
      />

      {/* ── Fine grid ── */}
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

      {/* ── Watermark text ── */}
      <motion.div
        className="absolute pointer-events-none select-none"
        style={{
          y: watermarkY,
          bottom: '-4rem', left: '-2rem',
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: 'clamp(12rem, 22vw, 22rem)',
          fontWeight: 700,
          color: 'rgba(180,152,90,0.03)',
          lineHeight: 1,
          userSelect: 'none',
          zIndex: 0,
        }}
        aria-hidden
      >
        L
      </motion.div>

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-12">

        {/* ════════════════════════════
            TOP SPLIT: headline + intro text
        ════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start mb-24">

          {/* Left — headline */}
          <motion.div
            className="lg:col-span-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Hero-style pulsing badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/30 bg-obsidian/40 backdrop-blur-md mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse"></span>
              <span className="text-gold text-[0.65rem] tracking-[0.25em] uppercase font-sans">
                Liderazgo con Propósito
              </span>
            </div>

            <h2 className="font-serif text-transparent bg-clip-text bg-gradient-to-b from-white to-cream/80 leading-tight mb-6 drop-shadow-2xl text-4xl md:text-5xl lg:text-[4rem] font-medium">
              Experiencia que<br className="hidden md:block" />
              Marca la{' '}
              <em className="italic text-gold bg-clip-text font-light" style={{ textShadow: '0 0 40px rgba(180,152,90,0.3)' }}>
                Diferencia
              </em>
            </h2>

            {/* Animated gold rule */}
            <motion.div
              className="mt-10"
              style={{ height: '1px', background: 'var(--gold)', originX: 0 }}
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            />
          </motion.div>

          {/* Right — body copy */}
          <motion.div
            className="lg:col-span-6 lg:pt-20"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-sans text-mist/90 text-[1rem] font-light leading-relaxed mb-6">
              Con más de <span className="text-cream font-medium">15 años en la industria</span> de eventos corporativos, Franko se ha consolidado como líder en la creación de experiencias que transforman organizaciones.
            </p>
            <p className="font-sans text-mist/90 text-[1rem] font-light leading-relaxed mb-10">
              Nuestro equipo multidisciplinario combina expertise en <span className="text-cream font-medium">estrategia empresarial</span>, producción de eventos, <span className="text-cream font-medium">diseño de experiencias</span> y gestión de relaciones corporativas.
            </p>
          </motion.div>
        </div>

        {/* ════════════════════════════
            PILLAR CARDS
        ════════════════════════════ */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {PILLARS.map((p) => (
            <PillarCard key={p.id} p={p} />
          ))}
        </motion.div>

      </div>
    </section>
  )
}