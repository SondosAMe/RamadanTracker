import { useState, useEffect, useCallback } from 'react'
import { PRAYERS } from '../utils/constants'

/**
 * Custom hook for countdown to next prayer
 */
export function useCountdown(prayerTimes) {
  const [countdown, setCountdown] = useState({
    nextPrayer: null,
    timeRemaining: 0,
    formatted: '00:00:00'
  })

  const calculateNextPrayer = useCallback(() => {
    if (!prayerTimes) return null

    const now = new Date()
    const currentTime = now.getHours() * 60 + now.getMinutes()

    // Get all prayer times as minutes from midnight
    const prayerMinutes = PRAYERS.map(prayer => {
      const [hours, minutes] = prayerTimes[prayer.id]?.split(':').map(Number) || [0, 0]
      return {
        ...prayer,
        minutes: hours * 60 + minutes,
        timeStr: prayerTimes[prayer.id]
      }
    })

    // Find next prayer
    const nextPrayer = prayerMinutes.find(p => p.minutes > currentTime)

    if (nextPrayer) {
      const diffMinutes = nextPrayer.minutes - currentTime
      const seconds = (60 - now.getSeconds()) % 60
      const msRemaining = (diffMinutes - 1) * 60 * 1000 + seconds * 1000
      
      return {
        prayer: nextPrayer,
        msRemaining: Math.max(0, msRemaining)
      }
    }

    // If no prayer left today, next is Fajr tomorrow
    const fajr = prayerMinutes[0]
    const minsUntilMidnight = (24 * 60) - currentTime
    const msUntilFajr = (minsUntilMidnight + fajr.minutes) * 60 * 1000

    return {
      prayer: { ...fajr, name: 'Fajr (Tomorrow)' },
      msRemaining: msUntilFajr
    }
  }, [prayerTimes])

  const formatTime = (ms) => {
    if (ms <= 0) return '00:00:00'
    
    const hours = Math.floor(ms / (1000 * 60 * 60))
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((ms % (1000 * 60)) / 1000)
    
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  useEffect(() => {
    if (!prayerTimes) return

    const updateCountdown = () => {
      const next = calculateNextPrayer()
      if (next) {
        setCountdown({
          nextPrayer: next.prayer,
          timeRemaining: next.msRemaining,
          formatted: formatTime(next.msRemaining)
        })
      }
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)

    return () => clearInterval(interval)
  }, [prayerTimes, calculateNextPrayer])

  return countdown
}

