import { createContext, useCallback, useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'kev-portfolio:theme'
const THEME_MODES = ['dark', 'light', 'system']
const lightQuery = '(prefers-color-scheme: light)'

// eslint-disable-next-line react-refresh/only-export-components
export const ThemeContext = createContext(null)

function readSavedMode() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return THEME_MODES.includes(saved) ? saved : 'dark'
  } catch {
    return 'dark'
  }
}

function getSystemTheme() {
  return window.matchMedia(lightQuery).matches ? 'light' : 'dark'
}

/**
 * Provides the theme mode ("dark" | "light" | "system") and the resolved theme
 * ("dark" | "light") to the whole app. The resolved theme is written to
 * <html data-theme="..."> so CSS variables can switch.
 */
export function ThemeProvider({ children }) {
  const [mode, setModeState] = useState(readSavedMode)
  const [systemTheme, setSystemTheme] = useState(getSystemTheme)

  const resolvedTheme = mode === 'system' ? systemTheme : mode

  // Follow the operating system setting while in "system" mode.
  useEffect(() => {
    const media = window.matchMedia(lightQuery)
    const handleChange = () => setSystemTheme(media.matches ? 'light' : 'dark')
    media.addEventListener('change', handleChange)
    return () => media.removeEventListener('change', handleChange)
  }, [])

  // Apply the theme to <html>. A temporary class enables smooth colour transitions.
  useEffect(() => {
    const root = document.documentElement
    if (root.dataset.theme === resolvedTheme) return

    root.classList.add('theme-transition')
    root.dataset.theme = resolvedTheme
    const timer = window.setTimeout(() => root.classList.remove('theme-transition'), 400)
    return () => window.clearTimeout(timer)
  }, [resolvedTheme])

  // Keep the browser UI colour (mobile address bar) in sync.
  useEffect(() => {
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.setAttribute('content', resolvedTheme === 'light' ? '#f7f8fa' : '#07080a')
  }, [resolvedTheme])

  const setMode = useCallback((nextMode) => {
    if (!THEME_MODES.includes(nextMode)) return
    setModeState(nextMode)
    try {
      localStorage.setItem(STORAGE_KEY, nextMode)
    } catch {
      // Storage can be unavailable (private mode). The theme still works for this visit.
    }
  }, [])

  const value = useMemo(() => ({ mode, resolvedTheme, setMode }), [mode, resolvedTheme, setMode])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
