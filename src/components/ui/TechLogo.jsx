import { techIcons } from '../../data/techIcons'

/** A brand logo drawn in the current text colour (24×24 Simple Icons shape). */
export function TechLogo({ name, size = 18 }) {
  const icon = techIcons[name]
  if (!icon) return null

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <path d={icon.path} />
    </svg>
  )
}
