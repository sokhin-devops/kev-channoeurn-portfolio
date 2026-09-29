import { useEffect, useState } from 'react'
import { getForecast } from './weatherApi'

/**
 * Loads the forecast for `city` and returns { status, data, error, retry }.
 * status: "idle" | "loading" | "success" | "error"
 *
 * Each request has a key. While the latest result doesn't match the current key,
 * the status is "loading". Outdated requests are cancelled with AbortController.
 */
export function useForecast(city) {
  const [retryCount, setRetryCount] = useState(0)
  const [result, setResult] = useState(null)

  const requestKey = city ? `${city.latitude},${city.longitude}:${retryCount}` : null

  useEffect(() => {
    if (!city) return

    const controller = new AbortController()

    getForecast(city, controller.signal)
      .then((data) => setResult({ requestKey, data, error: null }))
      .catch((error) => {
        if (controller.signal.aborted) return
        const message =
          error instanceof TypeError
            ? 'Could not reach the weather service. Check your internet connection.'
            : error.message
        setResult({ requestKey, data: null, error: message })
      })

    return () => controller.abort()
  }, [city, requestKey])

  let status = 'idle'
  if (city) {
    if (result?.requestKey !== requestKey) status = 'loading'
    else status = result.error ? 'error' : 'success'
  }

  return {
    status,
    data: status === 'success' ? result.data : null,
    error: status === 'error' ? result.error : null,
    retry: () => setRetryCount((count) => count + 1),
  }
}
