import { useEffect, useRef } from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { useTheme } from '../../hooks/useTheme'

/*
 * A slowly rotating 3D globe made of points, drawn on a 2D canvas.
 * No 3D library: each point is rotated in 3D and projected with simple perspective,
 * so nearer points look bigger and brighter. A small pulse marks Phnom Penh.
 *
 * Purely decorative. It pauses when off screen or in a background tab,
 * and draws a single still frame when the user prefers reduced motion.
 */

const PHNOM_PENH = { lat: 11.56, lon: 104.92 }
const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5))
const BRIGHTNESS_LEVELS = 12

// Evenly spread points over a sphere (a "Fibonacci sphere").
function createSpherePoints(count) {
  const points = []
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2
    const ringRadius = Math.sqrt(1 - y * y)
    const angle = i * GOLDEN_ANGLE
    points.push([Math.cos(angle) * ringRadius, y, Math.sin(angle) * ringRadius])
  }
  return points
}

// Latitude / longitude to a point on the unit sphere (y is up).
function latLonToPoint({ lat, lon }) {
  const phi = (lat * Math.PI) / 180
  const lambda = (lon * Math.PI) / 180
  return [Math.cos(phi) * Math.cos(lambda), Math.sin(phi), -Math.cos(phi) * Math.sin(lambda)]
}

const palette = {
  dark: { dots: '170, 180, 255', marker: '94, 200, 240' },
  light: { dots: '79, 93, 234', marker: '10, 126, 164' },
}

export function ParticleGlobe({ className }) {
  const canvasRef = useRef(null)
  const prefersReducedMotion = usePrefersReducedMotion()
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    if (!context) return

    const colors = palette[resolvedTheme] ?? palette.dark
    const isSmallScreen = window.matchMedia('(max-width: 640px)').matches
    const points = createSpherePoints(isSmallScreen ? 420 : 760)
    const marker = latLonToPoint(PHNOM_PENH)

    let pixelRatio = 1
    let rotation = 1.2
    let lastTime = 0
    let frame = 0
    let isVisible = true
    const pointer = { x: 0, y: 0 }
    const tilt = { x: 0, y: 0 }

    function resize() {
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(canvas.clientWidth * pixelRatio)
      canvas.height = Math.round(canvas.clientHeight * pixelRatio)
    }

    function draw(time = 0) {
      const delta = Math.min(time - lastTime, 50)
      lastTime = time
      if (!prefersReducedMotion) rotation += delta * 0.00011

      // Ease the tilt towards the pointer for a smooth, weighty feel.
      tilt.x += (pointer.y * 0.35 - tilt.x) * 0.05
      tilt.y += (pointer.x * 0.5 - tilt.y) * 0.05

      const { width, height } = canvas
      const radius = Math.min(width, height) * 0.42
      const centerX = width / 2
      const centerY = height / 2
      const angleY = rotation + tilt.y
      const angleX = -0.32 + tilt.x
      const cosY = Math.cos(angleY)
      const sinY = Math.sin(angleY)
      const cosX = Math.cos(angleX)
      const sinX = Math.sin(angleX)

      // Rotate around Y then X, then project with a little perspective.
      const project = ([x, y, z]) => {
        const x1 = x * cosY - z * sinY
        const z1 = x * sinY + z * cosY
        const y2 = y * cosX - z1 * sinX
        const z2 = y * sinX + z1 * cosX
        const perspective = 3 / (3 - z2)
        return {
          x: centerX + x1 * radius * perspective,
          y: centerY - y2 * radius * perspective,
          depth: (z2 + 1) / 2, // 0 = far side, 1 = nearest
        }
      }

      context.clearRect(0, 0, width, height)

      // Group points by brightness so each group is filled in one call.
      const groups = Array.from({ length: BRIGHTNESS_LEVELS }, () => [])
      for (const point of points) {
        const projected = project(point)
        const level = Math.min(BRIGHTNESS_LEVELS - 1, Math.floor(projected.depth * BRIGHTNESS_LEVELS))
        groups[level].push(projected)
      }

      groups.forEach((group, level) => {
        if (group.length === 0) return
        const depth = (level + 0.5) / BRIGHTNESS_LEVELS
        context.fillStyle = `rgba(${colors.dots}, ${0.05 + depth * depth * 0.6})`
        context.beginPath()
        const dotRadius = (0.45 + depth * 1.25) * pixelRatio
        for (const dot of group) {
          context.moveTo(dot.x + dotRadius, dot.y)
          context.arc(dot.x, dot.y, dotRadius, 0, Math.PI * 2)
        }
        context.fill()
      })

      // Phnom Penh marker with a soft pulse, only when it faces us.
      const city = project(marker)
      if (city.depth > 0.5) {
        const pulse = prefersReducedMotion ? 0.4 : (time % 2400) / 2400
        context.strokeStyle = `rgba(${colors.marker}, ${(1 - pulse) * 0.7})`
        context.lineWidth = 1.5 * pixelRatio
        context.beginPath()
        context.arc(city.x, city.y, (3 + pulse * 10) * pixelRatio, 0, Math.PI * 2)
        context.stroke()
        context.fillStyle = `rgba(${colors.marker}, 0.95)`
        context.beginPath()
        context.arc(city.x, city.y, 2.6 * pixelRatio, 0, Math.PI * 2)
        context.fill()
      }

      if (!prefersReducedMotion && isVisible && !document.hidden) {
        frame = requestAnimationFrame(draw)
      }
    }

    function start() {
      cancelAnimationFrame(frame)
      lastTime = performance.now()
      frame = requestAnimationFrame(draw)
    }

    const handlePointerMove = (event) => {
      pointer.x = event.clientX / window.innerWidth - 0.5
      pointer.y = event.clientY / window.innerHeight - 0.5
    }

    const handleVisibilityChange = () => {
      if (!document.hidden && isVisible && !prefersReducedMotion) start()
    }

    const resizeObserver = new ResizeObserver(() => {
      resize()
      if (prefersReducedMotion) draw(lastTime)
    })
    resizeObserver.observe(canvas)

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting
      if (isVisible && !prefersReducedMotion) start()
    })
    visibilityObserver.observe(canvas)

    resize()
    if (prefersReducedMotion) {
      draw(0)
    } else {
      window.addEventListener('pointermove', handlePointerMove, { passive: true })
      document.addEventListener('visibilitychange', handleVisibilityChange)
      start()
    }

    return () => {
      cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      visibilityObserver.disconnect()
      window.removeEventListener('pointermove', handlePointerMove)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [prefersReducedMotion, resolvedTheme])

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />
}
