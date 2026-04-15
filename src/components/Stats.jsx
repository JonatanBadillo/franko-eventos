import { motion } from 'framer-motion'
import { Award, CalendarCheck, SmilePlus, MapPin , Star} from 'lucide-react'

const STATS = [
  { icon: CalendarCheck, num: '500', suffix: '+', label: 'Eventos Corporativos'   },
  { icon: Award,         num: '15',  suffix: '+', label: 'Años de Experiencia'    },
  { icon: SmilePlus,     num: '98',  suffix: '%', label: 'Satisfacción de Clientes' },
  { icon: Star, num: '100', suffix: '%', label: 'Eventos a Medida' },

]

export default function Stats() {
  return (
    <section
      id="stats"
      style={{
        background: 'var(--charcoal)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 max-w-screen-xl mx-auto">
        {STATS.map((s, i) => {
          const Icon = s.icon
          return (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center text-center py-14 px-6
                         border-border
                         [&:not(:last-child)]:border-r
                         first:border-l-0"
            >
              <Icon
                size={18}
                strokeWidth={1.2}
                className="text-gold mb-4 opacity-70"
              />
              <span
                className="font-serif text-gold font-light leading-none mb-2"
                style={{ fontSize: '4.2rem' }}
              >
                {s.num}
                <sup className="text-[0.4em] align-super">{s.suffix}</sup>
              </span>
              <span className="font-sans text-mist text-[0.72rem] tracking-[0.14em] uppercase">
                {s.label}
              </span>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
