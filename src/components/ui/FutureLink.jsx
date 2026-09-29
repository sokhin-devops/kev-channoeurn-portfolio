import { ArrowUpRight } from 'lucide-react'
import { cx } from '../../utils/cx'
import { Button } from './Button'

/**
 * A link that may not exist yet (GitHub, Live Demo).
 * With `href` it renders a normal external link.
 * Without `href` it renders a clearly marked, non-clickable placeholder.
 */
export function FutureLink({
  href,
  label,
  placeholder = 'Coming Soon',
  icon: LeadingIcon,
  variant = 'secondary',
  size = 'md',
  className,
}) {
  if (href) {
    return (
      <Button
        href={href}
        target="_blank"
        rel="noreferrer"
        variant={variant}
        size={size}
        icon={LeadingIcon}
        iconTrailing={ArrowUpRight}
        className={className}
      >
        {label}
      </Button>
    )
  }

  return (
    <span
      className={cx('btn', `btn--${variant}`, size === 'sm' && 'btn--sm', 'btn--placeholder', className)}
      aria-disabled="true"
    >
      {LeadingIcon && <LeadingIcon size={size === 'sm' ? 15 : 16} aria-hidden="true" />}
      <span>{label}</span>
      <span className="btn__note">{placeholder}</span>
    </span>
  )
}
