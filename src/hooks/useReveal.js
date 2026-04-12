import { useEffect, useRef } from 'react'

/**
 * useReveal — returns a ref to attach to any element.
 * When the element enters the viewport, Framer Motion variants
 * handle the animation via the parent <motion.div whileInView>.
 * This hook is kept as a lightweight alternative for non-motion elements.
 *
 * Usage:
 *   const ref = useReveal()
 *   <div ref={ref} className="opacity-0 translate-y-8 transition-all duration-700">
 */
export function useReveal(threshold = 0.1) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('opacity-100', '!translate-y-0')
          el.classList.remove('opacity-0', 'translate-y-8')
          observer.unobserve(el)
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return ref
}
