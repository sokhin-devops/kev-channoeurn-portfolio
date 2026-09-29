import { X } from 'lucide-react'
import { useEffect, useId, useRef } from 'react'
import { cx } from '../../utils/cx'

/**
 * Modal dialog built on the native <dialog> element, which gives us focus trapping,
 * Escape-to-close and a backdrop for free. Render it only while it should be open.
 */
export function Dialog({ title, description, onClose, size = 'md', children }) {
  const dialogRef = useRef(null)
  const titleId = useId()
  const descriptionId = useId()

  useEffect(() => {
    const dialog = dialogRef.current
    const previouslyFocused = document.activeElement
    if (dialog && !dialog.open) dialog.showModal()

    // Return focus to the button that opened the dialog.
    return () => {
      if (previouslyFocused instanceof HTMLElement && previouslyFocused.isConnected) previouslyFocused.focus()
    }
  }, [])

  // Clicking the dimmed backdrop (outside the panel) closes the dialog.
  function handleClick(event) {
    if (event.target === dialogRef.current) onClose()
  }

  return (
    <dialog
      ref={dialogRef}
      className={cx('shop-dialog', `shop-dialog--${size}`)}
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      onClose={onClose}
      onClick={handleClick}
    >
      <div className="shop-dialog__panel">
        <header className="shop-dialog__header">
          <div>
            <h3 id={titleId} className="shop-dialog__title">
              {title}
            </h3>
            {description && (
              <p id={descriptionId} className="shop-dialog__description">
                {description}
              </p>
            )}
          </div>
          <button type="button" className="shop-icon-btn" onClick={onClose} aria-label="Close dialog">
            <X size={18} aria-hidden="true" />
          </button>
        </header>
        {children}
      </div>
    </dialog>
  )
}
