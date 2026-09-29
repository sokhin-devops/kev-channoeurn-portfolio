/** Fixed decorative background: one soft light at the top and a little film grain. */
export function AmbientBackground() {
  return (
    <div className="ambient" aria-hidden="true">
      <div className="ambient__glow" />
      <div className="ambient__noise" />
    </div>
  )
}
