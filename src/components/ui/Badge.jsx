import { cx } from '../../utils/cx'

/** Small pill label. tone: "neutral" | "accent" | "success" */
export function Badge({ tone = 'neutral', icon: BadgeIcon, className, children }) {
  return (
    <span className={cx('badge', `badge--${tone}`, className)}>
      {BadgeIcon && <BadgeIcon size={13} aria-hidden="true" />}
      {children}
    </span>
  )
}
