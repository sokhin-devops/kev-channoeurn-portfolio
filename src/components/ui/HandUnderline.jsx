import { useId } from 'react'

/** A smooth stroke that draws itself under a word. Purely decorative. */
export function HandUnderline() {
  const gradientId = useId()

  return (
    <svg className="hand-underline" viewBox="0 0 300 14" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" className="hand-underline__stop-start" />
          <stop offset="1" className="hand-underline__stop-end" />
        </linearGradient>
      </defs>
      <path
        d="M4 10C70 5.5 150 4 296 6.5"
        pathLength="1"
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  )
}
