import { PageLayout } from '../components/layout'
import { TarawehTracker, TarawehCalendar } from '../components/taraweh'
import { Card, MoonIcon } from '../components/common'
import { useApp } from '../context/AppContext'
import { formatDateKey, isRamadan } from '../utils/dateHelpers'

export function TarawehPage() {
  const { taraweh, toggleTaraweh, getTarawehStatus } = useApp()
  
  const todayStatus = getTarawehStatus()
  const completedDates = Object.entries(taraweh)
    .filter(([_, v]) => v.completed)
    .map(([date]) => date)
  
  const isRamadanNow = isRamadan()
  
  return (
    <PageLayout title="Taraweh Prayer">
      <div className="space-y-6">
        {/* Ramadan notice */}
        {!isRamadanNow && (
          <Card className="bg-secondary/10 border border-secondary/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                <MoonIcon className="w-5 h-5" />
              </div>
              <div>
                <p className="font-medium text-text">Outside Ramadan</p>
                <p className="text-sm text-text-light">
                  Taraweh is specifically for Ramadan nights, but you can still track voluntary night prayers.
                </p>
              </div>
            </div>
          </Card>
        )}
        
        {/* Today's tracker */}
        <TarawehTracker
          completed={todayStatus.completed}
          location={todayStatus.location}
          onToggle={toggleTaraweh}
          completedDates={completedDates}
        />
        
        {/* Stats */}
        <Card>
          <h3 className="font-semibold text-text mb-3">Statistics</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-background-alt rounded-xl">
              <p className="text-2xl font-bold text-primary">{completedDates.length}</p>
              <p className="text-xs text-text-light">Total Nights</p>
            </div>
            <div className="text-center p-3 bg-background-alt rounded-xl">
              <p className="text-2xl font-bold text-success">
                {Object.values(taraweh).filter(v => v.location === 'mosque').length}
              </p>
              <p className="text-xs text-text-light">At Mosque</p>
            </div>
          </div>
        </Card>
        
        {/* Calendar view */}
        <Card>
          <TarawehCalendar tarawehData={taraweh} />
        </Card>
      </div>
    </PageLayout>
  )
}

