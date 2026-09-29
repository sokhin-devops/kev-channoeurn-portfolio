import { Eye, PackageSearch, Pencil, Plus, Search, Trash2 } from 'lucide-react'
import { useId } from 'react'
import { CATEGORIES } from './mockData'
import { filterProducts, formatCurrency, STOCK_FILTERS } from './shopUtils'
import { StockBadge } from './StatusBadge'

export function ProductsView({ products, filters, onFiltersChange, onCreate, onView, onEdit, onDelete }) {
  const id = useId()
  const visibleProducts = filterProducts(products, filters)
  const hasFilters = filters.query.trim() !== '' || filters.category !== 'all' || filters.stock !== 'all'

  const updateFilter = (key) => (event) => onFiltersChange({ ...filters, [key]: event.target.value })

  return (
    <div className="shop-view">
      <header className="shop-view__header">
        <div>
          <h2 className="shop-view__title">Products</h2>
          <p className="shop-view__subtitle">
            {products.length} {products.length === 1 ? 'product' : 'products'} in the catalog
          </p>
        </div>
        <button type="button" className="shop-btn shop-btn--primary" onClick={onCreate}>
          <Plus size={16} aria-hidden="true" />
          Add product
        </button>
      </header>

      <div className="shop-filters">
        <div className="shop-search">
          <Search size={16} className="shop-search__icon" aria-hidden="true" />
          <label htmlFor={`${id}-search`} className="sr-only">
            Search products
          </label>
          <input
            id={`${id}-search`}
            type="search"
            className="shop-input shop-search__input"
            placeholder="Search by name or SKU…"
            value={filters.query}
            onChange={updateFilter('query')}
            autoComplete="off"
          />
        </div>

        <label htmlFor={`${id}-category`} className="sr-only">
          Filter by category
        </label>
        <select
          id={`${id}-category`}
          className="shop-input shop-select"
          value={filters.category}
          onChange={updateFilter('category')}
        >
          <option value="all">All categories</option>
          {CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <label htmlFor={`${id}-stock`} className="sr-only">
          Filter by stock status
        </label>
        <select id={`${id}-stock`} className="shop-input shop-select" value={filters.stock} onChange={updateFilter('stock')}>
          {STOCK_FILTERS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <p className="sr-only" aria-live="polite">
        {visibleProducts.length} {visibleProducts.length === 1 ? 'product' : 'products'} shown
      </p>

      {visibleProducts.length > 0 ? (
        <div className="shop-card shop-table-wrap">
          <table className="shop-table shop-table--responsive shop-table--products">
            <thead>
              <tr>
                <th scope="col">Product</th>
                <th scope="col">Category</th>
                <th scope="col" className="is-numeric">
                  Price
                </th>
                <th scope="col" className="is-numeric">
                  Stock
                </th>
                <th scope="col">Status</th>
                <th scope="col" className="is-actions">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {visibleProducts.map((product) => (
                <tr key={product.id}>
                  <td data-label="Product" className="shop-table__product">
                    <button type="button" className="shop-product-link" onClick={() => onView(product)}>
                      <span className="shop-product-link__name">{product.name}</span>
                      <span className="shop-product-link__sku">{product.sku}</span>
                    </button>
                  </td>
                  <td data-label="Category">{product.category}</td>
                  <td data-label="Price" className="is-numeric">
                    {formatCurrency(product.price)}
                  </td>
                  <td data-label="Stock" className="is-numeric">
                    {product.stock}
                  </td>
                  <td data-label="Status">
                    <StockBadge stock={product.stock} />
                  </td>
                  <td className="is-actions">
                    <div className="shop-row-actions">
                      <button
                        type="button"
                        className="shop-icon-btn"
                        onClick={() => onView(product)}
                        aria-label={`View details: ${product.name}`}
                        title="View details"
                      >
                        <Eye size={16} aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        className="shop-icon-btn"
                        onClick={() => onEdit(product)}
                        aria-label={`Edit ${product.name}`}
                        title="Edit"
                      >
                        <Pencil size={16} aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        className="shop-icon-btn shop-icon-btn--danger"
                        onClick={() => onDelete(product)}
                        aria-label={`Delete ${product.name}`}
                        title="Delete"
                      >
                        <Trash2 size={16} aria-hidden="true" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="shop-card shop-empty">
          <span className="shop-empty__icon" aria-hidden="true">
            <PackageSearch size={22} />
          </span>
          <h3 className="shop-empty__title">{products.length === 0 ? 'No products yet' : 'No products found'}</h3>
          <p className="shop-empty__text">
            {products.length === 0
              ? 'Add your first product to start building the catalog.'
              : 'Try a different search term or change the filters.'}
          </p>
          {hasFilters ? (
            <button
              type="button"
              className="shop-btn shop-btn--ghost"
              onClick={() => onFiltersChange({ query: '', category: 'all', stock: 'all' })}
            >
              Clear filters
            </button>
          ) : (
            <button type="button" className="shop-btn shop-btn--primary" onClick={onCreate}>
              <Plus size={16} aria-hidden="true" />
              Add product
            </button>
          )}
        </div>
      )}
    </div>
  )
}
