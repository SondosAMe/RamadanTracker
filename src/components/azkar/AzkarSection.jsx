import { Checkbox, Card, StreakBadge, SunriseIcon, MoonIcon } from '../common'
import { useStreak } from '../../hooks/useStreak'

export function AzkarSection({ 
  type, 
  completed, 
  onToggle, 
  completedDates = [] 
}) {
  const streak = useStreak(completedDates)
  
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
  
  return (
    <Card className={completed ? 'bg-success/5 border border-success/20' : ''}>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center ${iconColor}`}>
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-text">{title}</h3>
              <span className="arabic text-secondary">{arabic}</span>
            </div>
            <p className="text-sm text-text-light mt-0.5">{time}</p>
          </div>
        </div>
        
        <Checkbox
          checked={completed}
          onChange={() => onToggle(type)}
          size="lg"
        />
      </div>
      
      {streak > 0 && (
        <div className="mt-3 pt-3 border-t border-primary/10">
          <StreakBadge count={streak} />
        </div>
      )}
    </Card>
  )
}

