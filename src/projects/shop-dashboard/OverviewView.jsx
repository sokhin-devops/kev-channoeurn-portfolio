import { ArrowRight, CircleSlash, CheckCircle2, DollarSign, Package, ShoppingBag, TriangleAlert } from 'lucide-react'
import { OrderStatusBadge } from './StatusBadge'
import { SalesChart } from './SalesChart'
import { CATEGORIES } from './mockData'
import { formatCurrency, getCategorySales, getDailySales, getStockStatus } from './shopUtils'

function SummaryCard({ icon: CardIcon, label, value, detail, onClick, tone }) {
  const content = (
    <>
      <span className="shop-summary__top">
        <span className="shop-summary__label">{label}</span>
        <span className={`shop-summary__icon${tone ? ` shop-summary__icon--${tone}` : ''}`} aria-hidden="true">
          <CardIcon size={16} />
        </span>
      </span>
      <span className="shop-summary__value">{value}</span>
      <span className="shop-summary__detail">
        {detail}
        {onClick && <ArrowRight size={13} aria-hidden="true" />}
      </span>
    </>
  )

  if (onClick) {
    return (
      <button type="button" className="shop-card shop-summary shop-summary--button" onClick={onClick}>
        {content}
      </button>
    )
  }
  return <div className="shop-card shop-summary">{content}</div>
}

export function OverviewView({ products, orders, today, onShowLowStock }) {
  const dailySales = getDailySales(orders, today)
  const categorySales = getCategorySales(orders, CATEGORIES)
  const validOrders = orders.filter((order) => order.status !== 'Cancelled')
  const revenue = validOrders.reduce((sum, order) => sum + order.total, 0)
  const processingCount = orders.filter((order) => order.status === 'Processing').length

  const stockCounts = { 'in-stock': 0, 'low-stock': 0, 'out-of-stock': 0 }
  products.forEach((product) => {
    stockCounts[getStockStatus(product.stock)] += 1
  })
  const needsAttention = stockCounts['low-stock'] + stockCounts['out-of-stock']
  const categoryCount = new Set(products.map((product) => product.category)).size
  const maxCategoryRevenue = Math.max(...categorySales.map((item) => item.revenue), 1)

  const stockSegments = [
    { key: 'in-stock', label: 'In stock', icon: CheckCircle2, count: stockCounts['in-stock'] },
    { key: 'low-stock', label: 'Low stock', icon: TriangleAlert, count: stockCounts['low-stock'] },
    { key: 'out-of-stock', label: 'Out of stock', icon: CircleSlash, count: stockCounts['out-of-stock'] },
  ]

  const recentOrders = [...orders].sort((a, b) => a.daysAgo - b.daysAgo || b.id.localeCompare(a.id)).slice(0, 6)

  return (
    <div className="shop-view">
      <header className="shop-view__header">
        <div>
          <h2 className="shop-view__title">Overview</h2>
          <p className="shop-view__subtitle">Store performance for the last 7 days</p>
        </div>
        <span className="shop-chip">Sample data</span>
      </header>

      <section className="shop-summary-grid" aria-label="Summary">
        <SummaryCard icon={Package} label="Products" value={products.length} detail={`${categoryCount} categories`} />
        <SummaryCard
          icon={ShoppingBag}
          label="Orders"
          value={orders.length}
          detail={`${processingCount} processing`}
        />
        <SummaryCard icon={DollarSign} label="Revenue" value={formatCurrency(revenue)} detail="Excludes cancelled orders" />
        <SummaryCard
          icon={TriangleAlert}
          tone="warning"
          label="Low stock"
          value={needsAttention}
          detail="View products"
          onClick={onShowLowStock}
        />
      </section>

      <div className="shop-overview-grid">
        <section className="shop-card shop-panel shop-panel--chart" aria-labelledby="shop-sales-title">
          <header className="shop-panel__header">
            <h3 id="shop-sales-title" className="shop-panel__title">
              Sales, last 7 days
            </h3>
            <p className="shop-panel__meta">Daily revenue in USD</p>
          </header>
          <SalesChart days={dailySales} />
        </section>

        <section className="shop-card shop-panel" aria-labelledby="shop-stock-title">
          <header className="shop-panel__header">
            <h3 id="shop-stock-title" className="shop-panel__title">
              Stock status
            </h3>
            <p className="shop-panel__meta">{products.length} products</p>
          </header>

          <div className="shop-stock-bar" aria-hidden="true">
            {stockSegments
              .filter((segment) => segment.count > 0)
              .map((segment) => (
                <span
                  key={segment.key}
                  className={`shop-stock-bar__segment shop-stock-bar__segment--${segment.key}`}
                  style={{ flexGrow: segment.count }}
                />
              ))}
          </div>

          <ul className="shop-legend">
            {stockSegments.map(({ key, label, icon: SegmentIcon, count }) => (
              <li key={key} className={`shop-legend__item shop-legend__item--${key}`}>
                <SegmentIcon size={14} aria-hidden="true" />
                <span>{label}</span>
                <strong>{count}</strong>
              </li>
            ))}
          </ul>

          <h4 className="shop-panel__subtitle">Revenue by category</h4>
          <ul className="shop-hbars">
            {categorySales.map((item) => (
              <li key={item.category} className="shop-hbars__row">
                <span className="shop-hbars__label">{item.category}</span>
                <span className="shop-hbars__track" aria-hidden="true">
                  <span style={{ width: `${(item.revenue / maxCategoryRevenue) * 100}%` }} />
                </span>
                <span className="shop-hbars__value">{formatCurrency(item.revenue)}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="shop-card shop-panel" aria-labelledby="shop-orders-title">
        <header className="shop-panel__header">
          <h3 id="shop-orders-title" className="shop-panel__title">
            Recent orders
          </h3>
          <p className="shop-panel__meta">Latest {recentOrders.length}</p>
        </header>
        <div className="shop-table-wrap">
          <table className="shop-table shop-table--responsive">
            <thead>
              <tr>
                <th scope="col">Order</th>
                <th scope="col">Customer</th>
                <th scope="col">Date</th>
                <th scope="col" className="is-numeric">
                  Items
                </th>
                <th scope="col" className="is-numeric">
                  Total
                </th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td data-label="Order" className="shop-table__strong">
                    {order.id}
                  </td>
                  <td data-label="Customer">{order.customer}</td>
                  <td data-label="Date">
                    {order.daysAgo === 0
                      ? 'Today'
                      : order.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </td>
                  <td data-label="Items" className="is-numeric">
                    {order.itemCount}
                  </td>
                  <td data-label="Total" className="is-numeric">
                    {formatCurrency(order.total)}
                  </td>
                  <td data-label="Status">
                    <OrderStatusBadge status={order.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
