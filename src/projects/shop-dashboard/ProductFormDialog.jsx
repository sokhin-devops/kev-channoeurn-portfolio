import { useId, useState } from 'react'
import { Dialog } from './Dialog'
import { CATEGORIES } from './mockData'

const emptyValues = { name: '', sku: '', category: CATEGORIES[0], price: '', stock: '', description: '' }

function validate(values, usedSkus) {
  const errors = {}
  const price = Number(values.price)
  const stock = Number(values.stock)
  const sku = values.sku.trim().toUpperCase()

  if (!values.name.trim()) errors.name = 'Enter a product name.'
  if (!sku) errors.sku = 'Enter a SKU (product code).'
  else if (usedSkus.includes(sku)) errors.sku = 'Another product already uses this SKU.'
  if (values.price === '' || Number.isNaN(price) || price < 0) errors.price = 'Enter a price of 0 or more.'
  if (values.stock === '' || !Number.isInteger(stock) || stock < 0) errors.stock = 'Enter a whole number of 0 or more.'

  return errors
}

function Field({ id, label, error, hint, children }) {
  return (
    <div className="shop-field">
      <label htmlFor={id} className="shop-field__label">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="shop-field__error">
          {error}
        </p>
      ) : (
        hint && <p className="shop-field__hint">{hint}</p>
      )}
    </div>
  )
}

/** Add or edit a product. Pass `product` to edit an existing one. */
export function ProductFormDialog({ product, products, onSave, onClose }) {
  const isEditing = Boolean(product)
  const id = useId()
  const [values, setValues] = useState(() =>
    product ? { ...product, price: String(product.price), stock: String(product.stock) } : emptyValues,
  )
  const [errors, setErrors] = useState({})

  // SKUs used by other products (so editing a product can keep its own SKU).
  const usedSkus = products.filter((item) => item.id !== product?.id).map((item) => item.sku.toUpperCase())

  function handleChange(event) {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    if (errors[name]) setErrors((current) => ({ ...current, [name]: undefined }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = validate(values, usedSkus)
    setErrors(nextErrors)

    const firstInvalid = Object.keys(nextErrors)[0]
    if (firstInvalid) {
      document.getElementById(`${id}-${firstInvalid}`)?.focus()
      return
    }

    onSave({
      name: values.name.trim(),
      sku: values.sku.trim().toUpperCase(),
      category: values.category,
      price: Math.round(Number(values.price) * 100) / 100,
      stock: Number(values.stock),
      description: values.description.trim(),
    })
  }

  const fieldProps = (name) => ({
    id: `${id}-${name}`,
    name,
    value: values[name],
    onChange: handleChange,
    'aria-invalid': errors[name] ? true : undefined,
    'aria-describedby': errors[name] ? `${id}-${name}-error` : undefined,
  })

  return (
    <Dialog
      title={isEditing ? 'Edit product' : 'Add product'}
      description={isEditing ? `Update the details for ${product.name}.` : 'Add a new product to the catalog.'}
      onClose={onClose}
    >
      <form className="shop-form" onSubmit={handleSubmit} noValidate>
        <div className="shop-form__grid">
          <Field id={`${id}-name`} label="Product name" error={errors.name}>
            <input className="shop-input" type="text" maxLength={80} autoComplete="off" autoFocus {...fieldProps('name')} />
          </Field>

          <Field id={`${id}-sku`} label="SKU" error={errors.sku} hint="For example: EL-1004">
            <input className="shop-input" type="text" maxLength={20} autoComplete="off" {...fieldProps('sku')} />
          </Field>

          <Field id={`${id}-category`} label="Category">
            <select className="shop-input shop-select" {...fieldProps('category')}>
              {CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </Field>

          <Field id={`${id}-price`} label="Price (USD)" error={errors.price}>
            <input className="shop-input" type="number" min="0" step="0.01" inputMode="decimal" {...fieldProps('price')} />
          </Field>

          <Field id={`${id}-stock`} label="Stock" error={errors.stock}>
            <input className="shop-input" type="number" min="0" step="1" inputMode="numeric" {...fieldProps('stock')} />
          </Field>

          <div className="shop-form__full">
            <Field id={`${id}-description`} label="Description (optional)">
              <textarea className="shop-input shop-textarea" rows={3} maxLength={240} {...fieldProps('description')} />
            </Field>
          </div>
        </div>

        <footer className="shop-dialog__footer">
          <button type="button" className="shop-btn shop-btn--ghost" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="shop-btn shop-btn--primary">
            {isEditing ? 'Save changes' : 'Add product'}
          </button>
        </footer>
      </form>
    </Dialog>
  )
}
