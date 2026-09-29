import { useEffect, useState } from 'react'

/**
 * Works like useState, but also saves the value in LocalStorage.
 * `initialValue` can be a value or a function that returns one.
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key)
      if (saved !== null) return JSON.parse(saved)
    } catch {
      // Ignore invalid JSON or unavailable storage and fall back to the initial value.
    }
    return typeof initialValue === 'function' ? initialValue() : initialValue
  })

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch {
      // Storage may be full or disabled. The app keeps working in memory.
    }
  }, [key, value])

  return [value, setValue]
}
