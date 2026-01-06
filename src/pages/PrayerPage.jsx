import { PageLayout } from '../components/layout'
import { PrayerCountdown, PrayerList, DailyProgress } from '../components/prayer'
import { Card, LocationIcon, InfoIcon } from '../components/common'
import { useApp } from '../context/AppContext'
import { usePrayerTimes } from '../hooks/usePrayerTimes'
import { useCountdown } from '../hooks/useCountdown'
import { formatDateKey } from '../utils/dateHelpers'

export function PrayerPage() {
  const { settings, togglePrayer, getPrayerStatus, isPeriodDay } = useApp()
  const { lat, lng } = settings.location
  
  const { prayerTimes, loading, error } = usePrayerTimes(lat, lng, settings.calculationMethod)
  const countdown = useCountdown(prayerTimes)
  
  const todayStatus = getPrayerStatus(formatDateKey())
  const isExempt = isPeriodDay()
  
  return (
    <PageLayout title="Prayer Times" showLocation>
      <div className="space-y-4">
        {/* Location error */}
        {!lat && !lng && (
          <Card className="bg-warning/10 border border-warning/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-warning/20 flex items-center justify-center text-warning">
                <LocationIcon className="w-5 h-5" />
              </div>
              <div>
                <p className="font-medium text-text">Location Required</p>
                <p className="text-sm text-text-light">
                  Please enable location services to get accurate prayer times.
                </p>
              </div>
            </div>
          </Card>
        )}
        
        {/* API error */}
        {error && (
          <Card className="bg-error/10 border border-error/20">
            <p className="text-error text-sm">{error}</p>
          </Card>
        )}
        
        {/* Period exemption notice */}
        {isExempt && (
          <Card className="bg-primary/5 border border-primary/20">
            <div className="flex items-center gap-3">
              <div className="text-primary">
                <InfoIcon className="w-5 h-5" />
              </div>
              <p className="text-sm text-text">
                You are exempt from prayer today based on your period tracker.
              </p>
            </div>
          </Card>
        )}
        
        {/* Countdown to next prayer */}
        <PrayerCountdown 
          nextPrayer={countdown.nextPrayer} 
          countdown={countdown.formatted}
        />
        
        {/* Daily progress */}
        <Card>
          <DailyProgress prayerStatus={todayStatus} />
        </Card>
        
        {/* Prayer list */}
        <div>
          <h2 className="text-lg font-semibold text-text mb-3">Today's Prayers</h2>
          <PrayerList
            prayerTimes={prayerTimes}
            prayerStatus={todayStatus}
            onTogglePrayer={togglePrayer}
            exemptDays={isExempt}
          />
        </div>
      </div>
    </PageLayout>
  )
}

