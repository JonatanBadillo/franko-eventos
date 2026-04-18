import { motion, useInView } from 'framer-motion'
import { Award, CalendarCheck, SmilePlus, MapPin, Star } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const STATS = [
  { icon: CalendarCheck, num: 500, suffix: '+', label: 'Eventos Corporativos' },
  { icon: Award,         num: 15,  suffix: '+', label: 'Años de Experiencia' },
  { icon: SmilePlus,     num: 98,  suffix: '%', label: 'Satisfacción de Clientes' },
  { icon: Star,          num: 100, suffix: '%', label: 'Eventos a Medida' },
]

function Counter({ from, to, duration = 2, inView }) {
  const [count, setCount] = useState(from)

  useEffect(() => {
    if (inView) {
      let startTimestamp = null
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp
        const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1)
        const easeOutQuart = 1 - Math.pow(1 - progress, 4)
        setCount(Math.floor(easeOutQuart * (to - from) + from))
        if (progress < 1) {
          window.requestAnimationFrame(step)
        }
      }
      window.requestAnimationFrame(step)
    }
  }, [inView, from, to, duration])

  return <span>{count}</span>
}

export default function Stats() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section
      id="stats"
      ref={ref}
      className="relative py-28 overflow-hidden bg-obsidian border-y border-border"
    >
      {/* Decorative blurred background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex justify-center items-center">
        <div className="absolute w-[600px] h-[600px] bg-gold-pale rounded-full blur-[120px] opacity-40 animate-pulse2"></div>
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-screen-xl mx-auto gap-6 px-6 lg:px-12">
        {STATS.map((s, i) => {
          const Icon = s.icon
          return (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.95 }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="group flex flex-col items-center text-center p-10 rounded-2xl
                         bg-charcoal/40 backdrop-blur-md border border-border/40
                         hover:bg-charcoal/70 hover:border-gold/40 hover:-translate-y-2
                         hover:shadow-[0_15px_40px_-15px_rgba(180,152,90,0.3)]
                         transition-all duration-500 cursor-default"
            >
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-gold/20 rounded-full blur-xl group-hover:bg-gold/40 transition-colors duration-500"></div>
                <div className="relative flex items-center justify-center w-20 h-20 rounded-full border border-gold/20 bg-charcoal group-hover:border-gold/50 transition-colors duration-500">
                  <Icon
                    size={32}
                    strokeWidth={1.2}
                    className="text-gold group-hover:text-gold-light group-hover:scale-110 transition-all duration-500"
                  />
                </div>
              </div>
              
              <div className="flex items-baseline justify-center mb-3">
                <span className="font-serif text-cream font-light tracking-tight text-6xl group-hover:text-white transition-colors duration-500">
                  <Counter from={0} to={s.num} inView={isInView} duration={2.5} />
                </span>
                <span className="font-serif text-gold text-3xl ml-1 group-hover:text-gold-light transition-colors duration-500">
                  {s.suffix}
                </span>
              </div>
              
              <span className="font-sans text-mist text-sm font-medium tracking-[0.2em] uppercase group-hover:text-cream/90 transition-colors duration-500">
                {s.label}
              </span>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
