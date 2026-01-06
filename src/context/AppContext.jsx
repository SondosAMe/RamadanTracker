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

  // Azkar tracking
  const toggleAzkar = useCallback((type) => {
    const today = formatDateKey()
    setAzkar(prev => {
      const dayAzkar = prev[today] || { morning: false, evening: false }
      return {
        ...prev,
        [today]: {
          ...dayAzkar,
          [type]: !dayAzkar[type]
        }
      }
    })
  }, [setAzkar])

  const getAzkarStatus = useCallback((date = formatDateKey()) => {
    return azkar[date] || { morning: false, evening: false }
  }, [azkar])

  // Get azkar completed dates for streak
  const getAzkarCompletedDates = useCallback((type) => {
    return Object.entries(azkar)
      .filter(([_, value]) => value[type])
      .map(([date]) => date)
  }, [azkar])

  // Tafsir tracking
  const addTafsirEntry = useCallback((entry) => {
    setTafsir(prev => [...prev, { ...entry, id: crypto.randomUUID(), date: formatDateKey() }])
  }, [setTafsir])

  const deleteTafsirEntry = useCallback((id) => {
    setTafsir(prev => prev.filter(entry => entry.id !== id))
  }, [setTafsir])

  // Taraweh tracking
  const toggleTaraweh = useCallback((location = 'home') => {
    const today = formatDateKey()
    setTaraweh(prev => {
      const current = prev[today]
      if (current?.completed) {
        // Uncomplete
        const { [today]: _, ...rest } = prev
        return rest
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

