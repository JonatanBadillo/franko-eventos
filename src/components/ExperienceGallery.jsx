import { motion } from 'framer-motion'

/*
 * SWAP: Replace the `bg` gradient strings below with:
 *   backgroundImage: "url('/images/gallery/event-1.jpg')"
 *   backgroundSize: 'cover'
 *   backgroundPosition: 'center'
 *
 * Each item maps to one cell in the masonry grid.
 */
const GALLERY_ITEMS = [
  { id: 'gi-1', label: 'Congreso Nacional · 2024',       bg: 'linear-gradient(160deg,#1a2030,#251e15)' },
  { id: 'gi-2', label: 'Gala Ejecutiva · 2023',          bg: 'linear-gradient(160deg,#1e2520,#202030)' },
  { id: 'gi-3', label: 'Team Building · 2024',           bg: 'linear-gradient(160deg,#25201a,#1a2025)' },
  { id: 'gi-4', label: 'Lanzamiento de Producto · 2024', bg: 'linear-gradient(160deg,#201a25,#25201a)' },
  { id: 'gi-5', label: 'Convención Anual · 2023',        bg: 'linear-gradient(160deg,#1a2030,#201a20)' },
  { id: 'gi-6', label: 'Banquete Corporativo · 2024',    bg: 'linear-gradient(160deg,#252015,#1a2030)' },
  { id: 'gi-7', label: 'Keynote Ejecutivo · 2024',       bg: 'linear-gradient(160deg,#1a2025,#25201a)' },
]

/*
 * 12-column grid — each item spans specific columns & rows.
 * Adjust gridColumn / gridRow to change the masonry layout.
 */
const GRID_PLACEMENT = [
  { gridColumn: '1 / 6',  gridRow: '1 / 3' }, // tall left
  { gridColumn: '6 / 9',  gridRow: '1 / 2' }, // top middle
  { gridColumn: '9 / 13', gridRow: '1 / 3' }, // tall right
  { gridColumn: '6 / 9',  gridRow: '2 / 3' }, // middle centre
  { gridColumn: '1 / 4',  gridRow: '3 / 4' }, // bottom left
  { gridColumn: '4 / 9',  gridRow: '3 / 4' }, // bottom centre
  { gridColumn: '9 / 13', gridRow: '3 / 4' }, // bottom right
]

export default function ExperienceGallery() {
  return (
    <section
      id="gallery"
      className="py-28 px-8 md:px-16"
      style={{ background: 'var(--obsidian)' }}
    >
      <div className="max-w-screen-xl mx-auto">

        {/* Header row */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-6"
        >
          <div>
            <span className="section-label">Portafolio</span>
            <h2
              className="font-serif text-cream leading-tight"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 500 }}
            >
              Experiencias que<br />
              <em className="italic text-gold-light">Perduran</em>
            </h2>
          </div>
          <a href="#contact" className="btn-outline-gold self-start md:self-auto">
            Ver Galería Completa
          </a>
        </motion.div>

        {/* Masonry grid — desktop */}
        <div
          className="hidden md:grid"
          style={{
            gridTemplateColumns: 'repeat(12, 1fr)',
            gridTemplateRows:    'repeat(3, 180px)',
            gap: '6px',
          }}
        >
          {GALLERY_ITEMS.map((item, i) => (
            <motion.div
              key={item.id}
              className="gallery-item"
              style={{ ...GRID_PLACEMENT[i], background: item.bg }}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.05 }}
              transition={{
                duration: 0.7,
                delay: i * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {/* SWAP: <img src={item.src} className="w-full h-full object-cover" alt={item.label} /> */}
              <span
                className="absolute bottom-2 left-2 font-sans text-white/25 pointer-events-none"
                style={{ fontSize: '0.58rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}
              >
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Mobile fallback — 2-column simple grid */}
        <div className="md:hidden grid grid-cols-2 gap-1.5">
          {GALLERY_ITEMS.map((item, i) => (
            <motion.div
              key={item.id}
              className="gallery-item"
              style={{ height: '150px', background: item.bg }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
            >
              <span
                className="absolute bottom-2 left-2 font-sans text-white/20 pointer-events-none"
                style={{ fontSize: '0.55rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}
              >
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
