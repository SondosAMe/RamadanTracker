import { useMemo } from 'react'
import { PrayerCard } from './PrayerCard'
import { PRAYERS } from '../../utils/constants'
import { isTimePast } from '../../utils/dateHelpers'

export function PrayerList({ 
  prayerTimes, 
  prayerStatus, 
  onTogglePrayer,
  exemptDays = false 
}) {
  // Determine next prayer
  const nextPrayerId = useMemo(() => {
    if (!prayerTimes) return null
    
    for (const prayer of PRAYERS) {
      const time = prayerTimes[prayer.id]
      if (time && !isTimePast(time)) {
        return prayer.id
      }
    }
    return null
  }, [prayerTimes])
  
  if (!prayerTimes) {
    return (
      <div className="space-y-3">
        {PRAYERS.map((prayer, index) => (
          <div 
            key={prayer.id}
            className="p-4 rounded-xl bg-surface shimmer"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-lg bg-background-alt" />
              <div className="flex-1">
                <div className="h-4 w-24 bg-background-alt rounded mb-2" />
                <div className="h-3 w-16 bg-background-alt rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }
  
  // Debug: Log prayer times to see what we're getting
  if (prayerTimes) {
    console.log('Prayer times received:', prayerTimes)
    console.log('Dhuhr time:', prayerTimes.dhuhr)
  }
  
  return (
    <div className="space-y-3">
      {PRAYERS.map((prayer, index) => {
        const status = prayerStatus[prayer.id] || { completed: false, actualTime: null }
        const time = prayerTimes?.[prayer.id] || null
        
        // Always render all prayers, even if time is missing
        return (
          <PrayerCard
            key={prayer.id}
            prayer={prayer}
            time={time}
            completed={status.completed === true}
            actualTime={status.actualTime}
            onToggle={(actualTime) => onTogglePrayer(prayer.id, actualTime)}
            isNext={prayer.id === nextPrayerId}
            isExempt={exemptDays}
            index={index}
          />
        )
      })}
    </div>
  )
}
