import { Calendar, Card, CalendarIcon, InfoIcon } from '../common'
import { formatDateKey } from '../../utils/dateHelpers'

export function PeriodTracker({ markedDays = [], onToggleDay }) {
  const handleDateSelect = (date) => {
    onToggleDay(formatDateKey(date))
  }
  
  return (
    <div className="space-y-4">
      <Card>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-error/10 flex items-center justify-center text-error">
            <CalendarIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-text">Period Days</h3>
            <p className="text-sm text-text-light">
              Tap dates to mark/unmark days
            </p>
          </div>
        </div>
        
        <Calendar
          markedDates={markedDays}
          onDateSelect={handleDateSelect}
        />
        
        <div className="mt-4 pt-4 border-t border-primary/10">
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-light">Days marked this cycle:</span>
            <span className="font-semibold text-text">{markedDays.length}</span>
          </div>
        </div>
      </Card>
      
      <Card className="bg-primary/5 border border-primary/20">
        <div className="flex items-start gap-3">
          <div className="text-primary mt-0.5">
            <InfoIcon className="w-5 h-5" />
          </div>
          <div className="text-sm text-text">
            <p className="font-medium mb-1">Prayer Exemptions</p>
            <p className="text-text-light">
              On marked days, prayer obligations are automatically adjusted. 
              You are exempt from fasting and prayer during these days.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}

