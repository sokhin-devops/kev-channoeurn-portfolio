import { cx } from '../../utils/cx'

/** A simple app-window frame used to present a live project preview. */
export function BrowserFrame({ title, className, children }) {
  return (
    <div className={cx('browser-frame', className)}>
      <div className="browser-frame__bar">
        <span className="browser-frame__dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <span className="browser-frame__title">{title}</span>
      </div>
      <div className="browser-frame__body">{children}</div>
    </div>
  )
}
