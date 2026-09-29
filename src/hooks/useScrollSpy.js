import { useEffect, useState } from 'react'

/**
 * Returns the id of the section the reader is currently looking at,
 * used to highlight the active link in the navigation.
 *
 * - `preferredId` (the section from the URL, e.g. /education) wins while it is in view,
 *   because short sections near the bottom of the page can never reach the top.
 * - Otherwise the active section is the last one whose top has passed 35% of the screen.
 * - At the very bottom of the page, the last section is active.
 */
export function useScrollSpy(ids, { enabled = true, preferredId = null } = {}) {
  const [activeId, setActiveId] = useState(null)

  useEffect(() => {
    if (!enabled) return

    let frame = 0

    const update = () => {
      frame = 0
      const viewportHeight = window.innerHeight

      const preferred = preferredId && document.getElementById(preferredId)
      if (preferred) {
        const top = preferred.getBoundingClientRect().top
        if (top > -40 && top < viewportHeight * 0.6) {
          setActiveId(preferredId)
          return
        }
      }

      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
      if (atBottom) {
        setActiveId(ids[ids.length - 1])
        return
      }

      let current = ids[0]
      for (const id of ids) {
        const element = document.getElementById(id)
        if (element && element.getBoundingClientRect().top <= viewportHeight * 0.35) current = id
      }
      setActiveId(current)
    }

    // Run at most once per animation frame while scrolling.
    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update)
    }

    scheduleUpdate()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
    }
  }, [ids, enabled, preferredId])

  return enabled ? activeId : null
}
