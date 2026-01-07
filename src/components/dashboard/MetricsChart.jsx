import { Card } from '../common'

export function MetricsChart({ 
  data = [],
  metric = 'overallScore',
  label = 'Score',
  color = 'primary'
}) {
  if (data.length === 0) {
    return (
      <Card>
        <p className="text-text-light text-center py-4">No data available</p>
      </Card>
    )
  }

  // Helper to get metric value for calculations
  const getMetricValueForCalc = (day, metric) => {
    if (metric === 'prayers') {
      return day.prayers?.percentage || 0
    }
    return day[metric] || 0
  }

  const maxValue = Math.max(...data.map(d => getMetricValueForCalc(d, metric)), 100)
  const minValue = Math.min(...data.map(d => getMetricValueForCalc(d, metric)), 0)

  // Show last 30 days or all data if less
  const displayData = data.slice(0, 30).reverse()

  // Helper to get metric value
  const getMetricValue = (day, metric) => {
    if (metric === 'prayers') {
      return day.prayers?.percentage || 0
    }
    return day[metric] || 0
  }

  return (
    <Card>
      <h3 className="font-semibold text-text mb-4">{label} Over Time</h3>
      
      <div className="relative h-48">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-xs text-text-light pr-2">
          <span>{Math.round(maxValue)}</span>
          <span>{Math.round((maxValue + minValue) / 2)}</span>
          <span>{Math.round(minValue)}</span>
        </div>
        
        {/* Chart area */}
        <div className="ml-8 h-full flex items-end gap-1">
          {displayData.map((day, index) => {
            const value = getMetricValue(day, metric)
            const height = maxValue > 0 ? (value / maxValue) * 100 : 0
            
            return (
              <div
                key={day.date}
                className="flex-1 flex flex-col items-center group relative"
                title={`${new Date(day.date).toLocaleDateString()}: ${value}%`}
              >
                <div
                  className={`
                    w-full rounded-t transition-all duration-300 hover:opacity-80
                    ${color === 'primary' ? 'bg-primary' : color === 'success' ? 'bg-success' : color === 'warning' ? 'bg-warning' : 'bg-primary'}
                  `}
                  style={{ height: `${height}%`, minHeight: value > 0 ? '2px' : '0' }}
                />
                {/* Tooltip */}
                <div className="absolute bottom-full mb-2 hidden group-hover:block bg-text text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10">
                  {value}%
                </div>
              </div>
            )
          })}
        </div>
      </div>
      
      {/* X-axis - show first, middle, last dates */}
      <div className="ml-8 mt-2 flex justify-between text-xs text-text-light">
        <span>{displayData[0] ? new Date(displayData[0].date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : ''}</span>
        <span>{displayData[Math.floor(displayData.length / 2)] ? new Date(displayData[Math.floor(displayData.length / 2)].date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : ''}</span>
        <span>{displayData[displayData.length - 1] ? new Date(displayData[displayData.length - 1].date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : ''}</span>
      </div>
    </Card>
  )
}

