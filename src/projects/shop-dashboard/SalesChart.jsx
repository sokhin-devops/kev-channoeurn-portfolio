import { useState } from 'react'
import { formatCurrency, formatCurrencyRounded } from './shopUtils'

/** Picks a "nice" axis maximum and step, e.g. 0 / 50 / 100 / 150 / 200. */
function getNiceScale(maxValue, tickCount = 4) {
  if (maxValue <= 0) return { max: 100, step: 25 }
  const roughStep = maxValue / tickCount
  const magnitude = 10 ** Math.floor(Math.log10(roughStep))
  const step = [1, 2, 2.5, 5, 10].map((factor) => factor * magnitude).find((value) => value >= roughStep)
  return { max: Math.ceil(maxValue / step) * step, step }
}

/**
 * Simple column chart built with HTML and CSS.
 * Hover or focus a column to see its value; the table below shows every value too.
 */
export function SalesChart({ days }) {
  const [activeIndex, setActiveIndex] = useState(null)

  const highest = Math.max(...days.map((day) => day.revenue))
  const { max, step } = getNiceScale(highest)
  const ticks = Array.from({ length: Math.round(max / step) + 1 }, (_, index) => index * step)
  const highestIndex = days.findIndex((day) => day.revenue === highest)
  const activeDay = activeIndex === null ? null : days[activeIndex]

  return (
    <figure className="shop-chart">
      <div className="shop-chart__plot" onMouseLeave={() => setActiveIndex(null)}>
        <div className="shop-chart__grid" aria-hidden="true">
          {ticks.map((tick) => (
            <div key={tick} className="shop-chart__gridline" style={{ bottom: `${(tick / max) * 100}%` }}>
              <span className="shop-chart__tick">{formatCurrencyRounded(tick)}</span>
            </div>
          ))}
        </div>

        <ol className="shop-chart__columns">
          {days.map((day, index) => {
            const height = (day.revenue / max) * 100
            return (
              <li key={day.key} className="shop-chart__column">
                <button
                  type="button"
                  className="shop-chart__hit"
                  aria-label={`${day.fullLabel}: ${formatCurrency(day.revenue)} from ${day.orders} ${day.orders === 1 ? 'order' : 'orders'}`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  onBlur={() => setActiveIndex(null)}
                >
                  <span
                    className={`shop-chart__bar${activeIndex === index ? ' is-active' : ''}`}
                    style={{ height: `${height}%` }}
                  >
                    {/* Label only the highest day; the tooltip and table carry the rest. */}
                    {index === highestIndex && (
                      <span className="shop-chart__value" aria-hidden="true">
                        {formatCurrencyRounded(day.revenue)}
                      </span>
                    )}
                  </span>
                </button>
                <span className="shop-chart__label" aria-hidden="true">
                  {day.label}
                </span>
              </li>
            )
          })}
        </ol>

        {activeDay && (
          <div
            className="shop-chart__tooltip"
            style={{ '--x': `${((activeIndex + 0.5) / days.length) * 100}%` }}
            aria-hidden="true"
          >
            <strong>{formatCurrency(activeDay.revenue)}</strong>
            <span>
              {activeDay.fullLabel} · {activeDay.orders} {activeDay.orders === 1 ? 'order' : 'orders'}
            </span>
          </div>
        )}
      </div>

      <details className="shop-chart__table">
        <summary>View as table</summary>
        <table className="shop-table shop-table--compact">
          <thead>
            <tr>
              <th scope="col">Day</th>
              <th scope="col" className="is-numeric">
                Orders
              </th>
              <th scope="col" className="is-numeric">
                Revenue
              </th>
            </tr>
          </thead>
          <tbody>
            {days.map((day) => (
              <tr key={day.key}>
                <td>{day.fullLabel}</td>
                <td className="is-numeric">{day.orders}</td>
                <td className="is-numeric">{formatCurrency(day.revenue)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </figure>
  )
}
