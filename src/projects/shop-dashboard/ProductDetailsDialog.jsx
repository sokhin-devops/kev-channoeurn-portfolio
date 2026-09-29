import { Pencil, Trash2 } from 'lucide-react'
import { Dialog } from './Dialog'
import { formatCurrency } from './shopUtils'
import { StockBadge } from './StatusBadge'

export function ProductDetailsDialog({ product, unitsSold, onEdit, onDelete, onClose }) {
  const details = [
    { label: 'SKU', value: product.sku },
    { label: 'Category', value: product.category },
    { label: 'Price', value: formatCurrency(product.price) },
    { label: 'In stock', value: `${product.stock} units` },
    { label: 'Units sold (last 7 days)', value: unitsSold },
    { label: 'Stock value', value: formatCurrency(product.price * product.stock) },
  ]

  return (
    <Dialog title={product.name} description="Product details" onClose={onClose}>
      <div className="shop-details">
        <div className="shop-details__status">
          <StockBadge stock={product.stock} />
        </div>
        {product.description && <p className="shop-details__description">{product.description}</p>}
        <dl className="shop-details__list">
          {details.map((item) => (
            <div key={item.label}>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>
      <footer className="shop-dialog__footer">
        <button type="button" className="shop-btn shop-btn--danger-ghost" onClick={onDelete}>
          <Trash2 size={15} aria-hidden="true" />
          Delete
        </button>
        <button type="button" className="shop-btn shop-btn--primary" onClick={onEdit}>
          <Pencil size={15} aria-hidden="true" />
          Edit product
        </button>
      </footer>
    </Dialog>
  )
}
