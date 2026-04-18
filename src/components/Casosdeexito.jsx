import { useState, useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { ArrowUpRight, TrendingUp, Star, Zap } from 'lucide-react'

/* ─────────────────────────────────────────────────────────
 * DATA
 * ───────────────────────────────────────────────────────── */
const CASES = [
  {
    id: 1,
    metric: '+35%',
    metricLabel: 'engagement',
    icon: TrendingUp,
    category: 'Convención Corporativa',
    title: 'Convención Anual\nCliente Corporativo',
    description:
      'Evento híbrido para 800 participantes que integró tecnología inmersiva y networking estratégico, logrando récord histórico de participación y engagement de marca.',
    tags: ['Híbrido', '800 Participantes', 'Tecnología Inmersiva'],
    accentColor: '#b4985a',
    number: '01',
  },
  {
    id: 2,
    metric: '98%',
    metricLabel: 'satisfacción',
    icon: Star,
    category: 'Gala Corporativa',
    title: 'Gala 25° Aniversario\nGrupo Empresarial',
    description:
      'Celebración elegante para 500 invitados VIP con experiencia sensorial completa, producción audiovisual de primer nivel y reconocimientos emotivos al equipo directivo.',
    tags: ['500 VIP', 'Experiencia Sensorial', 'Gala Premium'],
    accentColor: '#d4b878',
    number: '02',
  },
  {
    id: 3,
    metric: '+40%',
    metricLabel: 'productividad',
    icon: Zap,
    category: 'Capacitación Ejecutiva',
    title: 'Summit de Liderazgo\nRegional',
    description:
      'Programa de capacitación ejecutiva de 3 días con facilitadores internacionales y dinámicas de alto impacto para 120 líderes de alto perfil de toda la región.',
    tags: ['3 Días', '120 Líderes', 'Alto Impacto'],
    accentColor: '#b4985a',
    number: '03',
  },
]

/* ═══════════════════════════════════════
 * ANIMATED METRIC NUMBER
 * ═══════════════════════════════════════ */
function AnimatedMetric({ value, inView }) {
  const isPercent = value.includes('%')
  const isPlus    = value.startsWith('+')
  const raw       = parseInt(value.replace(/[^0-9]/g, ''), 10)
  const [display, setDisplay] = useState(0)
  const raf = useRef(null)

  useEffect(() => {
    if (!inView) return
    const duration = 2000
    const start    = performance.now()
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1)
      const ease = 1 - Math.pow(1 - t, 4) // easeOutQuart
      setDisplay(Math.round(ease * raw))
      if (t < 1) raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [inView, raw])

  return (
    <span>
      {isPlus && '+'}
      {display}
      {isPercent && '%'}
    </span>
  )
}

/* ═══════════════════════════════════════
 * SINGLE CASE CARD
 * ═══════════════════════════════════════ */
function CaseCard({ c }) {
  const [inView, setInView] = useState(false)
  const ref = useRef(null)
  const Icon = c.icon

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold: 0.25 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  }

  return (
    <motion.div
      ref={ref}
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

        {/* ── Header: number + category pill ── */}
        <div className="flex items-center justify-between mb-10">
          <span className="font-serif font-light text-[0.8rem] tracking-[0.3em] text-border/60 uppercase group-hover:text-gold/60 transition-colors duration-500">
            Caso {c.number}
          </span>
          <span className="font-sans text-[0.6rem] tracking-[0.2em] uppercase px-3 py-1.5 rounded-full border border-border/30 text-mist/60 bg-transparent group-hover:border-gold/40 group-hover:text-gold group-hover:bg-gold/5 transition-all duration-500">
            {c.category}
          </span>
        </div>

        {/* ── METRIC — large animated number ── */}
        <div className="mb-8">
          <div className="flex items-end gap-4 mb-2">
            {/* Giant metric */}
            <span className="font-serif text-6xl md:text-7xl font-light leading-none text-gold group-hover:text-gold-light transition-colors duration-500">
              <AnimatedMetric value={c.metric} inView={inView} />
            </span>

            {/* Icon */}
            <div className="mb-3 transform group-hover:rotate-12 group-hover:scale-110 transition-transform duration-500">
              <Icon size={28} strokeWidth={1.5} className="text-gold/70 group-hover:text-gold-light transition-colors duration-500" />
            </div>
          </div>

          {/* Metric label */}
          <span className="font-sans block text-[0.7rem] tracking-[0.25em] uppercase text-gold/60 group-hover:text-gold/90 transition-colors duration-500">
            de {c.metricLabel}
          </span>

          {/* Animated underline */}
          <div className="mt-5 h-[1px] w-8 bg-gold/50 group-hover:w-16 group-hover:bg-gold transition-all duration-500 ease-in-out"></div>
        </div>

        {/* ── Title ── */}
        <h3 className="font-serif text-cream text-2xl lg:text-[1.6rem] font-medium leading-tight mb-5 whitespace-pre-line group-hover:text-white transition-colors duration-500">
          {c.title}
        </h3>

        {/* ── Description ── */}
        <p className="font-sans text-mist text-sm font-light leading-relaxed flex-1 mb-8 group-hover:text-cream/80 transition-colors duration-500">
          {c.description}
        </p>

        {/* ── Tags ── */}
        <div className="flex flex-wrap gap-2 mb-10">
          {c.tags.map((tag) => (
            <span
              key={tag}
              className="font-sans text-[0.6rem] tracking-wider uppercase px-2.5 py-1 rounded-full border border-border/20 text-mist/50 group-hover:border-gold/30 group-hover:text-gold/90 group-hover:bg-obsidian/30 transition-all duration-500"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* ── CTA link ── */}
        <a
          href="#contact"
          className="flex items-center gap-2 font-sans text-[0.7rem] tracking-[0.2em] uppercase text-mist/50 group-hover:text-gold transition-colors duration-500 group/link mt-auto w-max"
        >
          <span className="border-b border-transparent group-hover/link:border-gold/40 transition-colors pb-0.5">Solicitar caso similar</span>
          <ArrowUpRight size={14} strokeWidth={1.5} className="opacity-40 group-hover:opacity-100 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-all duration-300" />
        </a>
      </div>
    </motion.div>
  )
}

/* ═══════════════════════════════════════
 * MAIN EXPORT
 * ═══════════════════════════════════════ */
export default function CasosDeExito() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

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
      id="casos-exito"
      ref={sectionRef}
      className="relative py-32 overflow-hidden bg-charcoal border-y border-border/30"
    >
      {/* ── Background glow ── */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[150px] pointer-events-none"></div>

      {/* ── Parallax background decoration ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          y: bgY,
          background:
            'radial-gradient(ellipse 80% 60% at 20% 50%, rgba(180,152,90,0.03) 0%, transparent 60%),' +
            'radial-gradient(ellipse 50% 80% at 80% 30%, rgba(180,152,90,0.02) 0%, transparent 60%)',
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

      {/* Large decorative text — left watermark */}
      <div
        className="absolute -left-8 bottom-0 font-serif text-[15rem] lg:text-[22rem] font-bold text-gold/5 leading-none pointer-events-none select-none"
        aria-hidden
      >
        É
      </div>

      <div className="relative z-10 max-w-screen-xl mx-auto px-6 md:px-12">

        {/* ── Section header ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-end mb-24">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Hero-style pulsing badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/30 bg-obsidian/40 backdrop-blur-md mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse"></span>
              <span className="text-gold text-[0.65rem] tracking-[0.25em] uppercase font-sans">
                Casos de Éxito
              </span>
            </div>

            <h2 className="font-serif text-transparent bg-clip-text bg-gradient-to-b from-white to-cream/80 leading-tight mb-6 drop-shadow-2xl text-4xl md:text-5xl lg:text-[3.5rem] font-medium">
              Experiencias<br className="hidden md:block" />
              <em className="italic text-gold bg-clip-text font-light" style={{ textShadow: '0 0 40px rgba(180,152,90,0.3)' }}>
                transformadoras
              </em><br />
              que hablan por{' '}
              <em className="italic text-gold font-light">sí mismas</em>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="w-12 h-[1px] bg-gold mb-6" />
            <p className="font-sans text-mist/90 text-[1rem] font-light leading-relaxed mb-10">
              Cada proyecto es una oportunidad de superar expectativas. Estos son
              algunos de los resultados medibles que hemos logrado junto a nuestros
              clientes.
            </p>

            {/* Mini aggregate stats */}
            <div className="flex gap-8 py-6 border-y border-border/30">
              {[
                { val: '500+', lbl: 'Eventos' },
                { val: '98%',  lbl: 'Satisfacción' },
                { val: '15+',  lbl: 'Años' },
              ].map((s) => (
                <div key={s.lbl}>
                  <span className="font-serif text-gold-light block text-3xl mb-1">
                    {s.val}
                  </span>
                  <span className="font-sans text-mist/70 text-[0.65rem] tracking-[0.2em] uppercase">
                    {s.lbl}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Cards ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {CASES.map((c) => (
            <CaseCard key={c.id} c={c} />
          ))}
        </motion.div>

        {/* ── Horizontal rule with label ── */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-32 mb-20 h-[1px] bg-border/40 origin-left"
        >
          <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 px-6 font-sans text-[0.65rem] tracking-[0.3em] uppercase text-gold bg-charcoal">
            ¿El siguiente caso de éxito?
          </span>
        </motion.div>

        {/* ── Bottom CTA band ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden text-center py-20 px-8 rounded-3xl"
          style={{
            background: 'linear-gradient(135deg, rgba(180,152,90,0.08) 0%, rgba(30,34,48,0.4) 50%, rgba(180,152,90,0.08) 100%)',
            border: '1px solid rgba(180,152,90,0.2)',
          }}
        >
          {/* Animated background glow inside CTA */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/10 via-transparent to-transparent opacity-50 pointer-events-none"></div>

          <div className="relative z-10">
            <p className="font-sans text-gold mb-4 text-[0.75rem] tracking-[0.25em] uppercase">
              Comencemos a construir juntos
            </p>
            <h3 className="font-serif text-cream mb-10 text-3xl md:text-4xl lg:text-[2.8rem] font-medium leading-tight drop-shadow-lg">
              Tu empresa merece resultados<br/>
              <em className="italic text-gold font-light" style={{ textShadow: '0 0 30px rgba(180,152,90,0.3)' }}>extraordinarios</em>
            </h3>
            
            {/* Hero-style Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a 
                href="#contact" 
                className="group relative px-8 py-4 bg-gold text-obsidian font-sans text-[0.75rem] tracking-[0.2em] uppercase rounded flex items-center justify-center overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_rgba(180,152,90,0.4)] hover:scale-105"
              >
                <span className="relative z-10 font-medium">Cotizar mi Evento</span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              </a>
              
              <a 
                href="#testimonials" 
                className="group px-8 py-4 border border-white/20 text-cream font-sans text-[0.75rem] tracking-[0.2em] uppercase rounded flex items-center justify-center gap-3 backdrop-blur-sm bg-white/5 hover:bg-white/10 hover:border-gold/50 transition-all duration-500"
              >
                <span className="group-hover:text-gold transition-colors duration-300">Ver Testimonios</span>
              </a>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}