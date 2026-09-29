/**
 * Fixed decorative background: soft gradient orbs, a faint grid and film grain.
 * Purely visual, so it is hidden from assistive technology.
 */
export function AmbientBackground() {
  return (
    <div className="ambient" aria-hidden="true">
      <div className="ambient__orb ambient__orb--one" />
      <div className="ambient__orb ambient__orb--two" />
      <div className="ambient__orb ambient__orb--three" />
      <div className="ambient__grid" />
      <div className="ambient__noise" />
    </div>
  )
}
