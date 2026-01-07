import { useState } from 'react'
import { Card, Checkbox, CheckCircleIcon } from '../common'

export function AzkarItem({
  item,
  count = 0,
  completed = false,
  onIncrement,
  onToggleComplete
}) {
  const [isAnimating, setIsAnimating] = useState(false)
  const percentage = item.repetitions > 0 ? Math.min(100, (count / item.repetitions) * 100) : 0
  const isGoalReached = count >= item.repetitions

  const handleTap = () => {
    // Vibration feedback if available
    if ('vibrate' in navigator) {
      navigator.vibrate(10)
    }
    
    // Trigger animation
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 200)
    
    // Special feedback when reaching goal
    if (count + 1 === item.repetitions) {
      if ('vibrate' in navigator) {
        navigator.vibrate([100, 50, 100])
      }
    }
    
    onIncrement()
  }

  return (
    <Card className={`transition-all duration-300 ${completed ? 'bg-success/5 border-success/20' : ''}`}>
      <div className="flex items-start gap-4">
        {/* Content */}
        <div className="flex-1">
          {/* Arabic text */}
          <p className="arabic text-2xl text-secondary mb-2 leading-relaxed">{item.arabic}</p>
          
          {/* Transliteration and meaning */}
          <p className="text-sm text-text font-medium mb-1">{item.transliteration}</p>
          <p className="text-xs text-text-light mb-3">{item.meaning}</p>
          
          {/* Source */}
          <p className="text-xs text-text-light opacity-70 mb-4">{item.source}</p>
          
          {/* Counter section */}
          <div className="flex items-center gap-4">
            {/* Counter button */}
            <button
              onClick={handleTap}
              type="button"
              className={`
                relative w-20 h-20 rounded-full flex items-center justify-center
                transition-all duration-150 cursor-pointer select-none
                ${isGoalReached 
                  ? 'bg-gradient-to-br from-success to-success-light shadow-md shadow-success/30' 
                  : 'bg-gradient-to-br from-primary to-primary-light shadow-md shadow-primary/30'
                }
                ${isAnimating ? 'scale-90' : 'scale-100'}
                pulse-on-tap
              `}
            >
              <div className="text-white relative z-10 text-center">
                <span className={`text-2xl font-bold block ${isAnimating ? 'count-bump' : ''}`}>
                  {count}
                </span>
                <p className="text-xs opacity-80">/ {item.repetitions}</p>
              </div>
              
              {/* Progress ring */}
              <svg 
                className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
                viewBox="0 0 80 80"
              >
                <circle
                  cx="40"
                  cy="40"
                  r="36"
                  fill="none"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="3"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="36"
                  fill="none"
                  stroke="rgba(255,255,255,0.8)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 36}`}
                  strokeDashoffset={`${2 * Math.PI * 36 * (1 - percentage / 100)}`}
                  className="transition-all duration-300 ease-out"
                />
              </svg>
            </button>
            
            {/* Progress text */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-text-light">Progress</span>
                <span className="text-xs font-medium text-text">{Math.round(percentage)}%</span>
              </div>
              <div className="w-full h-2 bg-background-alt rounded-full overflow-hidden">
                <div 
                  className={`h-full transition-all duration-300 rounded-full ${
                    isGoalReached ? 'bg-success' : 'bg-primary'
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          </div>
          
          {/* Goal reached message */}
          {isGoalReached && !completed && (
            <div className="flex items-center gap-2 text-success text-sm mt-3 slide-up">
              <CheckCircleIcon className="w-4 h-4" />
              <span>Goal reached! Mark as completed</span>
            </div>
          )}
        </div>
        
        {/* Checkbox */}
        <div className="pt-2">
          <Checkbox
            checked={completed}
            onChange={onToggleComplete}
            disabled={!isGoalReached}
            size="lg"
            className={!isGoalReached ? 'opacity-50' : ''}
          />
        </div>
      </div>
    </Card>
  )
}

