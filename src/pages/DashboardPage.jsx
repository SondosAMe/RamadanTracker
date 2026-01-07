import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageLayout } from '../components/layout'
import { Card } from '../components/common'
import {
  ProgressCalendar,
  WeeklySummary,
  MonthlySummary,
  MetricsChart
} from '../components/dashboard'
import { useHistoricalData } from '../hooks/useHistoricalData'

const PERIODS = [
  { id: 'week', label: 'Week' },
  { id: 'month', label: 'Month' },
  { id: 'year', label: 'Year' },
  { id: 'all', label: 'All Time' }
]

export function DashboardPage() {
  const [period, setPeriod] = useState('month')
  const [selectedDate, setSelectedDate] = useState(null)
  const navigate = useNavigate()

  const { dailyData, weeklyData, monthlyData, stats } = useHistoricalData(period)

  const handleDateClick = (date) => {
    setSelectedDate(date)
    // Navigate to history view with selected date
    navigate(`/history?date=${date.toISOString()}`)
  }

  return (
    <PageLayout title="Progress Dashboard">
      <div className="space-y-6">
        {/* Period selector */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-text">Time Period</h3>
            <div className="flex gap-2">
              {PERIODS.map(p => (
                <button
                  key={p.id}
                  onClick={() => setPeriod(p.id)}
                  className={`
                    px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
                    ${period === p.id
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-background-alt text-text hover:bg-primary/10'
                    }
                  `}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
          
          {/* Stats summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-background-alt rounded-xl">
              <p className="text-2xl font-bold text-primary">{stats.averageScore}%</p>
              <p className="text-xs text-text-light mt-1">Avg Score</p>
            </div>
            <div className="text-center p-3 bg-background-alt rounded-xl">
              <p className="text-2xl font-bold text-success">{stats.totalPrayers}</p>
              <p className="text-xs text-text-light mt-1">Prayers</p>
            </div>
            <div className="text-center p-3 bg-background-alt rounded-xl">
              <p className="text-2xl font-bold text-secondary">{stats.totalTarawehNights}</p>
              <p className="text-xs text-text-light mt-1">Taraweh</p>
            </div>
            <div className="text-center p-3 bg-background-alt rounded-xl">
              <p className="text-2xl font-bold text-warning">{stats.totalDeeds}</p>
              <p className="text-xs text-text-light mt-1">Deeds</p>
            </div>
          </div>
        </Card>

        {/* Calendar heatmap */}
        <ProgressCalendar
          dailyData={dailyData}
          onDateClick={handleDateClick}
          selectedDate={selectedDate}
        />

        {/* Overall score chart */}
        <MetricsChart
          data={dailyData}
          metric="overallScore"
          label="Overall Daily Score"
          color="primary"
        />

        {/* Prayer completion chart */}
        <MetricsChart
          data={dailyData}
          metric="prayers"
          label="Prayer Completion Rate (%)"
          color="success"
        />

        {/* Weekly summary */}
        {weeklyData.length > 0 && (
          <WeeklySummary weeklyData={weeklyData} />
        )}

        {/* Monthly summary */}
        {monthlyData.length > 0 && (
          <MonthlySummary monthlyData={monthlyData} />
        )}
      </div>
    </PageLayout>
  )
}

