import { Monitor, Moon, Sun } from 'lucide-react'
import { useId } from 'react'
import { useTheme } from '../../hooks/useTheme'
import { cx } from '../../utils/cx'

const options = [
  { value: 'dark', label: 'Dark', icon: Moon },
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'system', label: 'System', icon: Monitor },
]

/**
 * Segmented Dark / Light / System control built on native radio inputs,
 * so arrow keys and screen readers work without extra code.
 * `showLabels` displays the text next to each icon (used in the mobile menu).
 */
export function ThemeSwitcher({ showLabels = false, className }) {
  const { mode, setMode } = useTheme()
  const name = useId()

  return (
    <fieldset className={cx('theme-switcher', showLabels && 'theme-switcher--labels', className)}>
      <legend className="sr-only">Color theme</legend>
      {options.map(({ value, label, icon: OptionIcon }) => (
        <label key={value} className={cx('theme-switcher__option', mode === value && 'is-active')} title={`${label} theme`}>
          <input
            type="radio"
            name={name}
            value={value}
            checked={mode === value}
            onChange={() => setMode(value)}
            className="sr-only"
          />
          <OptionIcon size={15} aria-hidden="true" />
          <span className={showLabels ? undefined : 'sr-only'}>{label}</span>
        </label>
      ))}
    </fieldset>
  )
}
