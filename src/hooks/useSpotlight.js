import { useEffect } from 'react'

/**
 * Lets any element with a `data-spotlight` attribute show a soft light on its
 * border that follows the pointer. One listener for the whole page; the
 * position is stored in CSS variables, so React never re-renders.
 */
export function useSpotlight() {
  useEffect(() => {
    if (!window.matchMedia('(hover: hover)').matches) return

    const handlePointerMove = (event) => {
      const element = event.target.closest?.('[data-spotlight]')
      if (!element) return
      const rect = element.getBoundingClientRect()
      element.style.setProperty('--spot-x', `${event.clientX - rect.left}px`)
      element.style.setProperty('--spot-y', `${event.clientY - rect.top}px`)
    }

    document.addEventListener('pointermove', handlePointerMove, { passive: true })
    return () => document.removeEventListener('pointermove', handlePointerMove)
  }, [])
}
