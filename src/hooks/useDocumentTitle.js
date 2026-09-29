import { useEffect } from 'react'

const BASE_TITLE = 'Kev Channoeurn | Front-End Developer'

/** Sets the browser tab title. Pass nothing to use the default title. */
export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | Kev Channoeurn` : BASE_TITLE
  }, [title])
}
