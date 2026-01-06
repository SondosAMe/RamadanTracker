import { Card, Checkbox, StreakBadge, MosqueIcon, HomeIcon } from '../common'
import { useStreak } from '../../hooks/useStreak'
import { isRamadan } from '../../utils/dateHelpers'

export function TarawehTracker({ 
  completed, 
  location,
  onToggle,
  completedDates = []
}) {
  const streak = useStreak(completedDates)
  const isRamadanNow = isRamadan()
  
  return (
    <Card className={completed ? 'bg-success/5 border border-success/20' : ''}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-text">Taraweh Prayer</h3>
            <span className="arabic text-secondary">صلاة التراويح</span>
          </div>
          <p className="text-sm text-text-light mt-0.5">
            {isRamadanNow ? 'Ramadan night prayer' : 'Available during Ramadan'}
          </p>
        </div>
        
        <Checkbox
          checked={completed}
          onChange={() => {
            if (completed) {
              // Uncomplete when clicking the checkbox
              onToggle('home', true)
            } else {
              // Complete with current location or default to home
              onToggle(location || 'home', false)
            }
          }}
          size="lg"
        />
      </div>
      
      {/* Location selection */}
      {completed && (
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => onToggle('mosque')}
            className={`
              flex-1 py-2 px-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2
              transition-all duration-200
              ${location === 'mosque'
                ? 'bg-primary text-white'
                : 'bg-background-alt text-text hover:bg-primary/10'
              }
            `}
          >
            <MosqueIcon className="w-4 h-4" />
            At Mosque
          </button>
          <button
            onClick={() => onToggle('home')}
            className={`
              flex-1 py-2 px-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2
              transition-all duration-200
              ${location === 'home'
                ? 'bg-primary text-white'
                : 'bg-background-alt text-text hover:bg-primary/10'
              }
            `}
          >
            <HomeIcon className="w-4 h-4" />
            At Home
          </button>
        </div>
      )}
      
      {streak > 0 && (
        <div className="pt-3 border-t border-primary/10">
          <StreakBadge count={streak} label="night streak" />
        </div>
      )}
    </Card>
  )
}

