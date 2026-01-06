// Aladhan API integration for prayer times

const BASE_URL = 'https://api.aladhan.com/v1'

/**
 * Fetch prayer times for a specific date and location
 */
export async function fetchPrayerTimes(lat, lng, date = new Date(), method = 2) {
  const dateStr = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`
  
  const params = new URLSearchParams({
    latitude: lat,
    longitude: lng,
    method: method,
    date: dateStr
  })
  
  try {
    const response = await fetch(`${BASE_URL}/timings/${dateStr}?${params}`)
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }
    
    const data = await response.json()
    
    if (data.code !== 200) {
      throw new Error(data.status || 'Unknown API error')
    }
    
    const timings = data.data.timings
    
    // Debug: Log all timing keys to see what the API returns
    console.log('API Timings keys:', Object.keys(timings))
    console.log('Dhuhr variations:', {
      Dhuhr: timings.Dhuhr,
      Zuhr: timings.Zuhr,
      Duhr: timings.Duhr,
      dhuhr: timings.dhuhr
    })
    
    // Handle different API response formats (Dhuhr, Zuhr, Duhr)
    const dhuhr = timings.Dhuhr || timings.Zuhr || timings.Duhr || timings.dhuhr
    
    if (!dhuhr) {
      console.warn('Dhuhr time not found in API response. Available keys:', Object.keys(timings))
    }
    
    const result = {
      fajr: timings.Fajr || timings.fajr,
      sunrise: timings.Sunrise || timings.sunrise,
      dhuhr: dhuhr,
      asr: timings.Asr || timings.asr,
      maghrib: timings.Maghrib || timings.maghrib,
      isha: timings.Isha || timings.isha,
      date: data.data.date,
      meta: data.data.meta
    }
    
    console.log('Processed prayer times:', result)
    
    return result
  } catch (error) {
    console.error('Error fetching prayer times:', error)
    throw error
  }
}

/**
 * Fetch prayer times for a whole month
 */
export async function fetchMonthlyPrayerTimes(lat, lng, year, month, method = 2) {
  const params = new URLSearchParams({
    latitude: lat,
    longitude: lng,
    method: method
  })
  
  try {
    const response = await fetch(`${BASE_URL}/calendar/${year}/${month}?${params}`)
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }
    
    const data = await response.json()
    
    if (data.code !== 200) {
      throw new Error(data.status || 'Unknown API error')
    }
    
    return data.data.map(day => {
      const timings = day.timings
      // Handle different API response formats
      const dhuhr = timings.Dhuhr || timings.Zuhr || timings.Duhr || timings.dhuhr
      
      return {
        fajr: (timings.Fajr || timings.fajr || '').split(' ')[0],
        sunrise: (timings.Sunrise || timings.sunrise || '').split(' ')[0],
        dhuhr: (dhuhr || '').split(' ')[0],
        asr: (timings.Asr || timings.asr || '').split(' ')[0],
        maghrib: (timings.Maghrib || timings.maghrib || '').split(' ')[0],
        isha: (timings.Isha || timings.isha || '').split(' ')[0],
        date: day.date.gregorian.date
      }
    })
  } catch (error) {
    console.error('Error fetching monthly prayer times:', error)
    throw error
  }
}

/**
 * Get city name from coordinates using reverse geocoding
 */
export async function getCityFromCoords(lat, lng) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
    )
    
    if (!response.ok) {
      throw new Error('Geocoding failed')
    }
    
    const data = await response.json()
    return data.address?.city || data.address?.town || data.address?.village || 'Unknown Location'
  } catch (error) {
    console.error('Error getting city name:', error)
    return 'Unknown Location'
  }
}

