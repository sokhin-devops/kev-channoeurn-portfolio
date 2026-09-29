import { LayoutDashboard, Package, RotateCcw, ShoppingCart } from 'lucide-react'
import { cx } from '../../utils/cx'

const views = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'products', label: 'Products', icon: Package },
]

export function DashboardSidebar({ activeView, onViewChange, onReset, productCount }) {
  return (
    <aside className="shop-sidebar">
      <div className="shop-sidebar__brand">
        <span className="shop-sidebar__logo" aria-hidden="true">
          <ShoppingCart size={16} />
        </span>
        <span>
          <span className="shop-sidebar__name">Mini Shop</span>
          <span className="shop-sidebar__caption">Dashboard</span>
        </span>
      </div>

      <nav className="shop-sidebar__nav" aria-label="Dashboard">
        {views.map(({ id, label, icon: ViewIcon }) => (
          <button
            key={id}
            type="button"
            className={cx('shop-sidebar__link', activeView === id && 'is-active')}
            aria-current={activeView === id ? 'page' : undefined}
            onClick={() => onViewChange(id)}
          >
            <ViewIcon size={17} aria-hidden="true" />
            <span>{label}</span>
            {id === 'products' && <span className="shop-sidebar__count">{productCount}</span>}
          </button>
        ))}
      </nav>

      <div className="shop-sidebar__footer">
        <p className="shop-sidebar__note">Sample data, saved in this browser only.</p>
        <button type="button" className="shop-btn shop-btn--ghost shop-btn--sm" onClick={onReset}>
          <RotateCcw size={14} aria-hidden="true" />
          Reset sample data
        </button>
      </div>
    </aside>
  )
}
