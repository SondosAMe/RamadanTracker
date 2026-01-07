import { useState, useEffect, useCallback } from 'react'
import { fetchPrayerTimes, getOptimalMethod } from '../api/aladhan'
import { formatDateKey } from '../utils/dateHelpers'
import { useLocalStorage } from './useLocalStorage'
import { STORAGE_KEYS } from '../utils/constants'

/**
 * Custom hook for fetching and caching prayer times
 */
export function usePrayerTimes(lat, lng, method = 2) {
  // Use optimal method for location (e.g., Gulf Region for UAE)
  const optimalMethod = lat && lng ? getOptimalMethod(lat, lng, method) : method
  const [prayerTimes, setPrayerTimes] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [cachedTimes, setCachedTimes] = useLocalStorage('ramadan_prayer_cache', {})

  const fetchTimes = useCallback(async (date = new Date()) => {
    if (!lat || !lng) {
      setError('Location not available')
      return null
    }

    const dateKey = formatDateKey(date)
    
    // Check cache first
    if (cachedTimes[dateKey]) {
      setPrayerTimes(cachedTimes[dateKey])
      return cachedTimes[dateKey]
    }

    setLoading(true)
    setError(null)

    try {
      const times = await fetchPrayerTimes(lat, lng, date, optimalMethod)
      
      // Clean up time strings (remove timezone offset if present)
      // Handle cases where times might be undefined or in different formats
      const cleanedTimes = {
        fajr: times.fajr ? times.fajr.split(' ')[0] : null,
        sunrise: times.sunrise ? times.sunrise.split(' ')[0] : null,
        dhuhr: times.dhuhr ? times.dhuhr.split(' ')[0] : null,
        asr: times.asr ? times.asr.split(' ')[0] : null,
        maghrib: times.maghrib ? times.maghrib.split(' ')[0] : null,
        isha: times.isha ? times.isha.split(' ')[0] : null
      }
      
      setPrayerTimes(cleanedTimes)
      
      // Cache the result
      setCachedTimes(prev => ({
        ...prev,
        [dateKey]: cleanedTimes
      }))
      
      return cleanedTimes
    } catch (err) {
      setError(err.message || 'Failed to fetch prayer times')
      return null
    } finally {
      setLoading(false)
    }
  }, [lat, lng, optimalMethod, cachedTimes, setCachedTimes])

  // Fetch times when location changes
  useEffect(() => {
    if (lat && lng) {
      fetchTimes()
    }
  }, [lat, lng, fetchTimes])

  return {
    prayerTimes,
    loading,
    error,
    refetch: fetchTimes
  }
}

