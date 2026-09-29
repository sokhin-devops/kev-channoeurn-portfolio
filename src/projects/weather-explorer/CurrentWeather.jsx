import { Compass, Droplets, MapPin, Star, Thermometer, Umbrella, Wind } from 'lucide-react'
import { getTravelNote, getWeatherInfo } from './weatherCodes'

const round = (value) => Math.round(value)

export function CurrentWeather({ city, forecast, isFavorite, onToggleFavorite }) {
  const { current, daily, timezone } = forecast
  const today = daily[0]
  const weather = getWeatherInfo(current.code, current.isDay)
  const WeatherIcon = weather.icon
  const updatedAt = current.time.split('T')[1]
  const place = [city.region, city.country].filter(Boolean).join(', ')

  const stats = [
    { label: 'Humidity', value: `${round(current.humidity)}%`, icon: Droplets },
    { label: 'Wind speed', value: `${round(current.windSpeed)} km/h`, icon: Wind },
    { label: 'Feels like', value: `${round(current.feelsLike)}°C`, icon: Thermometer },
    { label: 'Chance of rain', value: today.rainChance === null ? '—' : `${today.rainChance}%`, icon: Umbrella },
  ]

  return (
    <section className="wx-card wx-current" aria-labelledby="wx-city-name">
      <header className="wx-current__header">
        <div>
          <h3 id="wx-city-name" className="wx-current__city">
            {city.name}
          </h3>
          <p className="wx-current__place">
            <MapPin size={13} aria-hidden="true" />
            {place || 'Location'}
          </p>
        </div>
        <button
          type="button"
          className={`wx-fav-btn${isFavorite ? ' is-active' : ''}`}
          onClick={onToggleFavorite}
          aria-pressed={isFavorite}
        >
          <Star size={15} aria-hidden="true" />
          {isFavorite ? 'Saved' : 'Save'}
        </button>
      </header>

      <div className="wx-current__main">
        <WeatherIcon size={64} strokeWidth={1.4} className="wx-current__icon" aria-hidden="true" />
        <div>
          <p className="wx-current__temp">
            {round(current.temperature)}
            <span className="wx-current__unit">°C</span>
          </p>
          <p className="wx-current__condition">{weather.label}</p>
          <p className="wx-current__range">
            H {round(today.max)}° · L {round(today.min)}°
          </p>
        </div>
      </div>

      <dl className="wx-stats">
        {stats.map(({ label, value, icon: StatIcon }) => (
          <div key={label} className="wx-stat">
            <dt>
              <StatIcon size={14} aria-hidden="true" />
              {label}
            </dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>

      <p className="wx-note">
        <Compass size={16} aria-hidden="true" />
        <span>
          <strong>Travel note: </strong>
          {getTravelNote(current, today.rainChance)}
        </span>
      </p>

      <p className="wx-current__updated">
        Updated {updatedAt} local time{timezone ? ` (${timezone})` : ''}
      </p>
    </section>
  )
}
