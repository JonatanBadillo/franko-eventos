import { motion } from 'framer-motion'
import {
  UtensilsCrossed,
  MonitorPlay,
  Users,
  Building2,
  Megaphone,
  GlassWater,
} from 'lucide-react'

const SERVICES = [
  {
    num: '01',
    icon: UtensilsCrossed,
    name: 'Banquetes & Gastronomía',
    desc:
      'Menús de autor, servicio de meseros de etiqueta y presentaciones culinarias para hasta 2,000 comensales. Proveedores certificados con estándares internacionales.',
  },
  {
    num: '02',
    icon: MonitorPlay,
    name: 'Producción Audiovisual',
    desc:
      'Diseño de escenarios, pantallas LED de alta resolución, iluminación arquitectónica, streaming en vivo y equipos de sonido profesional de primer nivel.',
  },
  {
    num: '03',
    icon: Users,
    name: 'Team Building',
    desc:
      'Experiencias diseñadas para fortalecer equipos: actividades al aire libre, talleres creativos, olimpiadas corporativas y dinámicas de liderazgo.',
  },
  {
    num: '04',
    icon: Building2,
    name: 'Congresos & Convenciones',
    desc:
      'Gestión completa: registro de asistentes, coordinación de ponentes, logística de múltiples salas y transmisión híbrida para audiencias nacionales e internacionales.',
  },
  {
    num: '05',
    icon: Megaphone,
    name: 'Lanzamientos de Producto',
    desc:
      'Experiencias de marca inmersivas que generan impacto mediático. Conceptualización creativa, activaciones sensoriales y gestión de prensa especializada.',
  },
  {
    num: '06',
    icon: GlassWater,
    name: 'Galas & Cenas Corporativas',
    desc:
      'Eventos de distinción con ambientación temática premium, entretenimiento en vivo, maestros de ceremonias y experiencias personalizadas para su empresa.',
  },
]

export default function Services() {
  return (
    <section
      id="services"
      className="py-28 px-8 md:px-16"
      style={{ background: 'var(--ink)' }}
    >
      <div className="max-w-screen-xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="section-label">Nuestros Servicios</span>
          <h2
            className="font-serif text-cream leading-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 500 }}
          >
            Soluciones <em className="italic text-gold-light">Integrales</em>
            <br />para tu Empresa
          </h2>
        </motion.div>

        {/* Grid */}
        <div
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          style={{
            gap: '1.5px',
            background: 'var(--border)',
          }}
        >
          {SERVICES.map((svc, i) => {
            const Icon = svc.icon
            return (
              <motion.div
                key={svc.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{
                  duration: 0.75,
                  delay: (i % 3) * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -4 }}
                className="group relative overflow-hidden cursor-pointer"
                style={{ background: 'var(--card)', padding: '2.5rem 2rem' }}
              >
                {/* Hover gradient overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: 'linear-gradient(135deg, var(--gold-pale), transparent)' }}
                />

                {/* Box shadow on hover */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={false}
                  whileHover={{ boxShadow: '0 24px 60px rgba(0,0,0,0.55)' }}
                />

                {/* Number */}
                <span
                  className="font-serif leading-none mb-4 block transition-colors duration-500"
                  style={{
                    fontSize: '3.2rem',
                    fontWeight: 300,
                    color: 'rgba(180,152,90,0.12)',
                  }}
                >
                  {svc.num}
                </span>

                {/* Icon */}
                <div
                  className="w-11 h-11 flex items-center justify-center mb-5
                             border transition-all duration-500
                             group-hover:border-gold group-hover:bg-gold-pale"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <Icon
                    size={16}
                    strokeWidth={1.3}
                    className="text-gold"
                  />
                </div>

                {/* Name */}
                <h3
                  className="font-serif text-cream mb-3 leading-snug"
                  style={{ fontSize: '1.3rem', fontWeight: 500 }}
                >
                  {svc.name}
                </h3>

                {/* Description */}
                <p className="font-sans text-mist text-[0.85rem] leading-relaxed">
                  {svc.desc}
                </p>

                {/* Arrow */}
                <span
                  className="absolute bottom-5 right-5 text-gold text-lg
                             opacity-0 translate-x-[-8px]
                             group-hover:opacity-100 group-hover:translate-x-0
                             transition-all duration-400"
                >
                  →
                </span>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
