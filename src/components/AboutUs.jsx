import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const PILARES = [
  { titulo: 'Precisión',  etiqueta: 'Logística Impecable' },
  { titulo: 'Diseño',     etiqueta: 'Conceptos a Medida'  },
  { titulo: 'Impacto',    etiqueta: 'Experiencias Únicas' },
]

export default function AboutUs() {
  const containerRef = useRef(null)
  
  // Efecto Parallax al hacer scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })
  
  const y1 = useTransform(scrollYProgress, [0, 1], [60, -60])
  const y2 = useTransform(scrollYProgress, [0, 1], [-40, 40])

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative py-32 px-8 md:px-16 overflow-hidden"
      style={{ background: 'var(--obsidian)' }}
    >
      {/* ── Resplandor decorativo de fondo ── */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none opacity-20"
        style={{ background: 'radial-gradient(circle, var(--gold) 0%, transparent 60%)', filter: 'blur(80px)' }}
      />

      <div className="relative max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">

        {/* ── Izquierda: Texto ── */}
        <div className="lg:col-span-5 z-10">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Etiqueta superior */}
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="font-sans text-gold text-[0.75rem] tracking-[0.2em] uppercase mb-4 block"
            >
              Nuestra Esencia
            </motion.span>
            
            {/* Título Principal */}
            <h2
              className="font-serif text-cream mb-6 leading-tight"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 400 }}
            >
              Nuestro<br />
              <em className="italic text-gold font-light">Propósito</em>
            </h2>
            
            {/* Línea animada */}
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: '80px' }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="h-[1px] bg-gold/50 mb-8" 
            />

            {/* Párrafos */}
            <div className="space-y-6 text-mist/90 font-sans font-light text-[1rem] leading-[1.8]">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                Cada evento corporativo es una oportunidad única para fortalecer la imagen, cultura y relaciones de tu organización.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                Diseñamos experiencias estratégicas que trascienden lo convencional, cuidando cada detalle para asegurar que tu mensaje resuene con fuerza.
              </motion.p>
            </div>

            {/* Pilares */}
            <div className="flex flex-col gap-6 mt-12">
              {PILARES.map((p, index) => (
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + (index * 0.15), duration: 0.6 }}
                  key={p.titulo} 
                  className="flex items-center gap-6 group cursor-default"
                >
                  <div className="w-12 h-[1px] bg-border group-hover:bg-gold transition-colors duration-500" />
                  <div className="flex flex-col">
                    <span
                      className="font-serif text-gold-light group-hover:text-gold transition-colors duration-300"
                      style={{ fontSize: '1.6rem', lineHeight: '1.2' }}
                    >
                      {p.titulo}
                    </span>
                    <span className="font-sans text-mist/60 text-[0.65rem] tracking-[0.2em] uppercase mt-1 group-hover:text-mist transition-colors duration-300">
                      {p.etiqueta}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Derecha: Composición de Imágenes ── */}
        <div className="lg:col-span-7 relative h-[600px] w-full hidden lg:block">
          
          {/* Imagen Principal (Arriba Derecha) con Parallax */}
          <motion.div
            style={{ y: y1 }}
            className="absolute top-0 right-0 w-[75%] h-[420px] rounded-sm overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-10 group"
          >
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700 z-10" />
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="w-full h-full"
              style={{
                backgroundImage: `url('${import.meta.env.BASE_URL}images/proposito1.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
          </motion.div>

          {/* Imagen Secundaria (Abajo Izquierda) con Parallax Inverso */}
          <motion.div
            style={{ y: y2 }}
            className="absolute bottom-4 left-0 w-[55%] h-[320px] rounded-sm overflow-hidden border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.6)] z-20 group"
          >
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700 z-10" />
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="w-full h-full"
              style={{
                backgroundImage: `url('${import.meta.env.BASE_URL}images/proposito2.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
          </motion.div>

          {/* Medalla Flotante de "+15 Años" tipo Glassmorphism */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 0.6, type: 'spring' }}
            className="absolute top-[30%] -left-8 z-30"
          >
             <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="flex flex-col items-center justify-center w-36 h-36 rounded-full border border-gold/30 bg-obsidian/70 backdrop-blur-xl shadow-[0_0_30px_rgba(180,152,90,0.2)]"
             >
                <span className="font-serif text-gold leading-none mb-1" style={{ fontSize: '2.5rem', fontWeight: 400 }}>+15</span>
                <span className="font-sans text-mist text-[0.55rem] tracking-[0.18em] uppercase text-center leading-relaxed">
                  Años de<br />excelencia
                </span>
             </motion.div>
          </motion.div>

        </div>

      </div>
    </section>
  )
}
