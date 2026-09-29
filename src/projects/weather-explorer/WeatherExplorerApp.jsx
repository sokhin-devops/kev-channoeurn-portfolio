import { CloudSun } from 'lucide-react'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { CitySearch } from './CitySearch'
import { CurrentWeather } from './CurrentWeather'
import { FavoriteCities } from './FavoriteCities'
import { ForecastList } from './ForecastList'
import { useForecast } from './useForecast'
import { getWeatherInfo } from './weatherCodes'
import { WeatherEmptyState, WeatherErrorState, WeatherLoadingState } from './WeatherStates'
import './weather-explorer.css'

const FAVORITES_KEY = 'kev-portfolio:weather-favorites'
const LAST_CITY_KEY = 'kev-portfolio:weather-last-city'
const MAX_FAVORITES = 8

export default function WeatherExplorerApp() {
  const [selectedCity, setSelectedCity] = useLocalStorage(LAST_CITY_KEY, null)
  const [favorites, setFavorites] = useLocalStorage(FAVORITES_KEY, [])
  const forecast = useForecast(selectedCity)

  const isFavorite = favorites.some((city) => city.id === selectedCity?.id)

  // The background mood follows the current weather (clear, cloudy, rain, ...).
  const weather = forecast.data ? getWeatherInfo(forecast.data.current.code, forecast.data.current.isDay) : null
  const mood = weather?.mood ?? 'default'
  const timeOfDay = forecast.data && !forecast.data.current.isDay ? 'night' : 'day'

  function toggleFavorite() {
    if (!selectedCity) return
    setFavorites((current) =>
      isFavorite
        ? current.filter((city) => city.id !== selectedCity.id)
        : [selectedCity, ...current].slice(0, MAX_FAVORITES),
    )
  }

  function removeFavorite(cityId) {
    setFavorites((current) => current.filter((city) => city.id !== cityId))
  }

  return (
    <div className="wx" data-accent="cyan" data-weather={mood} data-time={timeOfDay}>
      <div className="wx__sky" aria-hidden="true" />
      <div className="wx__effects" aria-hidden="true" />

      <div className="wx__inner">
        <header className="wx__header">
          <span className="wx__logo" aria-hidden="true">
            <CloudSun size={18} />
          </span>
          <div>
            <h2 className="wx__title">Weather &amp; Travel Explorer</h2>
            <p className="wx__subtitle">Current weather and 5-day forecasts for any city</p>
          </div>
        </header>

        <CitySearch onSelectCity={setSelectedCity} showQuickPicks={!selectedCity} />

        <FavoriteCities
          favorites={favorites}
          selectedCity={selectedCity}
          onSelect={setSelectedCity}
          onRemove={removeFavorite}
        />

        <div className="wx__content">
          {forecast.status === 'idle' && <WeatherEmptyState />}
          {forecast.status === 'loading' && <WeatherLoadingState />}
          {forecast.status === 'error' && <WeatherErrorState message={forecast.error} onRetry={forecast.retry} />}
          {forecast.status === 'success' && (
            <div className="wx__grid">
              <CurrentWeather
                city={selectedCity}
                forecast={forecast.data}
                isFavorite={isFavorite}
                onToggleFavorite={toggleFavorite}
              />
              <ForecastList days={forecast.data.daily} />
            </div>
          )}
        </div>

        <p className="wx__credit">
          Weather data by{' '}
          <a href="https://open-meteo.com/" target="_blank" rel="noreferrer">
            Open-Meteo.com
          </a>{' '}
          (CC BY 4.0)
        </p>
      </div>
    </div>
  )
}
