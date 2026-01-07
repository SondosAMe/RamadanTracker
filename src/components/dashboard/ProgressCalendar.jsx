import { useState, useMemo } from 'react'
import { Card } from '../common'
import { generateCalendarDays, formatDateKey, isToday, isSameDay } from '../../utils/dateHelpers'

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 
                'July', 'August', 'September', 'October', 'November', 'December']

export function ProgressCalendar({ 
  dailyData = [],
  onDateClick,
  selectedDate = null
}) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  
  const days = useMemo(() => {
    return generateCalendarDays(currentMonth.getFullYear(), currentMonth.getMonth())
  }, [currentMonth])

  // Create a map of date keys to scores for quick lookup
  const scoreMap = useMemo(() => {
    const map = {}
    dailyData.forEach(day => {
      map[day.date] = day.overallScore
    })
    return map
  }, [dailyData])

  const getScoreColor = (score) => {
    if (!score && score !== 0) return 'bg-background-alt'
    if (score >= 80) return 'bg-success'
    if (score >= 60) return 'bg-primary'
    if (score >= 40) return 'bg-warning'
    return 'bg-error/50'
  }

  const prevMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1))
  }

  const nextMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1))
  }

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          className="p-2 rounded-lg hover:bg-primary/10 transition-colors"
        >
          <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <h3 className="font-semibold text-text">
          {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>
        
        <button
          onClick={nextMonth}
          className="p-2 rounded-lg hover:bg-primary/10 transition-colors"
        >
          <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      
      {/* Weekday headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {WEEKDAYS.map(day => (
          <div key={day} className="text-center text-xs font-medium text-text-light py-2">
            {day}
          </div>
        ))}
      </div>
      
      {/* Days grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((date, index) => {
          if (!date) {
            return <div key={`empty-${index}`} className="aspect-square" />
          }
          
          const dateKey = formatDateKey(date)
          const score = scoreMap[dateKey]
          const today = isToday(date)
          const selected = selectedDate && isSameDay(date, selectedDate)
          
          return (
            <button
              key={dateKey}
              onClick={() => onDateClick?.(date)}
              className={`
                aspect-square rounded-lg flex flex-col items-center justify-center
                text-xs font-medium transition-all duration-200 relative
                ${today ? 'ring-2 ring-primary' : ''}
                ${selected ? 'ring-2 ring-secondary' : ''}
                ${getScoreColor(score)}
                ${score !== undefined ? 'text-white' : 'text-text-light bg-background-alt'}
                hover:scale-110 hover:z-10
              `}
              title={score !== undefined ? `Score: ${score}%` : 'No data'}
            >
              <span>{date.getDate()}</span>
              {score !== undefined && (
                <span className="text-[8px] opacity-80 mt-0.5">{score}%</span>
              )}
            </button>
          )
        })}
      </div>
      
      {/* Legend */}
      <div className="mt-4 flex items-center justify-center gap-4 text-xs">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-success" />
          <span className="text-text-light">80-100%</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-primary" />
          <span className="text-text-light">60-79%</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-warning" />
          <span className="text-text-light">40-59%</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-error/50" />
          <span className="text-text-light">0-39%</span>
        </div>
      </div>
    </Card>
  )
}

