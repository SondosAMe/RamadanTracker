import { Card, ProgressBar } from '../common'

export function MonthlySummary({ monthlyData = [] }) {
  if (monthlyData.length === 0) {
    return (
      <Card>
        <p className="text-text-light text-center py-4">No monthly data available</p>
      </Card>
    )
  }

  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-text">Monthly Summary</h3>
      {monthlyData.slice(0, 6).map((month, index) => {
        const [year, monthNum] = month.month.split('-')
        const monthName = new Date(year, parseInt(monthNum) - 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
        
        return (
          <Card key={month.month} className="card-animate" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-sm font-medium text-text">{monthName}</p>
                <p className="text-xs text-text-light">{month.days} days tracked</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">{month.averageScore}%</p>
                <p className="text-xs text-text-light">Avg Score</p>
              </div>
            </div>
            
            <ProgressBar value={month.averageScore} max={100} color="primary" className="mb-3" />
            
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <p className="text-text-light">Total Prayers</p>
                <p className="font-semibold text-text text-lg">{month.totalPrayers}</p>
              </div>
              <div>
                <p className="text-text-light">Taraweh Nights</p>
                <p className="font-semibold text-text text-lg">{month.tarawehNights}</p>
              </div>
              <div>
                <p className="text-text-light">Azkar Average</p>
                <p className="font-semibold text-text">{month.averageAzkar}%</p>
              </div>
              <div>
                <p className="text-text-light">Good Deeds</p>
                <p className="font-semibold text-text">{month.totalDeeds}</p>
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}

