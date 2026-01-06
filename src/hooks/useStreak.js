import { useMemo } from 'react'
import { calculateStreak } from '../utils/dateHelpers'

/**
 * Custom hook for calculating streak from date array
 */
export function useStreak(dates) {
  const streak = useMemo(() => {
    return calculateStreak(dates)
  }, [dates])

  return streak
}

