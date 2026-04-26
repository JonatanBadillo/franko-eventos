import { useState, useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const TESTIMONIALS = [
  {
    quote:
      'Franko transformó completamente nuestra convención anual. Su atención al detalle, profesionalismo y capacidad para entender nuestra visión superó todas nuestras expectativas. El evento fue un éxito rotundo.',
    name:  'Sergio de la Rosa',
    stars: 5,
  },
  {
    quote:
      'La metodología de Franko es impecable. Desde la primera reunión hasta el último detalle del evento, todo fue manejado con profesionalismo excepcional. Nuestros stakeholders quedaron impresionados.',
    name:  'Carlos Gutiérrez',
    stars: 5,
  },
]

function TestimonialCard({ t }) {
  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  }

  return (
    <motion.div
      variants={itemVariants}
      className="group relative flex flex-col rounded-2xl bg-ink/50 backdrop-blur-md border border-border/30 hover:bg-card/60 hover:border-gold/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_50px_-12px_rgba(180,152,90,0.15)] overflow-hidden cursor-default p-10"
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

      <div className="relative z-10 flex flex-col h-full">
        {/* Decorative large quote icon */}
        <div className="absolute -top-4 -left-2 text-gold/10 group-hover:text-gold/20 transition-colors duration-500 transform -scale-x-100 pointer-events-none">
          <Quote size={80} strokeWidth={1} />
        </div>

        {/* Stars */}
        <div className="flex gap-1.5 mb-8 relative z-10">
          {Array.from({ length: t.stars }).map((_, si) => (
            <Star
              key={si}
              size={14}
              strokeWidth={0}
              fill="currentColor"
              className="text-gold/80 group-hover:text-gold transition-colors duration-500"
            />
          ))}
        </div>

        {/* Quote */}
        <blockquote className="font-serif italic text-mist/90 text-xl lg:text-2xl leading-relaxed mb-10 flex-grow relative z-10 group-hover:text-cream transition-colors duration-500">
          "{t.quote}"
        </blockquote>

        {/* Divider */}
        <div className="h-[1px] w-12 bg-gold/30 mb-6 group-hover:w-full group-hover:bg-gradient-to-r group-hover:from-gold/50 group-hover:to-transparent transition-all duration-700 ease-in-out"></div>

        {/* Author */}
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-10 h-10 rounded-full bg-charcoal border border-border/50 flex items-center justify-center group-hover:border-gold/50 transition-colors duration-500">
             <span className="font-serif text-gold text-lg">{t.name.charAt(0)}</span>
          </div>
          <div>
            <p className="font-sans text-cream text-sm font-medium tracking-[0.15em] uppercase group-hover:text-white transition-colors duration-500">
              {t.name}
            </p>
          </div>
        </div>

      </div>
    </motion.div>
  )
}

export default function Testimonials() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 })
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

  // Efecto de partículas doradas flotantes
  const [particles, setParticles] = useState([])
  useEffect(() => {
    const newParticles = Array.from({ length: 12 }).map((_, i) => ({
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
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  }

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="relative py-32 overflow-hidden bg-obsidian border-t border-border/30"
    >
      {/* ── Background glow ── */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[150px] pointer-events-none"></div>

      {/* ── Parallax background decoration ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          y: bgY,
          background:
            'radial-gradient(ellipse 70% 60% at 80% 50%, rgba(180,152,90,0.03) 0%, transparent 60%),' +
            'radial-gradient(ellipse 50% 80% at 20% 30%, rgba(180,152,90,0.02) 0%, transparent 60%)',
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
        className="absolute -right-8 bottom-0 font-serif text-[15rem] lg:text-[22rem] font-bold text-gold/5 leading-none pointer-events-none select-none"
        aria-hidden
      >
        "
      </div>

      <div className="relative z-10 max-w-screen-lg mx-auto px-6 md:px-12">

        {/* ── Section header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          {/* Hero-style pulsing badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/30 bg-obsidian/40 backdrop-blur-md mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse"></span>
            <span className="text-gold text-[0.65rem] tracking-[0.25em] uppercase font-sans">
              Testimonios
            </span>
          </div>

          <h2 className="font-serif text-transparent bg-clip-text bg-gradient-to-b from-white to-cream/80 leading-tight mb-6 drop-shadow-2xl text-4xl md:text-5xl lg:text-[3.5rem] font-medium">
            Lo Que Dicen{' '}
            <em className="italic text-gold bg-clip-text font-light" style={{ textShadow: '0 0 40px rgba(180,152,90,0.3)' }}>
              Nuestros Clientes
            </em>
          </h2>
          <div className="w-12 h-[1px] bg-gold mx-auto mt-6" />
        </motion.div>

        {/* ── Cards ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
        >
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </motion.div>

      </div>
    </section>
  )
}
