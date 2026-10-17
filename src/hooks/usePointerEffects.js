import { useEffect } from 'react'
import { prefersReducedMotion } from './usePrefersReducedMotion'

// How far (in px) a card's edge moves towards or away from the viewer when it tilts.
// Using a distance instead of a fixed angle makes large and small cards feel the same.
const DEFAULT_TILT_DEPTH = 10
const MAX_TILT_ANGLE = 8

const toDegrees = (radians) => (radians * 180) / Math.PI

/**
 * Pointer effects for the whole page, with a single listener:
 *
 * - `data-tilt`: the element tilts in 3D towards the pointer (class `is-tilting`,
 *   variables `--tilt-x`, `--tilt-y`, `--pointer-x`, `--pointer-y`).
 *   `data-tilt="22"` sets a different depth in px.
 * - `data-spotlight`: a soft light on the border follows the pointer (`--spot-x`, `--spot-y`).
 *
 * Values go into CSS variables, so React never re-renders. CSS decides what moves
 * (see src/styles/motion.css). Skipped on touch screens; tilt is skipped for reduced motion.
 */
export function usePointerEffects() {
  useEffect(() => {
    if (!window.matchMedia('(hover: hover)').matches) return

    const allowTilt = !prefersReducedMotion()
    let tiltedCard = null
    let tiltedRect = null // measured while the card is still flat, so tilting doesn't feed back

    const stopTilt = () => {
      if (!tiltedCard) return
      tiltedCard.classList.remove('is-tilting')
      tiltedCard = null
      tiltedRect = null
    }

    const startTilt = (card) => {
      stopTilt()
      tiltedCard = card
      tiltedRect = card.getBoundingClientRect()
      card.classList.add('is-tilting')
    }

    const handlePointerMove = (event) => {
      const target = event.target instanceof Element ? event.target : null

      const spotlight = target?.closest('[data-spotlight]')
      if (spotlight) {
        const rect = spotlight === tiltedCard ? tiltedRect : spotlight.getBoundingClientRect()
        spotlight.style.setProperty('--spot-x', `${event.clientX - rect.left}px`)
        spotlight.style.setProperty('--spot-y', `${event.clientY - rect.top}px`)
      }

      if (!allowTilt) return
      const card = target?.closest('[data-tilt]')
      if (!card) {
        stopTilt()
        return
      }
      if (card !== tiltedCard) startTilt(card)

      const rect = tiltedRect
      const x = Math.min(Math.max((event.clientX - rect.left) / rect.width - 0.5, -0.5), 0.5)
      const y = Math.min(Math.max((event.clientY - rect.top) / rect.height - 0.5, -0.5), 0.5)
      const depth = Number(card.dataset.tilt) || DEFAULT_TILT_DEPTH
      const maxY = Math.min(MAX_TILT_ANGLE, toDegrees(Math.atan(depth / (rect.width / 2))))
      const maxX = Math.min(MAX_TILT_ANGLE, toDegrees(Math.atan(depth / (rect.height / 2))))

      card.style.setProperty('--tilt-x', `${(-y * 2 * maxX).toFixed(2)}deg`)
      card.style.setProperty('--tilt-y', `${(x * 2 * maxY).toFixed(2)}deg`)
      card.style.setProperty('--pointer-x', x.toFixed(3))
      card.style.setProperty('--pointer-y', y.toFixed(3))
    }

    document.addEventListener('pointermove', handlePointerMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', stopTilt)
    // Layout moves under the pointer while scrolling, so let the card settle back.
    window.addEventListener('scroll', stopTilt, { passive: true })
    window.addEventListener('blur', stopTilt)
    return () => {
      stopTilt()
      document.removeEventListener('pointermove', handlePointerMove)
      document.documentElement.removeEventListener('pointerleave', stopTilt)
      window.removeEventListener('scroll', stopTilt)
      window.removeEventListener('blur', stopTilt)
    }
  }, [])
}
