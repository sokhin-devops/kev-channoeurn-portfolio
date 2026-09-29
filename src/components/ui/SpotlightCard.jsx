import { cx } from '../../utils/cx'

/**
 * Glass card with a soft light that follows the pointer on hover.
 * The light position is stored in CSS variables, so no React re-render happens.
 */
export function SpotlightCard({ as: Tag = 'div', className, children, ...props }) {
  function handlePointerMove(event) {
    const rect = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--spot-x', `${event.clientX - rect.left}px`)
    event.currentTarget.style.setProperty('--spot-y', `${event.clientY - rect.top}px`)
  }

  return (
    <Tag className={cx('card', 'card--spotlight', className)} onPointerMove={handlePointerMove} {...props}>
      {children}
    </Tag>
  )
}
