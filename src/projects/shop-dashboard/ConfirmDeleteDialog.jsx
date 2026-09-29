import { Dialog } from './Dialog'

export function ConfirmDeleteDialog({ product, onConfirm, onClose }) {
  return (
    <Dialog
      title="Delete product?"
      description={`“${product.name}” will be removed from the catalog. Past orders are not affected.`}
      onClose={onClose}
      size="sm"
    >
      <footer className="shop-dialog__footer">
        <button type="button" className="shop-btn shop-btn--ghost" onClick={onClose} autoFocus>
          Cancel
        </button>
        <button type="button" className="shop-btn shop-btn--danger" onClick={onConfirm}>
          Delete product
        </button>
      </footer>
    </Dialog>
  )
}
