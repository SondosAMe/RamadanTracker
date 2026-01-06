import { useState, useRef } from 'react'
import { Card, Button, CheckCircleIcon } from '../common'
import { TASBEEH_GOALS } from '../../utils/constants'

export function TasbeehCounter({ 
  phrase, 
  count = 0, 
  goal = 33,
  onIncrement, 
  onReset,
  onSetGoal
}) {
  const [showGoals, setShowGoals] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const buttonRef = useRef(null)
  
  const percentage = Math.min(100, (count / goal) * 100)
  const isComplete = count >= goal
  
  const handleTap = () => {
    // Vibration feedback if available
    if ('vibrate' in navigator) {
      navigator.vibrate(10)
    }
    
    // Trigger animation
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 200)
    
    // Sound or visual feedback on completion
    if (count + 1 === goal) {
      if ('vibrate' in navigator) {
        navigator.vibrate([100, 50, 100])
      }
    }
    
    onIncrement()
  }
  
  return (
    <Card className="text-center relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="tasbeeh-pattern" x="0" y="0" width="15" height="15" patternUnits="userSpaceOnUse">
            <circle cx="7.5" cy="7.5" r="2" fill="currentColor" className="text-primary" />
          </pattern>
          <rect x="0" y="0" width="100" height="100" fill="url(#tasbeeh-pattern)" />
        </svg>
      </div>
      
      <div className="relative z-10">
        {/* Arabic phrase */}
        <p className="arabic text-3xl text-secondary mb-2">{phrase.phrase}</p>
        <p className="text-sm text-text-light mb-1">{phrase.transliteration}</p>
        <p className="text-xs text-text-light mb-6">{phrase.meaning}</p>
        
        {/* Counter button */}
        <div className="relative inline-block mb-6">
          {/* Outer glow ring */}
          <div 
            className={`
              absolute inset-[-8px] rounded-full transition-opacity duration-300
              ${isComplete ? 'opacity-100' : 'opacity-0'}
            `}
            style={{
              background: 'radial-gradient(circle, rgba(74,124,89,0.3) 0%, transparent 70%)'
            }}
          />
          
          {/* Progress ring SVG */}
          <svg 
            className="absolute inset-[-4px] w-[calc(100%+8px)] h-[calc(100%+8px)] -rotate-90 pointer-events-none"
            viewBox="0 0 168 168"
          >
            {/* Background circle */}
            <circle
              cx="84"
              cy="84"
              r="78"
              fill="none"
              stroke="currentColor"
              strokeWidth="6"
              className="text-background-alt"
            />
            {/* Progress circle */}
            <circle
              cx="84"
              cy="84"
              r="78"
              fill="none"
              stroke="url(#progress-gradient)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 78}`}
              strokeDashoffset={`${2 * Math.PI * 78 * (1 - percentage / 100)}`}
              className="transition-all duration-300 ease-out"
            />
            <defs>
              <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#D4AF37" />
                <stop offset="100%" stopColor="#1B4965" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Main button */}
          <button
            ref={buttonRef}
            onClick={handleTap}
            type="button"
            className={`
              relative w-40 h-40 rounded-full flex items-center justify-center
              transition-all duration-150 cursor-pointer select-none tasbeeh-button
              ${isComplete 
                ? 'bg-gradient-to-br from-success to-success-light shadow-lg shadow-success/30' 
                : 'bg-gradient-to-br from-primary to-primary-light shadow-lg shadow-primary/30'
              }
              ${isAnimating ? 'scale-92' : 'scale-100'}
            `}
          >
            {/* Ripple effect layer */}
            <span className="absolute inset-0 rounded-full overflow-hidden">
              <span 
                className={`
                  absolute inset-0 bg-white/20 rounded-full
                  ${isAnimating ? 'animate-ping' : 'opacity-0'}
                `}
              />
            </span>
            
            <div className="text-white relative z-10">
              <span className={`text-5xl font-bold block ${isAnimating ? 'count-bump' : ''}`}>
                {count}
              </span>
              <p className="text-sm opacity-80">/ {goal}</p>
            </div>
          </button>
        </div>
        
        {/* Completion message */}
        {isComplete && (
          <div className="flex items-center justify-center gap-2 text-success font-medium mb-4 slide-up">
            <CheckCircleIcon className="w-5 h-5" />
            <span>MashaAllah! Goal reached!</span>
          </div>
        )}
        
        {/* Actions */}
        <div className="flex gap-2 justify-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowGoals(!showGoals)}
            className="btn-islamic"
          >
            Goal: {goal}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
          >
            Reset
          </Button>
        </div>
        
        {/* Goal selection */}
        {showGoals && (
          <div className="mt-4 flex gap-2 justify-center flex-wrap slide-up">
            {TASBEEH_GOALS.map(g => (
              <button
                key={g}
                onClick={() => {
                  onSetGoal(g)
                  setShowGoals(false)
                }}
                className={`
                  px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
                  ${goal === g 
                    ? 'bg-gradient-to-r from-primary to-primary-light text-white shadow-md' 
                    : 'bg-background-alt text-text hover:bg-primary/10 hover:scale-105'
                  }
                `}
              >
                {g}
              </button>
            ))}
          </div>
        )}
      </div>
    </Card>
  )
}
