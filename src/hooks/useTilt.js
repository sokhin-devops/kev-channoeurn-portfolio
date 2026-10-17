import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from './usePrefersReducedMotion'

/**
 * Tilts content in 3D towards the pointer while it moves over the element.
 * Sets --tilt-x / --tilt-y (in degrees) on the element; CSS applies the rotation.
 * Skipped on touch screens and when reduced motion is preferred.
 */
export function useTilt(maxDegrees = 8) {
  const ref = useRef(null)

  useEffect(() => {
    const element = ref.current
    if (!element || !window.matchMedia('(hover: hover)').matches || prefersReducedMotion()) return

    const handlePointerMove = (event) => {
      const rect = element.getBoundingClientRect()
      const x = (event.clientX - rect.left) / rect.width - 0.5
      const y = (event.clientY - rect.top) / rect.height - 0.5
      element.style.setProperty('--tilt-x', `${(-y * maxDegrees * 2).toFixed(2)}deg`)
      element.style.setProperty('--tilt-y', `${(x * maxDegrees * 2).toFixed(2)}deg`)
    }

    const handlePointerLeave = () => {
      element.style.setProperty('--tilt-x', '0deg')
      element.style.setProperty('--tilt-y', '0deg')
    }

    element.addEventListener('pointermove', handlePointerMove)
    element.addEventListener('pointerleave', handlePointerLeave)
    return () => {
      element.removeEventListener('pointermove', handlePointerMove)
      element.removeEventListener('pointerleave', handlePointerLeave)
    }
  }, [maxDegrees])

  return ref
}
