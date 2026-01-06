import { useState } from 'react'
import { formatTime12h, isTimePast, getCurrentTime } from '../../utils/dateHelpers'
import { Checkbox, CheckCircleIcon } from '../common'

export function PrayerCard({ 
  prayer, 
  time, 
  completed, 
  actualTime,
  onToggle,
  isNext = false,
  isExempt = false,
  index = 0
}) {
  const [showTimeInput, setShowTimeInput] = useState(false)
  const [inputTime, setInputTime] = useState('')
  
  const isPast = time ? isTimePast(time) : false
  const isMissed = isPast && !completed && !isExempt
  
  const handleToggle = () => {
    if (showTimeInput && inputTime) {
      onToggle(inputTime)
      setShowTimeInput(false)
      setInputTime('')
    } else if (!completed) {
      onToggle(getCurrentTime())
    } else {
      onToggle(null)
    }
  }
  
  return (
    <div 
      className={`
        stagger-item p-4 rounded-xl border-2 transition-all duration-300
        ${isNext ? 'border-primary/50 bg-primary/5 prayer-active' : 'border-transparent bg-surface'}
        ${completed ? 'prayer-time-completed' : ''}
        ${isMissed ? 'border-error/30 bg-error/5' : ''}
        ${isExempt ? 'opacity-50' : ''}
      `}
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Checkbox
            checked={completed}
            onChange={handleToggle}
            disabled={isExempt}
          />
          
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-text">{prayer.name}</span>
              <span className="arabic text-secondary text-sm">{prayer.arabic}</span>
            </div>
            
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm text-text-light font-mono">
                {time ? formatTime12h(time) : '--:--'}
              </span>
              
              {completed && actualTime && (
                <span className="text-xs text-success flex items-center gap-1">
                  <CheckCircleIcon className="w-3 h-3" />
                  {formatTime12h(actualTime)}
                </span>
              )}
              
              {isNext && !completed && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-gradient-to-r from-primary to-primary-light text-white font-medium glow-pulse">
                  Next
                </span>
              )}
              
              {isMissed && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-error/20 text-error font-medium">
                  Missed
                </span>
              )}
              
              {isExempt && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-text-light/20 text-text-light">
                  Exempt
                </span>
              )}
            </div>
          </div>
        </div>
        
        {/* Time input toggle */}
        {!completed && !isExempt && (
          <button
            onClick={() => setShowTimeInput(!showTimeInput)}
            className="p-2 rounded-lg hover:bg-primary/10 text-text-light transition-colors"
            title="Log custom time"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        )}
      </div>
      
      {/* Custom time input */}
      {showTimeInput && (
        <div className="mt-3 flex items-center gap-2 slide-up">
          <input
            type="time"
            value={inputTime}
            onChange={(e) => setInputTime(e.target.value)}
            className="flex-1 px-3 py-2 rounded-lg bg-background border-2 border-primary/20 text-text text-sm focus:border-primary focus:outline-none transition-colors"
          />
          <button
            onClick={handleToggle}
            disabled={!inputTime}
            className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium disabled:opacity-50 hover:bg-primary-light transition-colors"
          >
            Save
          </button>
        </div>
      )}
    </div>
  )
}
