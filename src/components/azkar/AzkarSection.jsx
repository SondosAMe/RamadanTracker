import { useNavigate } from 'react-router-dom'
import { Card, StreakBadge, SunriseIcon, MoonIcon, ProgressBar } from '../common'
import { useStreak } from '../../hooks/useStreak'

export function AzkarSection({ 
  type, 
  completed, 
  completedDates = [],
  completionPercentage = 0
}) {
  const streak = useStreak(completedDates)
  const navigate = useNavigate()
  
  const config = {
    morning: {
      title: 'Morning Azkar',
      arabic: 'أذكار الصباح',
      Icon: SunriseIcon,
      iconColor: 'text-orange-400',
      time: 'After Fajr until sunrise'
    },
    evening: {
      title: 'Evening Azkar',
      arabic: 'أذكار المساء',
      Icon: MoonIcon,
      iconColor: 'text-indigo-400',
      time: 'After Asr until Maghrib'
    }
  }
  
  const { title, arabic, Icon, iconColor, time } = config[type]
  
  const handleClick = () => {
    navigate(`/azkar/${type}`)
  }
  
  return (
    <Card 
      className={`
        cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-primary/20
        ${completed ? 'bg-success/5 border border-success/20' : ''}
      `}
      onClick={handleClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3 flex-1">
          <div className={`w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center ${iconColor}`}>
            <Icon className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-text">{title}</h3>
              <span className="arabic text-secondary">{arabic}</span>
            </div>
            <p className="text-sm text-text-light mt-0.5">{time}</p>
            
            {/* Progress bar */}
            <div className="mt-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-text-light">Completion</span>
                <span className="text-xs font-medium text-text">{completionPercentage}%</span>
              </div>
              <ProgressBar 
                value={completionPercentage} 
                max={100} 
                color={completed ? "success" : "primary"}
                className="h-2"
              />
            </div>
          </div>
        </div>
      </div>
      
      {streak > 0 && (
        <div className="mt-3 pt-3 border-t border-primary/10">
          <StreakBadge count={streak} />
        </div>
      )}
    </Card>
  )
}

