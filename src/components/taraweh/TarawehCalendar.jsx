import { Calendar } from '../common'
import { getRamadanDates, formatDateKey } from '../../utils/dateHelpers'

export function TarawehCalendar({ tarawehData = {} }) {
  const completedDates = Object.entries(tarawehData)
    .filter(([_, value]) => value.completed)
    .map(([date]) => date)
  
  const year = new Date().getFullYear()
  const { start, end } = getRamadanDates(year)
  
  // Generate Ramadan dates
  const ramadanDates = []
  const current = new Date(start)
  while (current <= end) {
    ramadanDates.push(formatDateKey(current))
    current.setDate(current.getDate() + 1)
  }
  
  return (
    <div>
      <h3 className="font-semibold text-text mb-3">Ramadan Taraweh Progress</h3>
      <Calendar
        completedDates={completedDates}
        markedDates={ramadanDates}
      />
      
      <div className="mt-4 flex items-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-success/20" />
          <span className="text-text-light">Completed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-error/20" />
          <span className="text-text-light">Ramadan</span>
        </div>
      </div>
    </div>
  )
}

