import { useEffect, useRef, useState } from 'react'

/**
 * Returns a ref and a boolean that becomes true the first time the element
 * scrolls into view. Used for subtle fade-in / slide-up animations.
 */
export function useReveal({ threshold = 0.15, rootMargin = '0px 0px -40px 0px' } = {}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element || isVisible) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [isVisible, threshold, rootMargin])

  return [ref, isVisible]
}
