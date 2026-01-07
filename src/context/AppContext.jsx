import { createContext, useContext, useCallback, useEffect } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { useGeolocation } from '../hooks/useGeolocation'
import { getCityFromCoords } from '../api/aladhan'
import { STORAGE_KEYS, DEFAULT_SETTINGS } from '../utils/constants'
import { formatDateKey } from '../utils/dateHelpers'

const AppContext = createContext()

export function AppProvider({ children }) {
  const [settings, setSettings] = useLocalStorage(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS)
  const [prayers, setPrayers] = useLocalStorage(STORAGE_KEYS.PRAYERS, {})
  const [quran, setQuran] = useLocalStorage(STORAGE_KEYS.QURAN, { completedJuz: [] })
  const [azkar, setAzkar] = useLocalStorage(STORAGE_KEYS.AZKAR, {})
  const [tafsir, setTafsir] = useLocalStorage(STORAGE_KEYS.TAFSIR, [])
  const [taraweh, setTaraweh] = useLocalStorage(STORAGE_KEYS.TARAWEH, {})
  const [deeds, setDeeds] = useLocalStorage(STORAGE_KEYS.DEEDS, [])
  const [period, setPeriod] = useLocalStorage(STORAGE_KEYS.PERIOD, { markedDays: [] })
  const [tasbeeh, setTasbeeh] = useLocalStorage(STORAGE_KEYS.TASBEEH, {})

  const geolocation = useGeolocation()

  // Update location in settings when geolocation changes
  useEffect(() => {
    if (geolocation.lat && geolocation.lng && !settings.location.lat) {
      getCityFromCoords(geolocation.lat, geolocation.lng).then(city => {
        setSettings(prev => ({
          ...prev,
          location: {
            lat: geolocation.lat,
            lng: geolocation.lng,
            city
          }
        }))
      })
    }
  }, [geolocation.lat, geolocation.lng, settings.location.lat, setSettings])

  // Prayer tracking
  const togglePrayer = useCallback((prayerId, actualTime = null) => {
    const today = formatDateKey()
    setPrayers(prev => {
      const dayPrayers = prev[today] || {}
      const prayer = dayPrayers[prayerId] || { completed: false, actualTime: null }
      
      return {
        ...prev,
        [today]: {
          ...dayPrayers,
          [prayerId]: {
            completed: !prayer.completed,
            actualTime: !prayer.completed ? actualTime : null
          }
        }
      }
    })
  }, [setPrayers])

  const getPrayerStatus = useCallback((date = formatDateKey()) => {
    return prayers[date] || {}
  }, [prayers])

  // Quran tracking
  const toggleJuz = useCallback((juzNumber) => {
    setQuran(prev => {
      const completed = prev.completedJuz || []
      const isCompleted = completed.includes(juzNumber)
      
      return {
        ...prev,
        completedJuz: isCompleted
          ? completed.filter(j => j !== juzNumber)
          : [...completed, juzNumber],
        lastUpdated: formatDateKey()
      }
    })
  }, [setQuran])

  // Azkar tracking (legacy - for backward compatibility)
  const toggleAzkar = useCallback((type) => {
    const today = formatDateKey()
    setAzkar(prev => {
      const dayAzkar = prev[today] || { morning: {}, evening: {} }
      // If old format (boolean), migrate to new format
      if (typeof dayAzkar[type] === 'boolean') {
        return {
          ...prev,
          [today]: {
            morning: typeof dayAzkar.morning === 'boolean' ? {} : (dayAzkar.morning || {}),
            evening: typeof dayAzkar.evening === 'boolean' ? {} : (dayAzkar.evening || {})
          }
        }
      }
      return prev
    })
  }, [setAzkar])

  const getAzkarStatus = useCallback((date = formatDateKey()) => {
    const dayAzkar = azkar[date] || { morning: {}, evening: {} }
    // Check if old format (boolean) for backward compatibility
    if (typeof dayAzkar.morning === 'boolean' || typeof dayAzkar.evening === 'boolean') {
      return {
        morning: dayAzkar.morning === true,
        evening: dayAzkar.evening === true
      }
    }
    // New format: check if all items are completed
    const morningItems = Object.values(dayAzkar.morning || {})
    const eveningItems = Object.values(dayAzkar.evening || {})
    return {
      morning: morningItems.length > 0 && morningItems.every(item => item.completed),
      evening: eveningItems.length > 0 && eveningItems.every(item => item.completed)
    }
  }, [azkar])

  // Get azkar completed dates for streak
  const getAzkarCompletedDates = useCallback((type) => {
    return Object.entries(azkar)
      .filter(([_, value]) => {
        // Handle old format
        if (typeof value[type] === 'boolean') {
          return value[type] === true
        }
        // New format: all items must be completed
        const items = Object.values(value[type] || {})
        return items.length > 0 && items.every(item => item.completed)
      })
      .map(([date]) => date)
  }, [azkar])

  // Individual azkar item tracking
  const incrementAzkarItem = useCallback((type, itemId) => {
    const today = formatDateKey()
    setAzkar(prev => {
      const dayAzkar = prev[today] || { morning: {}, evening: {} }
      // Migrate old format if needed
      const morning = typeof dayAzkar.morning === 'boolean' ? {} : (dayAzkar.morning || {})
      const evening = typeof dayAzkar.evening === 'boolean' ? {} : (dayAzkar.evening || {})
      
      const items = type === 'morning' ? morning : evening
      const current = items[itemId] || { count: 0, completed: false }
      
      return {
        ...prev,
        [today]: {
          morning: type === 'morning' ? {
            ...morning,
            [itemId]: {
              count: current.count + 1,
              completed: current.completed
            }
          } : morning,
          evening: type === 'evening' ? {
            ...evening,
            [itemId]: {
              count: current.count + 1,
              completed: current.completed
            }
          } : evening
        }
      }
    })
  }, [setAzkar])

  const toggleAzkarItem = useCallback((type, itemId) => {
    const today = formatDateKey()
    setAzkar(prev => {
      const dayAzkar = prev[today] || { morning: {}, evening: {} }
      // Migrate old format if needed
      const morning = typeof dayAzkar.morning === 'boolean' ? {} : (dayAzkar.morning || {})
      const evening = typeof dayAzkar.evening === 'boolean' ? {} : (dayAzkar.evening || {})
      
      const items = type === 'morning' ? morning : evening
      const current = items[itemId] || { count: 0, completed: false }
      
      return {
        ...prev,
        [today]: {
          morning: type === 'morning' ? {
            ...morning,
            [itemId]: {
              count: current.count,
              completed: !current.completed
            }
          } : morning,
          evening: type === 'evening' ? {
            ...evening,
            [itemId]: {
              count: current.count,
              completed: !current.completed
            }
          } : evening
        }
      }
    })
  }, [setAzkar])

  const getAzkarItemCount = useCallback((type, itemId, date = formatDateKey()) => {
    const dayAzkar = azkar[date] || { morning: {}, evening: {} }
    // Handle old format
    if (typeof dayAzkar[type] === 'boolean') {
      return 0
    }
    const items = dayAzkar[type] || {}
    return items[itemId]?.count || 0
  }, [azkar])

  const getAzkarItemStatus = useCallback((type, itemId, date = formatDateKey()) => {
    const dayAzkar = azkar[date] || { morning: {}, evening: {} }
    // Handle old format
    if (typeof dayAzkar[type] === 'boolean') {
      return { count: 0, completed: false }
    }
    const items = dayAzkar[type] || {}
    return items[itemId] || { count: 0, completed: false }
  }, [azkar])

  const getAzkarCompletion = useCallback((type, date = formatDateKey()) => {
    const dayAzkar = azkar[date] || { morning: {}, evening: {} }
    // Handle old format
    if (typeof dayAzkar[type] === 'boolean') {
      return { completed: 0, total: 0, percentage: 0 }
    }
    const items = Object.values(dayAzkar[type] || {})
    if (items.length === 0) {
      return { completed: 0, total: 0, percentage: 0 }
    }
    const completed = items.filter(item => item.completed).length
    const total = items.length
    return {
      completed,
      total,
      percentage: Math.round((completed / total) * 100)
    }
  }, [azkar])

  // Tafsir tracking
  const addTafsirEntry = useCallback((entry) => {
    setTafsir(prev => [...prev, { ...entry, id: crypto.randomUUID(), date: formatDateKey() }])
  }, [setTafsir])

  const deleteTafsirEntry = useCallback((id) => {
    setTafsir(prev => prev.filter(entry => entry.id !== id))
  }, [setTafsir])

  // Taraweh tracking
  const toggleTaraweh = useCallback((location = 'home', uncomplete = false) => {
    const today = formatDateKey()
    setTaraweh(prev => {
      const current = prev[today]
      if (uncomplete && current?.completed) {
        // Uncomplete when explicitly requested
        const { [today]: _, ...rest } = prev
        return rest
      }
      if (current?.completed) {
        // If already completed, just update the location (don't uncomplete)
        return {
          ...prev,
          [today]: { completed: true, location }
        }
      }
      return {
        ...prev,
        [today]: { completed: true, location }
      }
    })
  }, [setTaraweh])

  const getTarawehStatus = useCallback((date = formatDateKey()) => {
    return taraweh[date] || { completed: false, location: null }
  }, [taraweh])

  // Good deeds tracking
  const addDeed = useCallback((deed) => {
    setDeeds(prev => [...prev, { ...deed, id: crypto.randomUUID(), date: formatDateKey() }])
  }, [setDeeds])

  const deleteDeed = useCallback((id) => {
    setDeeds(prev => prev.filter(deed => deed.id !== id))
  }, [setDeeds])

  const getDeedsByDate = useCallback((date = formatDateKey()) => {
    return deeds.filter(deed => deed.date === date)
  }, [deeds])

  // Period tracking
  const togglePeriodDay = useCallback((date) => {
    setPeriod(prev => {
      const markedDays = prev.markedDays || []
      const isMarked = markedDays.includes(date)
      
      return {
        ...prev,
        markedDays: isMarked
          ? markedDays.filter(d => d !== date)
          : [...markedDays, date]
      }
    })
  }, [setPeriod])

  const isPeriodDay = useCallback((date = formatDateKey()) => {
    return period.markedDays?.includes(date) || false
  }, [period])

  // Tasbeeh tracking
  const incrementTasbeeh = useCallback((phraseId) => {
    const today = formatDateKey()
    setTasbeeh(prev => {
      const dayTasbeeh = prev[today] || {}
      const current = dayTasbeeh[phraseId] || 0
      
      return {
        ...prev,
        [today]: {
          ...dayTasbeeh,
          [phraseId]: current + 1
        }
      }
    })
  }, [setTasbeeh])

  const resetTasbeeh = useCallback((phraseId) => {
    const today = formatDateKey()
    setTasbeeh(prev => {
      const dayTasbeeh = prev[today] || {}
      return {
        ...prev,
        [today]: {
          ...dayTasbeeh,
          [phraseId]: 0
        }
      }
    })
  }, [setTasbeeh])

  const getTasbeehCount = useCallback((phraseId, date = formatDateKey()) => {
    return tasbeeh[date]?.[phraseId] || 0
  }, [tasbeeh])

  const value = {
    // Settings
    settings,
    setSettings,
    geolocation,
    
    // Prayer
    prayers,
    togglePrayer,
    getPrayerStatus,
    
    // Quran
    quran,
    toggleJuz,
    
    // Azkar
    azkar,
    toggleAzkar,
    getAzkarStatus,
    getAzkarCompletedDates,
    incrementAzkarItem,
    toggleAzkarItem,
    getAzkarItemCount,
    getAzkarItemStatus,
    getAzkarCompletion,
    
    // Tafsir
    tafsir,
    addTafsirEntry,
    deleteTafsirEntry,
    
    // Taraweh
    taraweh,
    toggleTaraweh,
    getTarawehStatus,
    
    // Deeds
    deeds,
    addDeed,
    deleteDeed,
    getDeedsByDate,
    
    // Period
    period,
    togglePeriodDay,
    isPeriodDay,
    
    // Tasbeeh
    tasbeeh,
    incrementTasbeeh,
    resetTasbeeh,
    getTasbeehCount
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useApp must be used within an AppProvider')
  }
  return context
}

