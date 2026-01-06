import { useMemo } from 'react'
import { ProgressCircle } from '../common'
import { PRAYERS } from '../../utils/constants'

export function DailyProgress({ prayerStatus }) {
  const stats = useMemo(() => {
    const total = PRAYERS.length
    // Only count prayers where completed is explicitly true
    const completed = PRAYERS.filter(p => {
      const status = prayerStatus[p.id]
      return status && status.completed === true
    }).length
    const percentage = Math.round((completed / total) * 100)
    
    return { total, completed, percentage }
  }, [prayerStatus])
  
  return (
    <div className="flex items-center gap-4">
      <ProgressCircle
        value={stats.completed}
        max={stats.total}
        size={80}
        strokeWidth={6}
        color="success"
      >
        <span className="text-lg font-bold text-success">{stats.completed}</span>
        <span className="text-xs text-text-light">/{stats.total}</span>
      </ProgressCircle>
      
      <div>
        <p className="text-sm text-text-light">Today's Progress</p>
        <p className="text-2xl font-bold text-text">{stats.percentage}%</p>
        <p className="text-xs text-text-light">
          {stats.completed === stats.total 
            ? '✨ All prayers completed!' 
            : `${stats.total - stats.completed} remaining`
          }
        </p>
      </div>
    </div>
  )
}

