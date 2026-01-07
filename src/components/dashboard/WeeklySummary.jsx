import { Card, ProgressBar } from '../common'

export function WeeklySummary({ weeklyData = [] }) {
  if (weeklyData.length === 0) {
    return (
      <Card>
        <p className="text-text-light text-center py-4">No weekly data available</p>
      </Card>
    )
  }

  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-text">Weekly Summary</h3>
      {weeklyData.slice(0, 4).map((week, index) => (
        <Card key={week.weekStart} className="card-animate" style={{ animationDelay: `${index * 0.1}s` }}>
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-sm font-medium text-text">Week of {new Date(week.weekStart).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
              <p className="text-xs text-text-light">{week.days} days</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-primary">{week.averageScore}%</p>
              <p className="text-xs text-text-light">Avg Score</p>
            </div>
          </div>
          
          <ProgressBar value={week.averageScore} max={100} color="primary" className="mb-3" />
          
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div>
              <p className="text-text-light">Prayers</p>
              <p className="font-semibold text-text">{week.totalPrayers}</p>
            </div>
            <div>
              <p className="text-text-light">Azkar</p>
              <p className="font-semibold text-text">{week.averageAzkar}%</p>
            </div>
            <div>
              <p className="text-text-light">Taraweh</p>
              <p className="font-semibold text-text">{week.tarawehNights}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}

