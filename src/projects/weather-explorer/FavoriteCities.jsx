import { Star, X } from 'lucide-react'
import { cx } from '../../utils/cx'

export function FavoriteCities({ favorites, selectedCity, onSelect, onRemove }) {
  if (favorites.length === 0) return null

  return (
    <section className="wx-favorites" aria-label="Favorite cities">
      <h3 className="wx-favorites__title">
        <Star size={14} aria-hidden="true" />
        Favorites
      </h3>
      <ul className="wx-favorites__list">
        {favorites.map((city) => {
          const isSelected = selectedCity?.id === city.id
          return (
            <li key={city.id} className={cx('wx-favorite', isSelected && 'is-selected')}>
              <button
                type="button"
                className="wx-favorite__select"
                onClick={() => onSelect(city)}
                aria-current={isSelected ? 'true' : undefined}
              >
                {city.name}
                {city.countryCode && <span className="wx-favorite__code">{city.countryCode}</span>}
              </button>
              <button
                type="button"
                className="wx-favorite__remove"
                onClick={() => onRemove(city.id)}
                aria-label={`Remove ${city.name} from favorites`}
              >
                <X size={13} aria-hidden="true" />
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
