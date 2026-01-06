import { useState, useEffect, useCallback } from 'react'

/**
 * Custom hook for browser geolocation
 */
export function useGeolocation() {
  const [location, setLocation] = useState({
    lat: null,
    lng: null,
    loading: false,
    error: null
  })

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setLocation(prev => ({
        ...prev,
        error: 'Geolocation is not supported by your browser'
      }))
      return
    }

    setLocation(prev => ({ ...prev, loading: true, error: null }))

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          loading: false,
          error: null
        })
      },
      (error) => {
        let errorMessage = 'Unable to retrieve your location'
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location permission denied. Please enable location access.'
            break
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information is unavailable.'
            break
          case error.TIMEOUT:
            errorMessage = 'Location request timed out.'
            break
        }
        
        setLocation(prev => ({
          ...prev,
          loading: false,
          error: errorMessage
        }))
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes cache
      }
    )
  }, [])

  // Auto-request on mount
  useEffect(() => {
    requestLocation()
  }, [requestLocation])

  return { ...location, requestLocation }
}

