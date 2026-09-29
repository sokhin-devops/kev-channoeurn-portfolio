import { Link } from 'react-router-dom'
import { cx } from '../../utils/cx'

/**
 * One button style for internal links (`to`), external links (`href`) and buttons.
 * variant: "primary" | "secondary" | "ghost"   size: "md" | "sm"
 */
export function Button({
  to,
  href,
  variant = 'primary',
  size = 'md',
  icon: LeadingIcon,
  iconTrailing: TrailingIcon,
  className,
  children,
  ...props
}) {
  const classes = cx('btn', `btn--${variant}`, size === 'sm' && 'btn--sm', className)
  const iconSize = size === 'sm' ? 15 : 16

  const content = (
    <>
      {LeadingIcon && <LeadingIcon size={iconSize} aria-hidden="true" />}
      <span>{children}</span>
      {TrailingIcon && <TrailingIcon size={iconSize} aria-hidden="true" className="btn__trailing" />}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {content}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {content}
      </a>
    )
  }

  return (
    <button type="button" className={classes} {...props}>
      {content}
    </button>
  )
}
