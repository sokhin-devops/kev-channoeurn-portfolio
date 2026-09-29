import { CheckCircle2, CircleSlash, Clock, TriangleAlert, XCircle } from 'lucide-react'
import { getStockStatus, STOCK_STATUS_LABELS } from './shopUtils'

// Status colours always come with an icon and a text label, never colour alone.
const stockIcons = {
  'in-stock': CheckCircle2,
  'low-stock': TriangleAlert,
  'out-of-stock': CircleSlash,
}

export function StockBadge({ stock }) {
  const status = getStockStatus(stock)
  const StatusIcon = stockIcons[status]

  return (
    <span className={`shop-badge shop-badge--${status}`}>
      <StatusIcon size={13} aria-hidden="true" />
      {STOCK_STATUS_LABELS[status]}
    </span>
  )
}

const orderIcons = {
  Completed: CheckCircle2,
  Processing: Clock,
  Cancelled: XCircle,
}

export function OrderStatusBadge({ status }) {
  const StatusIcon = orderIcons[status] ?? Clock

  return (
    <span className={`shop-badge shop-badge--${status.toLowerCase()}`}>
      <StatusIcon size={13} aria-hidden="true" />
      {status}
    </span>
  )
}
