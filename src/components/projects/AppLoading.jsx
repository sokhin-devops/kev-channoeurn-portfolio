/** Placeholder shown while a demo app's code is loading. */
export function AppLoading({ label = 'Loading project…' }) {
  return (
    <div className="app-loading" role="status">
      <span className="app-loading__spinner" aria-hidden="true" />
      <span>{label}</span>
    </div>
  )
}
