import { useReveal } from '../../hooks/useReveal'
import { cx } from '../../utils/cx'

/**
 * Fades and slides its children in when they scroll into view.
 * `delay` staggers items (each step is 70ms). Disabled for reduced motion in CSS.
 */
export function Reveal({ as: Tag = 'div', delay = 0, className, style, children, ...props }) {
  const [ref, isVisible] = useReveal()

  return (
    <Tag
      ref={ref}
      className={cx('reveal', isVisible && 'is-visible', className)}
      style={{ '--reveal-delay': delay, ...style }}
      {...props}
    >
      {children}
    </Tag>
  )
}
