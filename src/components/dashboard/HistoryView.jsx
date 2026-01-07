import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { PageLayout } from '../layout'
import { Card, ProgressBar, CheckCircleIcon } from '../common'
import { Calendar } from '../common'
import { useApp } from '../../context/AppContext'
import { formatDateKey, parseDateKey } from '../../utils/dateHelpers'
import { PRAYERS } from '../../utils/constants'

export function HistoryView() {
  const [searchParams] = useSearchParams()
  const {
    getPrayerStatus,
    getAzkarStatus,
    getAzkarCompletion,
    getTarawehStatus,
    getDeedsByDate,
    quran,
    isPeriodDay
  } = useApp()

  const [selectedDate, setSelectedDate] = useState(() => {
    const dateParam = searchParams.get('date')
    return dateParam ? new Date(dateParam) : new Date()
  })

  useEffect(() => {
    const dateParam = searchParams.get('date')
    if (dateParam) {
      setSelectedDate(new Date(dateParam))
    }
  }, [searchParams])

  const dateKey = formatDateKey(selectedDate)
  const prayerStatus = getPrayerStatus(dateKey)
  const azkarStatus = getAzkarStatus(dateKey)
  const morningCompletion = getAzkarCompletion('morning', dateKey)
  const eveningCompletion = getAzkarCompletion('evening', dateKey)
  const tarawehStatus = getTarawehStatus(dateKey)
  const deeds = getDeedsByDate(dateKey)
  const isPeriod = isPeriodDay(dateKey)

  const prayersCompleted = PRAYERS.filter(p => prayerStatus[p.id]?.completed).length
  const prayerPercentage = (prayersCompleted / 5) * 100

  return (
    <PageLayout title="History">
      <div className="space-y-6">
        {/* Date selector */}
        <Card>
          <h3 className="font-semibold text-text mb-4">Select Date</h3>
          <Calendar
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
          />
        </Card>

        {/* Period notice */}
        {isPeriod && (
          <Card className="bg-error/10 border border-error/20">
            <p className="text-sm text-error">
              <strong>Note:</strong> This day is marked as a period day. Some activities may not be applicable.
            </p>
          </Card>
        )}

        {/* Prayer status */}
        <Card>
          <h3 className="font-semibold text-text mb-3">Prayers</h3>
          <ProgressBar value={prayersCompleted} max={5} color="success" className="mb-3" />
          <div className="grid grid-cols-2 gap-2">
            {PRAYERS.map(prayer => (
              <div
                key={prayer.id}
                className={`
                  p-2 rounded-lg flex items-center justify-between
                  ${prayerStatus[prayer.id]?.completed ? 'bg-success/10' : 'bg-background-alt'}
                `}
              >
                <span className="text-sm text-text">{prayer.name}</span>
                {prayerStatus[prayer.id]?.completed && (
                  <CheckCircleIcon className="w-4 h-4 text-success" />
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Azkar status */}
        <Card>
          <h3 className="font-semibold text-text mb-3">Azkar</h3>
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-text">Morning Azkar</span>
                <span className="text-sm font-medium text-text">{morningCompletion.percentage}%</span>
              </div>
              <ProgressBar value={morningCompletion.completed} max={morningCompletion.total} color="primary" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-text">Evening Azkar</span>
                <span className="text-sm font-medium text-text">{eveningCompletion.percentage}%</span>
              </div>
              <ProgressBar value={eveningCompletion.completed} max={eveningCompletion.total} color="primary" />
            </div>
          </div>
        </Card>

        {/* Taraweh */}
        <Card>
          <h3 className="font-semibold text-text mb-3">Taraweh</h3>
          <div className={`
            p-3 rounded-lg flex items-center justify-between
            ${tarawehStatus.completed ? 'bg-success/10' : 'bg-background-alt'}
          `}>
            <span className="text-sm text-text">
              {tarawehStatus.completed ? 'Completed' : 'Not completed'}
              {tarawehStatus.location && ` - ${tarawehStatus.location === 'mosque' ? 'At Mosque' : 'At Home'}`}
            </span>
            {tarawehStatus.completed && (
              <CheckCircleIcon className="w-4 h-4 text-success" />
            )}
          </div>
        </Card>

        {/* Good Deeds */}
        <Card>
          <h3 className="font-semibold text-text mb-3">Good Deeds</h3>
          {deeds.length > 0 ? (
            <div className="space-y-2">
              {deeds.map(deed => (
                <div key={deed.id} className="p-2 rounded-lg bg-background-alt">
                  <p className="text-sm font-medium text-text">{deed.description}</p>
                  {deed.category && (
                    <p className="text-xs text-text-light mt-1">Category: {deed.category}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-text-light text-center py-2">No deeds recorded for this day</p>
          )}
        </Card>
      </div>
    </PageLayout>
  )
}

