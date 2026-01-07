import { Link } from 'react-router-dom'
import { PageLayout } from '../components/layout'
import { 
  Card, 
  ProgressCircle, 
  ProgressBar, 
  StreakBadge,
  CrescentIcon,
  MosqueIcon,
  SparklesIcon,
  BeadsIcon,
  SunriseIcon,
  MoonIcon,
  CheckCircleIcon,
  FireIcon,
  IslamicDivider
} from '../components/common'
import { DailyTodoList } from '../components/dashboard'
import { PrayerCountdown } from '../components/prayer'
import { useApp } from '../context/AppContext'
import { usePrayerTimes } from '../hooks/usePrayerTimes'
import { useCountdown } from '../hooks/useCountdown'
import { useStreak } from '../hooks/useStreak'
import { formatDateKey, isRamadan, getRamadanDates } from '../utils/dateHelpers'
import { PRAYERS } from '../utils/constants'

export function Dashboard() {
  const { 
    settings,
    getPrayerStatus,
    quran,
    getAzkarStatus,
    getAzkarCompletedDates,
    getTarawehStatus,
    getDeedsByDate,
    taraweh
  } = useApp()
  
  const { lat, lng } = settings.location
  const { prayerTimes } = usePrayerTimes(lat, lng, settings.calculationMethod)
  const countdown = useCountdown(prayerTimes)
  
  const todayStatus = getPrayerStatus(formatDateKey())
  const azkarStatus = getAzkarStatus()
  const tarawehStatus = getTarawehStatus()
  const todayDeeds = getDeedsByDate()
  
  const morningStreak = useStreak(getAzkarCompletedDates('morning'))
  const eveningStreak = useStreak(getAzkarCompletedDates('evening'))
  
  // Calculate prayer completion
  const prayersCompleted = PRAYERS.filter(p => todayStatus[p.id]?.completed).length
  const prayerPercentage = Math.round((prayersCompleted / 5) * 100)
  
  // Calculate Quran progress
  // Get unique completed Juz from daily tracking
  const allJuz = Object.values(quran.dailyJuz || {}).filter(j => j !== null && j !== undefined)
  const juzCompleted = [...new Set(allJuz)].length
  const quranPercentage = Math.round((juzCompleted / 30) * 100)
  
  // Ramadan countdown
  const isRamadanNow = isRamadan()
  const { start: ramadanStart } = getRamadanDates(new Date().getFullYear())
  const daysUntilRamadan = Math.ceil((ramadanStart - new Date()) / (1000 * 60 * 60 * 24))
  
  // Taraweh streak
  const tarawehCompletedDates = Object.entries(taraweh)
    .filter(([_, v]) => v.completed)
    .map(([date]) => date)
  const tarawehStreak = useStreak(tarawehCompletedDates)
  
  return (
    <PageLayout title="Ramadan Tracker" showLocation>
      <div className="space-y-5">
        {/* Ramadan countdown or status */}
        {!isRamadanNow && daysUntilRamadan > 0 && (
          <Card className="card-animate relative overflow-hidden bg-gradient-to-br from-primary/5 via-secondary/10 to-primary/5 border border-secondary/20">
            {/* Decorative pattern */}
            <div className="absolute inset-0 opacity-30">
              <svg className="w-full h-full" viewBox="0 0 100 60" preserveAspectRatio="none">
                <pattern id="ramadan-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M10 0 L20 10 L10 20 L0 10 Z" fill="none" stroke="currentColor" strokeWidth="0.3" className="text-secondary" />
                </pattern>
                <rect x="0" y="0" width="100" height="60" fill="url(#ramadan-pattern)" />
              </svg>
            </div>
            
            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-sm text-text-light">Ramadan begins in</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {daysUntilRamadan}
                </p>
                <p className="text-sm text-text-light">days</p>
              </div>
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center float">
                <CrescentIcon className="w-9 h-9 text-secondary" />
              </div>
            </div>
          </Card>
        )}
        
        {isRamadanNow && (
          <Card className="card-animate relative overflow-hidden bg-gradient-to-r from-primary to-primary-light text-white">
            <div className="absolute inset-0 star-pattern opacity-30" />
            <div className="relative flex items-center justify-between">
              <div>
                <p className="text-white/80">Ramadan Mubarak!</p>
                <p className="text-2xl font-bold arabic">رمضان مبارك</p>
              </div>
              <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center float">
                <CrescentIcon className="w-8 h-8 text-secondary" />
              </div>
            </div>
          </Card>
        )}
        
        {/* Prayer countdown */}
        <div className="card-animate" style={{ animationDelay: '0.1s' }}>
          <PrayerCountdown 
            nextPrayer={countdown.nextPrayer} 
            countdown={countdown.formatted}
          />
        </div>
        
        {/* Quick stats grid */}
        <div className="grid grid-cols-2 gap-3">
          {/* Prayer progress */}
          <Link to="/prayer">
            <Card hover className="h-full card-animate" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center gap-3">
                <ProgressCircle
                  value={prayersCompleted}
                  max={5}
                  size={60}
                  strokeWidth={5}
                  color="success"
                  showLabel={false}
                >
                  <span className="text-lg font-bold text-success">{prayersCompleted}</span>
                </ProgressCircle>
                <div>
                  <p className="text-sm text-text-light">Prayers</p>
                  <p className="font-bold text-text text-lg">{prayerPercentage}%</p>
                </div>
              </div>
            </Card>
          </Link>
          
          {/* Quran progress */}
          <Link to="/quran">
            <Card hover className="h-full card-animate" style={{ animationDelay: '0.25s' }}>
              <div className="flex items-center gap-3">
                <ProgressCircle
                  value={juzCompleted}
                  max={30}
                  size={60}
                  strokeWidth={5}
                  color="primary"
                  showLabel={false}
                >
                  <span className="text-lg font-bold text-primary">{juzCompleted}</span>
                </ProgressCircle>
                <div>
                  <p className="text-sm text-text-light">Quran</p>
                  <p className="font-bold text-text text-lg">{juzCompleted}/30</p>
                </div>
              </div>
            </Card>
          </Link>
        </div>
        
        {/* Azkar status */}
        <Link to="/azkar">
          <Card hover className="card-animate" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-text flex items-center gap-2">
                Daily Azkar
                <span className="arabic text-secondary text-sm">الأذكار</span>
              </h3>
              {(morningStreak > 0 || eveningStreak > 0) && (
                <StreakBadge count={Math.max(morningStreak, eveningStreak)} />
              )}
            </div>
            <div className="flex gap-3">
              <div className={`
                flex-1 p-3 rounded-xl flex flex-col items-center transition-all duration-300
                ${azkarStatus.morning ? 'bg-success/10 scale-[1.02]' : 'bg-background-alt'}
              `}>
                {azkarStatus.morning ? (
                  <CheckCircleIcon className="w-6 h-6 text-success" />
                ) : (
                  <SunriseIcon className="w-6 h-6 text-orange-400" />
                )}
                <p className="text-sm mt-1 text-text-light">Morning</p>
              </div>
              <div className={`
                flex-1 p-3 rounded-xl flex flex-col items-center transition-all duration-300
                ${azkarStatus.evening ? 'bg-success/10 scale-[1.02]' : 'bg-background-alt'}
              `}>
                {azkarStatus.evening ? (
                  <CheckCircleIcon className="w-6 h-6 text-success" />
                ) : (
                  <MoonIcon className="w-6 h-6 text-indigo-400" />
                )}
                <p className="text-sm mt-1 text-text-light">Evening</p>
              </div>
            </div>
          </Card>
        </Link>
        
        <IslamicDivider />
        
        {/* Quick actions */}
        <div className="grid grid-cols-3 gap-2">
          <Link to="/taraweh">
            <Card hover padding="sm" className="text-center h-full card-animate" style={{ animationDelay: '0.35s' }}>
              <div className={`
                w-11 h-11 mx-auto rounded-xl flex items-center justify-center transition-all duration-300
                ${tarawehStatus.completed 
                  ? 'bg-gradient-to-br from-success to-success-light text-white shadow-md' 
                  : 'bg-primary/10 text-primary'
                }
              `}>
                {tarawehStatus.completed ? (
                  <CheckCircleIcon className="w-5 h-5" />
                ) : (
                  <MosqueIcon className="w-5 h-5" />
                )}
              </div>
              <p className="text-xs mt-2 font-medium text-text-light">Taraweh</p>
              {tarawehStreak > 0 && (
                <div className="flex items-center justify-center gap-1 text-xs text-secondary mt-0.5">
                  <FireIcon className="w-3 h-3 text-orange-500" />
                  {tarawehStreak}
                </div>
              )}
            </Card>
          </Link>
          
          <Link to="/deeds">
            <Card hover padding="sm" className="text-center h-full card-animate" style={{ animationDelay: '0.4s' }}>
              <div className="w-11 h-11 mx-auto rounded-xl bg-gradient-to-br from-secondary/20 to-secondary/10 flex items-center justify-center text-secondary">
                <SparklesIcon className="w-5 h-5" />
              </div>
              <p className="text-xs mt-2 font-medium text-text-light">Deeds</p>
              <p className="text-xs text-secondary">{todayDeeds.length} today</p>
            </Card>
          </Link>
          
          <Link to="/tasbeeh">
            <Card hover padding="sm" className="text-center h-full card-animate" style={{ animationDelay: '0.45s' }}>
              <div className="w-11 h-11 mx-auto rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <BeadsIcon className="w-5 h-5" />
              </div>
              <p className="text-xs mt-2 font-medium text-text-light">Tasbeeh</p>
            </Card>
          </Link>
        </div>
        
        {/* Quran progress bar */}
        <Card className="card-animate" style={{ animationDelay: '0.5s' }}>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-text flex items-center gap-2">
              Quran Completion
              <span className="arabic text-secondary text-sm">القرآن</span>
            </h3>
            <Link to="/quran" className="text-sm text-primary hover:text-primary-light transition-colors">
              View All →
            </Link>
          </div>
          <ProgressBar 
            value={juzCompleted} 
            max={30} 
            color="success"
          />
          {juzCompleted === 30 && (
            <div className="flex items-center justify-center gap-2 text-sm text-success mt-3 slide-up">
              <SparklesIcon className="w-4 h-4" />
              Khatm Complete! MashaAllah!
            </div>
          )}
        </Card>

        {/* Daily Todo List */}
        <div className="card-animate" style={{ animationDelay: '0.6s' }}>
          <DailyTodoList />
        </div>
      </div>
    </PageLayout>
  )
}
