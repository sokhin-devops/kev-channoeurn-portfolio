import { Umbrella } from 'lucide-react'
import { getWeatherInfo } from './weatherCodes'

function formatDay(dateString, index) {
  if (index === 0) return 'Today'
  const [year, month, day] = dateString.split('-').map(Number)
  return new Date(year, month - 1, day).toLocaleDateString('en-US', { weekday: 'short' })
}

function formatDate(dateString) {
  const [year, month, day] = dateString.split('-').map(Number)
  return new Date(year, month - 1, day).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

/** 5-day forecast with a temperature range bar for each day. */
export function ForecastList({ days }) {
  const lowest = Math.min(...days.map((day) => day.min))
  const highest = Math.max(...days.map((day) => day.max))
  const span = Math.max(highest - lowest, 1)

  return (
    <section className="wx-card wx-forecast" aria-labelledby="wx-forecast-title">
      <h3 id="wx-forecast-title" className="wx-forecast__title">
        5-day forecast
      </h3>
      <ol className="wx-forecast__list">
        {days.map((day, index) => {
          const weather = getWeatherInfo(day.code, true)
          const DayIcon = weather.icon
          const start = ((day.min - lowest) / span) * 100
          const width = ((day.max - day.min) / span) * 100

          return (
            <li key={day.date} className="wx-day">
              <span className="wx-day__name">
                {formatDay(day.date, index)}
                <span className="wx-day__date">{formatDate(day.date)}</span>
              </span>
              <span className="wx-day__condition">
                <DayIcon size={20} strokeWidth={1.75} aria-hidden="true" />
                <span className="wx-day__label" title={weather.label}>
                  {weather.label}
                </span>
              </span>
              <span className="wx-day__rain" title="Chance of rain">
                <Umbrella size={12} aria-hidden="true" />
                <span className="sr-only">Chance of rain </span>
                {day.rainChance === null ? '—' : `${day.rainChance}%`}
              </span>
              <span className="wx-day__temps">
                <span className="wx-day__min">
                  <span className="sr-only">Low </span>
                  {Math.round(day.min)}°
                </span>
                <span className="wx-day__bar" aria-hidden="true">
                  <span style={{ left: `${start}%`, width: `${Math.max(width, 4)}%` }} />
                </span>
                <span className="wx-day__max">
                  <span className="sr-only">High </span>
                  {Math.round(day.max)}°
                </span>
              </span>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
