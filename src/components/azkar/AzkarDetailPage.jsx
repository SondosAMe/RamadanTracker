import { PageLayout } from '../layout'
import { AzkarItem } from './AzkarItem'
import { Card, ProgressBar, SunriseIcon, MoonIcon, CheckCircleIcon } from '../common'
import { useApp } from '../../context/AppContext'
import { MORNING_AZKAR, EVENING_AZKAR } from '../../utils/azkarData'
import { formatDateKey } from '../../utils/dateHelpers'

export function AzkarDetailPage({ type = 'morning' }) {
  const {
    incrementAzkarItem,
    toggleAzkarItem,
    getAzkarItemCount,
    getAzkarItemStatus,
    getAzkarCompletion
  } = useApp()

  const today = formatDateKey()
  const azkarList = type === 'morning' ? MORNING_AZKAR : EVENING_AZKAR
  const completion = getAzkarCompletion(type, today)

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
    <PageLayout title={title}>
      <div className="space-y-6">
        {/* Header card */}
        <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center ${iconColor}`}>
              <Icon className="w-8 h-8" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-xl font-bold text-text">{title}</h2>
                <span className="arabic text-secondary text-lg">{arabic}</span>
              </div>
              <p className="text-sm text-text-light">{time}</p>
            </div>
          </div>
        </Card>

        {/* Overall progress */}
        <Card>
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-semibold text-text">Overall Progress</h3>
              <p className="text-sm text-text-light">
                {completion.completed} of {completion.total} completed
              </p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-primary">{completion.percentage}%</p>
              {completion.percentage === 100 && (
                <div className="flex items-center gap-1 text-success text-sm mt-1">
                  <CheckCircleIcon className="w-4 h-4" />
                  <span>Complete!</span>
                </div>
              )}
            </div>
          </div>
          <ProgressBar 
            value={completion.completed} 
            max={completion.total} 
            color="primary"
          />
        </Card>

        {/* Azkar items */}
        <div className="space-y-4">
          <h3 className="font-semibold text-text flex items-center gap-2">
            Azkar Items
            <span className="arabic text-secondary text-sm">الأذكار</span>
          </h3>
          {azkarList.map((item) => {
            const status = getAzkarItemStatus(type, item.id, today)
            return (
              <AzkarItem
                key={item.id}
                item={item}
                count={status.count}
                completed={status.completed}
                onIncrement={() => incrementAzkarItem(type, item.id)}
              />
            )
          })}
        </div>
      </div>
    </PageLayout>
  )
}

