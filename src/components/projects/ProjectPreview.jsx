import {
  Box,
  Check,
  Cloud,
  CloudLightning,
  CloudRain,
  CloudSun,
  LayoutDashboard,
  Package,
  Plus,
  Search,
  ShoppingCart,
  Star,
  Sun,
} from 'lucide-react'

/*
 * Lightweight illustrations of each project's interface, used on project cards.
 * They are drawn with HTML/CSS (no screenshots) so they follow the current theme.
 * The real, interactive apps are shown on each project's detail page.
 */

const sampleTasks = [
  { title: 'Group presentation slides', priority: 'high', due: 'Today' },
  { title: 'Database assignment', priority: 'high', due: 'Tomorrow' },
  { title: 'Read chapter 4', priority: 'medium', due: 'In 3 days' },
  { title: 'Submit lab report', priority: 'low', due: 'Done', done: true },
]

function TaskManagerPreview() {
  return (
    <div className="pv pv--tasks">
      <div className="pv-window">
        <div className="pv-tasks__header">
          <span className="pv-strong">My tasks</span>
          <span className="pv-muted">1 of 4 done</span>
        </div>
        <div className="pv-progress">
          <span style={{ width: '25%' }} />
        </div>
        <div className="pv-tasks__input">
          <span className="pv-muted">Add a new task…</span>
          <span className="pv-pill pv-pill--accent">
            <Plus size={11} /> Add
          </span>
        </div>
        <ul className="pv-tasks__list">
          {sampleTasks.map((task) => (
            <li key={task.title} className={task.done ? 'is-done' : undefined}>
              <span className="pv-check">{task.done && <Check size={10} strokeWidth={3} />}</span>
              <span className="pv-tasks__title">{task.title}</span>
              <span className={`pv-dot pv-dot--${task.priority}`} />
              <span className="pv-tasks__due">{task.due}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

const chartBars = [42, 64, 50, 78, 58, 88, 70]

function ShopDashboardPreview() {
  return (
    <div className="pv pv--shop">
      <div className="pv-window pv-shop">
        <div className="pv-shop__sidebar">
          <span className="pv-shop__logo">
            <ShoppingCart size={12} />
          </span>
          <span className="is-active">
            <LayoutDashboard size={12} />
          </span>
          <span>
            <Package size={12} />
          </span>
          <span>
            <Box size={12} />
          </span>
        </div>
        <div className="pv-shop__main">
          <div className="pv-shop__tiles">
            {['Products', 'Orders', 'Revenue', 'Low stock'].map((label) => (
              <div key={label} className="pv-shop__tile">
                <span className="pv-muted">{label}</span>
                <span className="pv-skeleton pv-skeleton--value" />
              </div>
            ))}
          </div>
          <div className="pv-shop__chart">
            <span className="pv-muted">Sales · last 7 days</span>
            <div className="pv-shop__bars">
              {chartBars.map((height, index) => (
                <span key={index} style={{ height: `${height}%` }} />
              ))}
            </div>
          </div>
          <div className="pv-shop__table">
            {[0, 1, 2].map((row) => (
              <div key={row} className="pv-shop__row">
                <span className="pv-skeleton" style={{ width: '38%' }} />
                <span className="pv-skeleton" style={{ width: '16%' }} />
                <span className={`pv-pill pv-pill--${row === 1 ? 'warning' : 'success'}`}>
                  {row === 1 ? 'Low' : 'In stock'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const forecastIcons = [Sun, CloudRain, CloudSun, Cloud, CloudLightning]

function WeatherExplorerPreview() {
  return (
    <div className="pv pv--weather">
      <div className="pv-window pv-weather">
        <div className="pv-weather__search">
          <Search size={12} />
          <span className="pv-muted">Search a city…</span>
        </div>
        <div className="pv-weather__current">
          <CloudSun size={44} strokeWidth={1.5} className="pv-weather__icon" />
          <div className="pv-weather__lines">
            <span className="pv-skeleton pv-skeleton--title" />
            <span className="pv-skeleton" style={{ width: '70%' }} />
            <span className="pv-skeleton" style={{ width: '50%' }} />
          </div>
          <Star size={14} className="pv-weather__star" />
        </div>
        <div className="pv-weather__forecast">
          {forecastIcons.map((ForecastIcon, index) => (
            <div key={index} className="pv-weather__day">
              <span className="pv-skeleton" style={{ width: '60%' }} />
              <ForecastIcon size={16} strokeWidth={1.75} />
              <span className="pv-skeleton" style={{ width: '80%' }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const previews = {
  'student-task-manager': TaskManagerPreview,
  'mini-shop-dashboard': ShopDashboardPreview,
  'weather-explorer': WeatherExplorerPreview,
}

export function ProjectPreview({ slug, name }) {
  const Preview = previews[slug]
  if (!Preview) return null

  return (
    <div className="project-preview" role="img" aria-label={`Illustration of the ${name} interface`}>
      <Preview />
    </div>
  )
}
