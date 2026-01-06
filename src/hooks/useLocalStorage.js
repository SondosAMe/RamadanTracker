import { useState, useEffect, useCallback } from 'react'
import { getStorageItem, setStorageItem } from '../utils/storage'

/**
 * Custom hook for syncing state with localStorage
 */
export function useLocalStorage(key, initialValue) {
  // Get initial value from localStorage or use provided default
  const [storedValue, setStoredValue] = useState(() => {
    return getStorageItem(key, initialValue)
  })

  // Update localStorage when value changes
  const setValue = useCallback((value) => {
    setStoredValue(prevValue => {
      const newValue = value instanceof Function ? value(prevValue) : value
      setStorageItem(key, newValue)
      return newValue
    })
  }, [key])

  // Listen for changes from other tabs/windows
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue))
        } catch {
          setStoredValue(e.newValue)
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [key])

  return [storedValue, setValue]
}

