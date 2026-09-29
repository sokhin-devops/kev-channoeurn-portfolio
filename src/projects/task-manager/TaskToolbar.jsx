import { Search, X } from 'lucide-react'
import { useId } from 'react'
import { cx } from '../../utils/cx'
import { PRIORITIES, STATUS_FILTERS } from './taskUtils'

/** Search box, status tabs (All / Active / Completed) and priority filter. */
export function TaskToolbar({ query, onQueryChange, status, onStatusChange, priority, onPriorityChange, counts }) {
  const id = useId()

  return (
    <div className="tm-toolbar">
      <div className="tm-search">
        <Search size={16} aria-hidden="true" className="tm-search__icon" />
        <label htmlFor={`${id}-search`} className="sr-only">
          Search tasks
        </label>
        <input
          id={`${id}-search`}
          className="tm-input tm-search__input"
          type="search"
          placeholder="Search tasks…"
          value={query}
          autoComplete="off"
          onChange={(event) => onQueryChange(event.target.value)}
        />
        {query && (
          <button type="button" className="tm-search__clear" onClick={() => onQueryChange('')} aria-label="Clear search">
            <X size={14} aria-hidden="true" />
          </button>
        )}
      </div>

      <div className="tm-toolbar__filters">
        <div className="tm-tabs" role="group" aria-label="Filter by status">
          {STATUS_FILTERS.map((option) => (
            <button
              key={option.value}
              type="button"
              className={cx('tm-tab', status === option.value && 'is-active')}
              aria-pressed={status === option.value}
              onClick={() => onStatusChange(option.value)}
            >
              {option.label}
              <span className="tm-tab__count">{counts[option.value]}</span>
            </button>
          ))}
        </div>

        <label className="sr-only" htmlFor={`${id}-priority`}>
          Filter by priority
        </label>
        <select
          id={`${id}-priority`}
          className="tm-input tm-select tm-select--compact"
          value={priority}
          onChange={(event) => onPriorityChange(event.target.value)}
        >
          <option value="all">All priorities</option>
          {PRIORITIES.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label} priority
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
