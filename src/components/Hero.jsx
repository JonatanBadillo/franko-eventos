import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { ChevronDown, Play } from 'lucide-react'

// Variantes de animación
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] },
})

export default function Hero() {
  const containerRef = useRef(null)
  const { scrollY } = useScroll()
  
  // Parallax effects
  const yText = useTransform(scrollY, [0, 1000], [0, 300])
  const opacityText = useTransform(scrollY, [0, 500], [1, 0])
  const scaleVideo = useTransform(scrollY, [0, 1000], [1, 1.15])

  // Efecto de partículas simples
  const [particles, setParticles] = useState([])
  
  useEffect(() => {
    const newParticles = Array.from({ length: 20 }).map((_, i) => ({
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
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black"
    >
      {/* ── Background Video with Parallax ── */}
      <motion.div 
        style={{ scale: scaleVideo }}
        className="absolute inset-0 w-full h-full transform-gpu"
      >
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay muted loop playsInline
          src={`${import.meta.env.BASE_URL}videos/hero-reel.mp4`}
        />
        {/* Overlay Layers */}
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/80 via-obsidian/50 to-obsidian/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-obsidian/40 to-black/80" />
      </motion.div>

      {/* ── Partículas Doradas Flotantes ── */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            animate={{
              y: [0, -1000],
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

      {/* ── Main Content ── */}
      <motion.div 
        style={{ y: yText, opacity: opacityText }}
        className="relative z-10 text-center px-6 max-w-[1000px] mx-auto mt-20"
      >
        {/* Badge superior */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/30 bg-obsidian/40 backdrop-blur-md mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse"></span>
          <span className="text-gold text-[0.65rem] tracking-[0.25em] uppercase font-sans">
            Eventos Corporativos de Élite
          </span>
        </motion.div>

        {/* Título Principal */}
        <motion.h1
          {...fadeUp(0.4)}
          className="font-serif text-transparent bg-clip-text bg-gradient-to-b from-white to-cream/80 leading-[1.1] mb-6 drop-shadow-2xl"
          style={{ fontSize: 'clamp(2.8rem, 6.5vw, 6.5rem)', fontWeight: 400 }}
        >
          Transformamos visiones<br />
          <em className="italic text-gold bg-clip-text font-light" style={{ textShadow: '0 0 40px rgba(180,152,90,0.3)' }}>
            en experiencias corporativas
          </em>
        </motion.h1>

        {/* Descripción */}
        <motion.p
          {...fadeUp(0.6)}
          className="text-mist/90 font-sans font-light leading-relaxed max-w-2xl mx-auto mb-12 text-[1rem] md:text-[1.1rem]"
        >
          Más de 15 años creando eventos que elevan la reputación empresarial y fortalecen las relaciones corporativas con estrategia, ética y excelencia absoluta.
        </motion.p>

        {/* Botones */}
        <motion.div
          {...fadeUp(0.8)}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <a 
            href="#contact" 
            className="group relative px-8 py-4 bg-gold text-obsidian font-sans text-[0.75rem] tracking-[0.2em] uppercase rounded flex items-center justify-center overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_rgba(180,152,90,0.4)] hover:scale-105"
          >
            <span className="relative z-10 font-medium">Cotizar mi Evento</span>
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
          </a>
          
          <a 
            href="#gallery" 
            className="group px-8 py-4 border border-white/20 text-cream font-sans text-[0.75rem] tracking-[0.2em] uppercase rounded flex items-center justify-center gap-3 backdrop-blur-sm bg-white/5 hover:bg-white/10 hover:border-gold/50 transition-all duration-500"
          >
            <div className="w-6 h-6 rounded-full border border-cream/30 flex items-center justify-center group-hover:border-gold group-hover:text-gold transition-colors duration-300">
              <Play size={10} className="ml-0.5" />
            </div>
            <span className="group-hover:text-gold transition-colors duration-300">Ver Portafolio</span>
          </a>
        </motion.div>
      </motion.div>

      {/* ── Scroll Down Indicator ── */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-mist hover:text-gold transition-colors duration-300 z-20 group"
      >
        
      </motion.a>

      {/* Gradiente inferior para transición suave con la siguiente sección */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-obsidian to-transparent z-10 pointer-events-none" />
    </section>
  )
}
