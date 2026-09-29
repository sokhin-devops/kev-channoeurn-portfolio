import { useMemo, useState } from 'react'
import { useLocalStorage } from '../../hooks/useLocalStorage'
import { ConfirmDeleteDialog } from './ConfirmDeleteDialog'
import { DashboardSidebar } from './DashboardSidebar'
import { sampleOrders, sampleProducts } from './mockData'
import { OverviewView } from './OverviewView'
import { ProductDetailsDialog } from './ProductDetailsDialog'
import { ProductFormDialog } from './ProductFormDialog'
import { ProductsView } from './ProductsView'
import { buildOrders, createProductId, getUnitsSold, STORAGE_KEY } from './shopUtils'
import './shop-dashboard.css'

const defaultFilters = { query: '', category: 'all', stock: 'all' }

export default function ShopDashboardApp() {
  const [products, setProducts] = useLocalStorage(STORAGE_KEY, sampleProducts)
  const [view, setView] = useState('overview')
  const [filters, setFilters] = useState(defaultFilters)
  // Which dialog is open: { type: 'create' | 'edit' | 'details' | 'delete', product? }
  const [dialog, setDialog] = useState(null)
  const [today] = useState(() => new Date())

  // Orders are read-only sample data, so they only need to be prepared once.
  const orders = useMemo(() => buildOrders(sampleOrders, today), [today])

  const closeDialog = () => setDialog(null)

  function saveProduct(values) {
    if (dialog?.type === 'edit') {
      setProducts((current) =>
        current.map((product) => (product.id === dialog.product.id ? { ...product, ...values } : product)),
      )
    } else {
      setProducts((current) => [{ id: createProductId(), ...values }, ...current])
    }
    closeDialog()
  }

  function deleteProduct(productId) {
    setProducts((current) => current.filter((product) => product.id !== productId))
    closeDialog()
  }

  function showLowStock() {
    setFilters({ ...defaultFilters, stock: 'attention' })
    setView('products')
  }

  function resetSampleData() {
    setProducts(sampleProducts)
    setFilters(defaultFilters)
  }

  return (
    <div className="shop" data-accent="blue">
      <div className="shop__layout">
        <DashboardSidebar
          activeView={view}
          onViewChange={setView}
          onReset={resetSampleData}
          productCount={products.length}
        />

        <div className="shop__main">
          {view === 'overview' ? (
            <OverviewView products={products} orders={orders} today={today} onShowLowStock={showLowStock} />
          ) : (
            <ProductsView
              products={products}
              filters={filters}
              onFiltersChange={setFilters}
              onCreate={() => setDialog({ type: 'create' })}
              onView={(product) => setDialog({ type: 'details', product })}
              onEdit={(product) => setDialog({ type: 'edit', product })}
              onDelete={(product) => setDialog({ type: 'delete', product })}
            />
          )}
        </div>
      </div>

      {(dialog?.type === 'create' || dialog?.type === 'edit') && (
        <ProductFormDialog
          key={dialog.product?.id ?? 'new'}
          product={dialog.product}
          products={products}
          onSave={saveProduct}
          onClose={closeDialog}
        />
      )}

      {dialog?.type === 'details' && (
        <ProductDetailsDialog
          product={dialog.product}
          unitsSold={getUnitsSold(orders, dialog.product.id)}
          onEdit={() => setDialog({ type: 'edit', product: dialog.product })}
          onDelete={() => setDialog({ type: 'delete', product: dialog.product })}
          onClose={closeDialog}
        />
      )}

      {dialog?.type === 'delete' && (
        <ConfirmDeleteDialog
          product={dialog.product}
          onConfirm={() => deleteProduct(dialog.product.id)}
          onClose={closeDialog}
        />
      )}
    </div>
  )
}
