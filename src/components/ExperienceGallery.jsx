import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X, ChevronLeft, ChevronRight, Play, Volume2, VolumeX, Maximize2, MapPin, Users
} from 'lucide-react'

const MEDIA = [
  {
    id: 1, type: 'image',
    src: `${import.meta.env.BASE_URL}images/gallery1.png`,
    ph: 'linear-gradient(135deg,#1a2035 0%,#251e12 100%)',
  },
  {
    id: 2, type: 'image',
    src: `${import.meta.env.BASE_URL}images/gallery2.png`,
    ph: 'linear-gradient(160deg,#20152a 0%,#1a2030 100%)',
  },
  {
    id: 3, type: 'image',
    src: `${import.meta.env.BASE_URL}images/gallery3.png`,
    ph: 'linear-gradient(135deg,#152018 0%,#1e2825 100%)',
  },
  {
    id: 4, type: 'image',
    src: `${import.meta.env.BASE_URL}images/gallery4.png`,
    ph: 'linear-gradient(160deg,#25180a 0%,#1a2032 100%)',
  },
]

/* ═══════════════════════════════════════════════════════════
 * VIDEO CARD — autoplay on hover, muted
 * ═══════════════════════════════════════════════════════════ */
function VideoCard({ item, onClick }) {
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  const play = () => {
    if (videoRef.current) { videoRef.current.play(); setPlaying(true) }
  }
  const pause = () => {
    if (videoRef.current) { videoRef.current.pause(); setPlaying(false) }
  }

  return (
    <div
      className="absolute inset-0 cursor-pointer overflow-hidden"
      onMouseEnter={play}
      onMouseLeave={pause}
      onClick={onClick}
    >
      <video
        ref={videoRef}
        src={item.src}
        poster={item.poster}
        muted
        loop
        playsInline
        preload="none"
        className="w-full h-full object-cover transition-transform duration-1000 ease-out"
        style={{ transform: playing ? 'scale(1.05)' : 'scale(1)' }}
        onError={(e) => { e.target.style.display = 'none' }}
      />
      {/* Play indicator */}
      <AnimatePresence>
        {!playing && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
          >
            <div className="w-16 h-16 rounded-full flex items-center justify-center bg-black/30 backdrop-blur-md border border-white/20 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
              <Play size={24} className="text-white ml-1" fill="currentColor" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
 * LIGHTBOX MODAL
 * ═══════════════════════════════════════════════════════════ */
function Lightbox({ items, startIndex, onClose }) {
  const [index, setIndex] = useState(startIndex)
  const [muted, setMuted] = useState(true)
  const videoRef = useRef(null)
  const item = items[index]

  const prev = useCallback(() => setIndex((i) => (i - 1 + items.length) % items.length), [items.length])
  const next = useCallback(() => setIndex((i) => (i + 1) % items.length), [items.length])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft')  prev()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'Escape')     onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [prev, next, onClose])

  useEffect(() => {
    if (item.type === 'video' && videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
  }, [index, item.type])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{ background: 'rgba(5, 5, 8, 0.95)', backdropFilter: 'blur(24px)' }}
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 md:top-6 md:right-6 z-20 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300"
      >
        <X size={20} />
      </button>

      <div className="absolute top-6 md:top-8 left-1/2 -translate-x-1/2 font-sans text-white/50 text-xs tracking-[0.3em] uppercase z-10">
        {index + 1} <span className="mx-2 text-white/20">/</span> {items.length}
      </div>

      <button
        onClick={(e) => { e.stopPropagation(); prev() }}
        className="absolute left-2 md:left-8 z-20 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); next() }}
        className="absolute right-2 md:right-8 z-20 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300"
      >
        <ChevronRight size={24} />
      </button>

      <motion.div
        key={index}
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="relative w-full max-w-6xl mx-auto px-12 md:px-24 flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full overflow-hidden rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] ring-1 ring-white/10" style={{ aspectRatio: '16/9', background: item.ph }}>
          {item.type === 'video' ? (
            <>
              <video
                ref={videoRef}
                src={item.src}
                poster={item.poster}
                muted={muted}
                loop
                playsInline
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setMuted((m) => !m)}
                className="absolute bottom-4 right-4 md:bottom-6 md:right-6 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white hover:bg-black/60 transition-all duration-300"
              >
                {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
            </>
          ) : (
            <img
              src={item.src}
              alt={item.label || "Galería de eventos"}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* Caption (sólo si existe label, location o guests) */}
        {(item.label || item.location || item.guests) && (
          <div className="w-full mt-4 md:mt-6 mb-20 md:mb-0 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              {item.label && <h3 className="font-serif text-2xl md:text-4xl text-white">{item.label}</h3>}
            </div>
            {(item.location || item.guests) && (
              <div className="flex flex-wrap items-center justify-center md:justify-end gap-4 md:gap-6 text-white/60 text-xs md:text-sm font-light">
                {item.location && (
                  <div className="flex items-center gap-1.5 md:gap-2">
                    <MapPin size={16} className="text-gold shrink-0" />
                    <span>{item.location}</span>
                  </div>
                )}
                {item.guests && (
                  <div className="flex items-center gap-1.5 md:gap-2">
                    <Users size={16} className="text-gold shrink-0" />
                    <span>{item.guests} asistentes</span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </motion.div>

      {/* Thumbnail strip */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 md:gap-3 z-20 bg-black/40 backdrop-blur-md px-4 md:px-6 py-3 md:py-4 rounded-2xl border border-white/5 max-w-[95vw] md:max-w-[80vw] overflow-x-auto overflow-y-hidden [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {items.map((it, i) => (
          <button
            key={it.id}
            onClick={(e) => { e.stopPropagation(); setIndex(i) }}
            className={`relative shrink-0 w-12 h-9 md:w-16 md:h-12 rounded-md overflow-hidden transition-all duration-300 ring-2 ring-offset-2 ring-offset-black/50 ${i === index ? 'ring-gold opacity-100' : 'ring-transparent opacity-40 hover:opacity-80'}`}
          >
            <img src={it.type === 'video' ? it.poster : it.src} alt="thumbnail" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════
 * GALLERY CARD
 * ═══════════════════════════════════════════════════════════ */
function GalleryCard({ item, index, onOpen }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative overflow-hidden cursor-pointer group rounded-2xl col-span-1"
      style={{ background: item.ph }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onOpen(index)}
    >
      {/* Media */}
      {item.type === 'video' ? (
        <VideoCard item={item} onClick={() => onOpen(index)} />
      ) : (
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={item.src}
            alt={item.label || "Galería de eventos"}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-1000 ease-out"
            style={{ transform: hovered ? 'scale(1.1)' : 'scale(1)' }}
          />
        </div>
      )}

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
      <div className="absolute inset-0 bg-gold/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Border effect */}
      <div className="absolute inset-0 border-2 border-white/0 group-hover:border-gold/50 rounded-2xl transition-colors duration-500 z-20 pointer-events-none" />

      {/* Top badges (sólo botones de icono) */}
      <div className="absolute top-4 right-4 flex justify-end items-start z-20 pointer-events-none">
        {item.type === 'video' ? (
          <div className="w-8 h-8 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center">
            <Play size={14} className="text-gold ml-0.5" fill="currentColor" />
          </div>
        ) : (
          <motion.div
            animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.5 }}
            className="w-8 h-8 rounded-full bg-gold/20 backdrop-blur-md border border-gold/50 flex items-center justify-center text-gold"
          >
            <Maximize2 size={14} />
          </motion.div>
        )}
      </div>

      {/* Content (Sólo si la foto tiene descripción) */}
      {(item.label || item.location || item.guests) && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 p-5 md:p-6 z-20 pointer-events-none"
          animate={{ y: hovered ? 0 : 10 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {item.label && (
            <h3 className="font-serif text-xl md:text-2xl text-white mb-2 leading-tight group-hover:text-gold-light transition-colors duration-300">
              {item.label}
            </h3>
          )}
          
          <motion.div 
            className="flex flex-wrap items-center gap-x-4 gap-y-2 text-white/70 text-xs md:text-sm overflow-hidden"
            animate={{ height: hovered ? 'auto' : '0px', opacity: hovered ? 1 : 0, marginTop: hovered ? '0.5rem' : '0px' }}
            transition={{ duration: 0.3 }}
          >
            {item.location && (
              <div className="flex items-center gap-1.5">
                <MapPin size={14} className="text-gold shrink-0" />
                <span className="truncate">{item.location}</span>
              </div>
            )}
            {item.guests && (
              <div className="flex items-center gap-1.5">
                <Users size={14} className="text-gold shrink-0" />
                <span className="truncate">{item.guests}</span>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════
 * MAIN COMPONENT
 * ═══════════════════════════════════════════════════════════ */
export default function ExperienceGallery() {
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const [showAll, setShowAll] = useState(false)
  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const displayedMedia = (isMobile && !showAll) ? MEDIA.slice(0, 8) : MEDIA

  const openLightbox  = (index) => { 
    setLightboxIndex(index)
    document.body.style.overflow = 'hidden' 
  }
  
  const closeLightbox = () => { 
    setLightboxIndex(null)
    document.body.style.overflow = '' 
  }

  return (
    <section
      id="gallery"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: 'var(--obsidian)' }}
    >
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-gold/5 rounded-full blur-[80px] md:blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-gold/5 rounded-full blur-[60px] md:blur-[100px] pointer-events-none translate-y-1/3 -translate-x-1/3" />

      <div className="px-5 md:px-16 max-w-screen-2xl mx-auto relative z-10">
        
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12 md:mb-16"
        >
          <span className="inline-block py-1 px-4 rounded-full border border-gold/30 text-gold text-xs md:text-sm tracking-widest uppercase mb-4 md:mb-6 shadow-[0_0_15px_rgba(212,175,55,0.1)]">
            Portafolio
          </span>
          <h2 className="font-serif text-cream leading-tight mb-4 md:mb-6" style={{ fontSize: 'clamp(2rem, 5vw, 4.5rem)', fontWeight: 500 }}>
            Experiencias que <br className="md:hidden" />
            <span className="italic text-gold relative inline-block mt-1 md:mt-0">Perduran<div className="absolute -bottom-1 md:-bottom-2 left-0 w-full h-[2px] bg-gold/30 rounded-full" /></span>
          </h2>
          <p className="font-sans text-mist text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed px-4 md:px-0">
            Cada evento es una historia narrada con precisión. Explora nuestra galería de producciones reales para marcas líderes en México.
          </p>
        </motion.div>

        {/* ── Simple Grid (3 columns on large, 2 on tablet, 1 on mobile) ── */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 auto-rows-[300px] md:auto-rows-[350px]">
          <AnimatePresence mode="popLayout">
            {displayedMedia.map((item, i) => (
              <GalleryCard
                key={item.id}
                item={item}
                index={i}
                onOpen={openLightbox}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ── Load More Button (Mobile Only) ── */}
        {isMobile && !showAll && MEDIA.length > 8 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-10 flex justify-center"
          >
            <button
              onClick={() => setShowAll(true)}
              className="group relative flex items-center justify-center gap-2 px-8 py-3 border border-gold/50 text-gold hover:bg-gold hover:text-ink font-medium rounded-full transition-all duration-300"
            >
              <span className="font-sans text-xs tracking-[0.15em] uppercase">Ver más galería</span>
              <ChevronRight size={14} strokeWidth={2} className="group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </motion.div>
        )}

      </div>

      {/* ── Lightbox Modal ── */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            items={MEDIA}
            startIndex={lightboxIndex}
            onClose={closeLightbox}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
