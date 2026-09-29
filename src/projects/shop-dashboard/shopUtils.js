import { sampleProducts } from './mockData'

export const STORAGE_KEY = 'kev-portfolio:mini-shop-products'
export const LOW_STOCK_LIMIT = 10

const currencyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
const compactCurrencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

export function formatCurrency(value) {
  return currencyFormatter.format(value)
}

export function formatCurrencyRounded(value) {
  return compactCurrencyFormatter.format(value)
}

/** "in-stock" | "low-stock" | "out-of-stock" */
export function getStockStatus(stock) {
  if (stock <= 0) return 'out-of-stock'
  if (stock <= LOW_STOCK_LIMIT) return 'low-stock'
  return 'in-stock'
}

export const STOCK_STATUS_LABELS = {
  'in-stock': 'In stock',
  'low-stock': 'Low stock',
  'out-of-stock': 'Out of stock',
}

/**
 * Orders store product ids. This adds names, prices, line totals and a real date,
 * using the original sample prices so past orders don't change when a product is edited.
 */
export function buildOrders(rawOrders, today = new Date()) {
  const productById = Object.fromEntries(sampleProducts.map((product) => [product.id, product]))

  return rawOrders.map((order) => {
    const date = new Date(today)
    date.setDate(date.getDate() - order.daysAgo)

    const items = order.items.map((item) => {
      const product = productById[item.productId]
      return { ...item, name: product.name, category: product.category, price: product.price, total: product.price * item.qty }
    })

    return {
      ...order,
      date,
      items,
      itemCount: items.reduce((sum, item) => sum + item.qty, 0),
      total: items.reduce((sum, item) => sum + item.total, 0),
    }
  })
}

/** Revenue per day for the last 7 days (oldest first). Cancelled orders are excluded. */
export function getDailySales(orders, today = new Date()) {
  const days = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(today)
    date.setDate(date.getDate() - (6 - index))
    return {
      key: date.toDateString(),
      label: index === 6 ? 'Today' : date.toLocaleDateString('en-US', { weekday: 'short' }),
      fullLabel: date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }),
      revenue: 0,
      orders: 0,
    }
  })

  const dayByKey = Object.fromEntries(days.map((day) => [day.key, day]))

  orders
    .filter((order) => order.status !== 'Cancelled')
    .forEach((order) => {
      const day = dayByKey[order.date.toDateString()]
      if (day) {
        day.revenue += order.total
        day.orders += 1
      }
    })

  return days
}

/** Revenue per category from completed and processing orders. */
export function getCategorySales(orders, categories) {
  const totals = Object.fromEntries(categories.map((category) => [category, 0]))

  orders
    .filter((order) => order.status !== 'Cancelled')
    .forEach((order) => {
      order.items.forEach((item) => {
        if (item.category in totals) totals[item.category] += item.total
      })
    })

  return categories.map((category) => ({ category, revenue: totals[category] }))
}

export function getUnitsSold(orders, productId) {
  return orders
    .filter((order) => order.status !== 'Cancelled')
    .flatMap((order) => order.items)
    .filter((item) => item.productId === productId)
    .reduce((sum, item) => sum + item.qty, 0)
}

export function createProductId() {
  if (window.crypto?.randomUUID) return window.crypto.randomUUID()
  return `p-${Date.now().toString(36)}`
}

// ---------- Product filters ----------

export const STOCK_FILTERS = [
  { value: 'all', label: 'All stock' },
  { value: 'in-stock', label: 'In stock' },
  { value: 'attention', label: 'Low or out of stock' },
  { value: 'out-of-stock', label: 'Out of stock' },
]

export function filterProducts(products, { query, category, stock }) {
  const search = query.trim().toLowerCase()

  return products.filter((product) => {
    const status = getStockStatus(product.stock)
    if (category !== 'all' && product.category !== category) return false
    if (stock === 'attention' && status === 'in-stock') return false
    if (stock !== 'all' && stock !== 'attention' && status !== stock) return false
    if (search && !`${product.name} ${product.sku}`.toLowerCase().includes(search)) return false
    return true
  })
}
