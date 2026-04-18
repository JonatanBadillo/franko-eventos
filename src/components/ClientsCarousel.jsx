import { motion, useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { Sparkles } from 'lucide-react'

/*
 * Se ha cambiado la sección a "Atributos / Valores",
 * destacando las fortalezas y cualidades positivas de la empresa.
 */
const ATTRIBUTES = [
  { name: 'Excelencia Logística' },
  { name: 'Innovación Constante' },
  { name: 'Diseño a Medida' },
  { name: 'Atención al Detalle' },
  { name: 'Ética Profesional' },
  { name: 'Producción Impecable' },
  { name: 'Creatividad Estratégica' },
  { name: 'Tecnología de Vanguardia' },
  { name: 'Compromiso Absoluto' },
  { name: 'Resultados Medibles' },
]

// Duplicate array multiple times so the marquee loops seamlessly
const TRACK = [...ATTRIBUTES, ...ATTRIBUTES, ...ATTRIBUTES, ...ATTRIBUTES]

export default function ClientsCarousel() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 })

  // Efecto de partículas doradas flotantes
  const [particles, setParticles] = useState([])
  useEffect(() => {
    const newParticles = Array.from({ length: 10 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5
    }))
    setParticles(newParticles)
  }, [])

  return (
    <section
      id="attributes"
      ref={sectionRef}
      className="relative py-28 overflow-hidden bg-obsidian border-y border-border/30"
    >
      {/* ── Background glow ── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gold/5 rounded-full blur-[120px] pointer-events-none"></div>

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

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 text-center mb-20 px-6 max-w-screen-md mx-auto"
      >
        {/* Hero-style pulsing badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/30 bg-obsidian/40 backdrop-blur-md mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse"></span>
          <span className="text-gold text-[0.65rem] tracking-[0.25em] uppercase font-sans">
            El Sello Franko
          </span>
        </div>

        <h2 className="font-serif text-transparent bg-clip-text bg-gradient-to-b from-white to-cream/80 leading-tight mb-6 drop-shadow-2xl text-3xl md:text-4xl lg:text-[3.2rem] font-medium">
          Valores que nos{' '}
          <em className="italic text-gold bg-clip-text font-light" style={{ textShadow: '0 0 30px rgba(180,152,90,0.3)' }}>
            Definen
          </em>
        </h2>
        <p className="font-sans text-mist/80 text-sm md:text-[0.95rem] font-light leading-relaxed max-w-lg mx-auto">
          Nuestra filosofía de trabajo se basa en la búsqueda incansable de la perfección, garantizando que cada evento sea un reflejo fiel de la grandeza de tu organización.
        </p>
      </motion.div>

      {/* Marquee wrapper */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="relative overflow-hidden py-4"
      >
        {/* Fade edges */}
        <div className="pointer-events-none absolute top-0 left-0 bottom-0 z-10 w-24 md:w-48 bg-gradient-to-r from-obsidian to-transparent" />
        <div className="pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-24 md:w-48 bg-gradient-to-l from-obsidian to-transparent" />

        {/* Primera Fila (Moviéndose a la izquierda) */}
        <div className="flex gap-6 w-max animate-marquee mb-6">
          {TRACK.map((attr, i) => (
            <div
              key={`row1-${i}`}
              className="group flex items-center justify-center gap-4 px-8 py-4 rounded-full bg-ink/30 backdrop-blur-md border border-border/20 hover:bg-card/70 hover:border-gold/50 transition-all duration-500 cursor-default hover:-translate-y-1 hover:shadow-[0_15px_30px_-10px_rgba(180,152,90,0.2)]"
            >
              <Sparkles size={16} strokeWidth={1.5} className="text-gold/40 group-hover:text-gold transition-colors duration-500" />
              <span className="font-sans text-[0.7rem] tracking-[0.2em] uppercase text-mist/70 group-hover:text-gold-light transition-colors duration-500 whitespace-nowrap">
                {attr.name}
              </span>
            </div>
          ))}
        </div>

        {/* Segunda Fila (Moviéndose a la derecha invirtiendo el array y jugando con style para revertir la animación) */}
        <div className="flex gap-6 w-max animate-marquee" style={{ animationDirection: 'reverse', animationDuration: '35s' }}>
          {TRACK.slice().reverse().map((attr, i) => (
            <div
              key={`row2-${i}`}
              className="group flex items-center justify-center gap-4 px-8 py-4 rounded-full bg-ink/30 backdrop-blur-md border border-border/20 hover:bg-card/70 hover:border-gold/50 transition-all duration-500 cursor-default hover:-translate-y-1 hover:shadow-[0_15px_30px_-10px_rgba(180,152,90,0.2)]"
            >
              <Sparkles size={16} strokeWidth={1.5} className="text-gold/40 group-hover:text-gold transition-colors duration-500" />
              <span className="font-sans text-[0.7rem] tracking-[0.2em] uppercase text-mist/70 group-hover:text-gold-light transition-colors duration-500 whitespace-nowrap">
                {attr.name}
              </span>
            </div>
          ))}
        </div>

      </motion.div>
    </section>
  )
}
