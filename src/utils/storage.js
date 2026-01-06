// localStorage utilities

/**
 * Get item from localStorage with JSON parsing
 */
export function getStorageItem(key, defaultValue = null) {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error)
    return defaultValue
  }
}

/**
 * Set item in localStorage with JSON stringification
 */
export function setStorageItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch (error) {
    console.error(`Error writing ${key} to localStorage:`, error)
    return false
  }
}

/**
 * Remove item from localStorage
 */
export function removeStorageItem(key) {
  try {
    localStorage.removeItem(key)
    return true
  } catch (error) {
    console.error(`Error removing ${key} from localStorage:`, error)
    return false
  }
}

/**
 * Clear all Ramadan Tracker data from localStorage
 */
export function clearAllData() {
  const keys = Object.keys(localStorage).filter(key => key.startsWith('ramadan_'))
  keys.forEach(key => localStorage.removeItem(key))
}

/**
 * Export all data as JSON
 */
export function exportData() {
  const data = {}
  const keys = Object.keys(localStorage).filter(key => key.startsWith('ramadan_'))
  keys.forEach(key => {
    data[key] = getStorageItem(key)
  })
  return data
}

/**
 * Import data from JSON
 */
export function importData(data) {
  try {
    Object.entries(data).forEach(([key, value]) => {
      if (key.startsWith('ramadan_')) {
        setStorageItem(key, value)
      }
    })
    return true
  } catch (error) {
    console.error('Error importing data:', error)
    return false
  }
}

