import { CloudOff, CloudSun, RotateCcw } from 'lucide-react'

export function WeatherEmptyState() {
  return (
    <div className="wx-card wx-state">
      <span className="wx-state__icon" aria-hidden="true">
        <CloudSun size={28} strokeWidth={1.6} />
      </span>
      <h3 className="wx-state__title">Where are you heading?</h3>
      <p className="wx-state__text">
        Search for a city to see the current weather, a 5-day forecast and a short travel note. Save cities you check
        often as favorites.
      </p>
    </div>
  )
}

export function WeatherLoadingState() {
  return (
    <div className="wx-loading" role="status" aria-label="Loading weather">
      <div className="wx-card wx-skeleton-card">
        <span className="wx-skeleton" style={{ width: '40%', height: 22 }} />
        <span className="wx-skeleton" style={{ width: '25%' }} />
        <span className="wx-skeleton" style={{ width: '55%', height: 56, marginTop: 12 }} />
        <span className="wx-skeleton" style={{ width: '100%', height: 64, marginTop: 8 }} />
      </div>
      <div className="wx-card wx-skeleton-card">
        {[0, 1, 2, 3, 4].map((row) => (
          <span key={row} className="wx-skeleton" style={{ width: '100%', height: 30 }} />
        ))}
      </div>
    </div>
  )
}

export function WeatherErrorState({ message, onRetry }) {
  return (
    <div className="wx-card wx-state wx-state--error" role="alert">
      <span className="wx-state__icon" aria-hidden="true">
        <CloudOff size={26} strokeWidth={1.6} />
      </span>
      <h3 className="wx-state__title">Weather data is unavailable</h3>
      <p className="wx-state__text">{message}</p>
      <button type="button" className="wx-btn wx-btn--ghost" onClick={onRetry}>
        <RotateCcw size={15} aria-hidden="true" />
        Try again
      </button>
    </div>
  )
}
