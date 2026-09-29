/**
 * Open-Meteo API (https://open-meteo.com). Free for non-commercial use, no API key needed.
 * Weather data is licensed under CC BY 4.0, so the app shows an attribution link.
 */

const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1/search'
const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast'

async function fetchJson(url, signal) {
  const response = await fetch(url, { signal })
  if (!response.ok) {
    throw new Error(`The weather service responded with status ${response.status}.`)
  }
  return response.json()
}

/** Finds cities that match a name. Returns an empty array when nothing matches. */
export async function searchCities(name, signal) {
  const params = new URLSearchParams({ name, count: '6', language: 'en', format: 'json' })
  const data = await fetchJson(`${GEOCODING_URL}?${params}`, signal)

  return (data.results ?? []).map((result) => ({
    id: result.id,
    name: result.name,
    region: result.admin1 ?? '',
    country: result.country ?? '',
    countryCode: result.country_code ?? '',
    latitude: result.latitude,
    longitude: result.longitude,
  }))
}

/** Current conditions and a 5-day daily forecast, in the city's local time zone. */
export async function getForecast(city, signal) {
  const params = new URLSearchParams({
    latitude: String(city.latitude),
    longitude: String(city.longitude),
    current: 'temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,is_day',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max',
    timezone: 'auto',
    forecast_days: '5',
  })
  const data = await fetchJson(`${FORECAST_URL}?${params}`, signal)
  const { current, daily } = data

  return {
    current: {
      time: current.time,
      temperature: current.temperature_2m,
      feelsLike: current.apparent_temperature,
      humidity: current.relative_humidity_2m,
      windSpeed: current.wind_speed_10m,
      code: current.weather_code,
      isDay: current.is_day === 1,
    },
    daily: daily.time.map((date, index) => ({
      date,
      code: daily.weather_code[index],
      max: daily.temperature_2m_max[index],
      min: daily.temperature_2m_min[index],
      rainChance: daily.precipitation_probability_max?.[index] ?? null,
    })),
    timezone: data.timezone_abbreviation ?? data.timezone,
  }
}
