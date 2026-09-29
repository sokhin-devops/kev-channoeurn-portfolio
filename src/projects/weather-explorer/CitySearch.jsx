import { LoaderCircle, MapPin, Search } from 'lucide-react'
import { useId, useRef, useState } from 'react'
import { searchCities } from './weatherApi'

function formatPlace(city) {
  return [city.region, city.country].filter(Boolean).join(', ')
}

const QUICK_PICKS = ['Phnom Penh', 'Siem Reap', 'Kampot', 'Bangkok', 'Tokyo']

/**
 * Search form. Submitting looks up matching cities, then the user picks one.
 * Quick-pick buttons search and select the first match directly.
 */
export function CitySearch({ onSelectCity, showQuickPicks }) {
  const id = useId()
  const [query, setQuery] = useState('')
  const [search, setSearch] = useState({ status: 'idle', results: [], message: '' })
  const controllerRef = useRef(null)

  async function runSearch(name, { autoSelect = false } = {}) {
    const trimmed = name.trim()
    if (trimmed.length < 2) {
      setSearch({ status: 'error', results: [], message: 'Type at least 2 letters of a city name.' })
      return
    }

    controllerRef.current?.abort()
    const controller = new AbortController()
    controllerRef.current = controller
    setSearch({ status: 'loading', results: [], message: '' })

    try {
      const results = await searchCities(trimmed, controller.signal)
      if (results.length === 0) {
        setSearch({ status: 'empty', results: [], message: `No cities found for “${trimmed}”. Check the spelling and try again.` })
      } else if (autoSelect) {
        setSearch({ status: 'idle', results: [], message: '' })
        onSelectCity(results[0])
      } else {
        setSearch({ status: 'done', results, message: '' })
      }
    } catch {
      if (controller.signal.aborted) return
      setSearch({
        status: 'error',
        results: [],
        message: 'Could not search for cities. Check your internet connection and try again.',
      })
    }
  }

  function handleSubmit(event) {
    event.preventDefault()
    runSearch(query)
  }

  function chooseCity(city) {
    setSearch({ status: 'idle', results: [], message: '' })
    setQuery('')
    onSelectCity(city)
  }

  const isLoading = search.status === 'loading'

  return (
    <div className="wx-search">
      <form className="wx-search__form" role="search" onSubmit={handleSubmit}>
        <label htmlFor={`${id}-city`} className="sr-only">
          City name
        </label>
        <Search size={18} className="wx-search__icon" aria-hidden="true" />
        <input
          id={`${id}-city`}
          className="wx-search__input"
          type="search"
          placeholder="Search for a city…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          autoComplete="off"
          aria-describedby={search.message ? `${id}-message` : undefined}
        />
        <button type="submit" className="wx-btn wx-btn--primary" disabled={isLoading}>
          {isLoading ? <LoaderCircle size={16} className="wx-spin" aria-hidden="true" /> : null}
          {isLoading ? 'Searching…' : 'Search'}
        </button>
      </form>

      {showQuickPicks && search.status !== 'done' && (
        <div className="wx-quick">
          <span className="wx-quick__label">Try:</span>
          {QUICK_PICKS.map((name) => (
            <button
              key={name}
              type="button"
              className="wx-chip"
              disabled={isLoading}
              onClick={() => runSearch(name, { autoSelect: true })}
            >
              {name}
            </button>
          ))}
        </div>
      )}

      <div aria-live="polite">
        {search.message && (
          <p id={`${id}-message`} className={`wx-search__message wx-search__message--${search.status}`}>
            {search.message}
          </p>
        )}

        {search.status === 'done' && (
          <ul className="wx-results" aria-label="Matching cities">
            {search.results.map((city) => (
              <li key={city.id}>
                <button type="button" className="wx-results__item" onClick={() => chooseCity(city)}>
                  <MapPin size={16} aria-hidden="true" />
                  <span className="wx-results__text">
                    <span className="wx-results__name">{city.name}</span>
                    <span className="wx-results__place">{formatPlace(city)}</span>
                  </span>
                  {city.countryCode && <span className="wx-results__code">{city.countryCode}</span>}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
