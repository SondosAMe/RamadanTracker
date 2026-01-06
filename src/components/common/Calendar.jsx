import { useState, useMemo } from 'react'
import { generateCalendarDays, formatDateKey, isToday, isSameDay } from '../../utils/dateHelpers'

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 
                'July', 'August', 'September', 'October', 'November', 'December']

export function Calendar({
  selectedDate,
  onDateSelect,
  markedDates = [],
  completedDates = [],
  className = ''
}) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  
  const days = useMemo(() => {
    return generateCalendarDays(currentMonth.getFullYear(), currentMonth.getMonth())
  }, [currentMonth])
  
  const prevMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1))
  }
  
  const nextMonth = () => {
    setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1))
  }
  
  const isMarked = (date) => {
    if (!date) return false
    return markedDates.includes(formatDateKey(date))
  }
  
  const isCompleted = (date) => {
    if (!date) return false
    return completedDates.includes(formatDateKey(date))
  }
  
  return (
    <div className={`bg-surface rounded-2xl p-4 ${className}`}>
      {/* Header */}
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
          
          const today = isToday(date)
          const selected = selectedDate && isSameDay(date, selectedDate)
          const marked = isMarked(date)
          const completed = isCompleted(date)
          
          return (
            <button
              key={date.toISOString()}
              onClick={() => onDateSelect?.(date)}
              className={`
                aspect-square rounded-lg flex flex-col items-center justify-center
                text-sm font-medium transition-all duration-200
                ${today ? 'ring-2 ring-primary' : ''}
                ${selected ? 'bg-primary text-white' : 'hover:bg-primary/10'}
                ${marked ? 'bg-error/20 text-error' : ''}
                ${completed ? 'bg-success/20 text-success' : ''}
              `}
            >
              <span>{date.getDate()}</span>
              {(marked || completed) && (
                <span className="w-1.5 h-1.5 rounded-full mt-0.5 bg-current" />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

