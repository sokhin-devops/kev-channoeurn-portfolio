import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme'

/** One button that switches between dark and light. */
export function ThemeToggle() {
  const { resolvedTheme, setMode } = useTheme()
  const nextTheme = resolvedTheme === 'dark' ? 'light' : 'dark'

  return (
    <button
      type="button"
      className="icon-btn"
      onClick={() => setMode(nextTheme)}
      aria-label={`Switch to ${nextTheme} mode`}
      title={`Switch to ${nextTheme} mode`}
    >
      {resolvedTheme === 'dark' ? <Sun size={16} aria-hidden="true" /> : <Moon size={16} aria-hidden="true" />}
    </button>
  )
}
