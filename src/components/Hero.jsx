import { motion } from 'framer-motion'

const fadeUp = (delay = 0) => ({
  initial:   { opacity: 0, y: 40 },
  animate:   { opacity: 1, y: 0  },
  transition: { duration: 1, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        // Dejamos un color negro base puro por si el video tarda un segundo en cargar
        backgroundColor: '#000000', 
      }}
    >
      
       <video
         className="absolute inset-0 w-full h-full object-cover opacity-50" // Subí un poco la opacidad a 50 para que se note más
         autoPlay muted loop playsInline
         src={`${import.meta.env.BASE_URL}videos/hero-reel.mp4`} // ¡AQUÍ ESTÁ LA MAGIA PARA GITHUB PAGES!
       />
       <div className="absolute inset-0 bg-obsidian/60" />
      

      {/* Ambient light blobs */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 80% 20%, rgba(180,152,90,0.08) 0%, transparent 60%),
            radial-gradient(ellipse 40% 60% at 10% 80%, rgba(180,152,90,0.05) 0%, transparent 70%)
          `,
        }}
      />

      {/* Decorative grid */}
      <div className="hero-grid-lines" />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">

      {/* <motion.p
          {...fadeUp(0.1)}
          className="section-label justify-center mb-6 tracking-[0.35em]"
          style={{ display: 'block' }}
        >
          · Eventos Corporativos de Élite ·
        </motion.p> */}

        <motion.h1
          {...fadeUp(0.25)}
          className="font-serif text-cream leading-tight mb-6"
          style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', fontWeight: 500 }}
        >
          Transformamos visiones<br />
          <em className="italic text-gold-light">en experiencias corporativas excepcionales</em>
        </motion.h1>

        <motion.p
          {...fadeUp(0.4)}
          className="text-mist font-sans font-light leading-relaxed max-w-xl mx-auto mb-10"
          style={{ fontSize: '0.97rem' }}
        >
          Más de 15 años creando eventos que elevan la reputación empresarial y fortalecen las relaciones corporativas con estrategia, ética y excelencia.
        </motion.p>

        <motion.div
          {...fadeUp(0.55)}
          className="flex flex-wrap gap-4 justify-center"
        >
          <a href="#contact" className="btn-primary">
            Cotizar mi Evento
          </a>
          <a href="#gallery" className="btn-ghost">
            Ver Portafolio
          </a>
        </motion.div>
      </div>

      {/* Scroll hint */}
      {/* <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2
                   text-[0.6rem] tracking-[0.25em] uppercase text-mist animate-pulse2"
      >
        <div
          className="w-px h-12"
          style={{ background: 'linear-gradient(to bottom, var(--gold), transparent)' }}
        />
        <span>Scroll</span>
      </motion.div> */}
    </section>
  )
}
