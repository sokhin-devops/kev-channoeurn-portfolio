/** Joins class names and skips empty values: cx('btn', isActive && 'is-active') */
export function cx(...classNames) {
  return classNames.filter(Boolean).join(' ')
}
