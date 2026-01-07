import { PageLayout } from '../components/layout'
import { JuzGrid, QuranProgress } from '../components/quran'
import { Card, IslamicDivider, SparklesIcon, CheckCircleIcon } from '../components/common'
import { useApp } from '../context/AppContext'
import { formatDateKey } from '../utils/dateHelpers'

export function QuranPage() {
  const { quran, toggleJuz, getTodayJuz, getCompletedJuz } = useApp()
  const today = formatDateKey()
  const todayJuz = getTodayJuz(today)
  const completedJuz = getCompletedJuz()
  
  return (
    <PageLayout title="Quran Tracker">
      <div className="space-y-6">
        {/* Today's Juz Status */}
        <Card className="card-animate bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-text mb-1">Today's Juz</h3>
              <p className="text-sm text-text-light">One Juz per day</p>
            </div>
            <div className="text-right">
              {todayJuz ? (
                <div className="flex items-center gap-2">
                  <div className="w-16 h-16 rounded-full bg-success/20 flex items-center justify-center">
                    <span className="text-2xl font-bold text-success">{todayJuz}</span>
                  </div>
                  <CheckCircleIcon className="w-6 h-6 text-success" />
                </div>
              ) : (
                <div className="w-16 h-16 rounded-full bg-surface border-2 border-dashed border-primary/30 flex items-center justify-center">
                  <span className="text-text-light text-sm">--</span>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Progress overview */}
        <Card className="card-animate relative overflow-hidden">
          {/* Decorative background */}
          <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
            <svg viewBox="0 0 100 100" fill="currentColor" className="text-primary">
              <path d="M50 10 A40 40 0 1 0 50 90 A32 32 0 1 1 50 10" />
            </svg>
          </div>
          <QuranProgress completedJuz={completedJuz} />
        </Card>
        
        {/* Instructions */}
        <div className="text-center">
          <p className="text-sm text-text-light flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
            Tap a Juz to mark today's reading
            <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
          </p>
        </div>
        
        {/* Juz grid */}
        <Card className="card-animate" style={{ animationDelay: '0.1s' }}>
          <h3 className="font-semibold text-text mb-4 flex items-center gap-2">
            <span>30 Juz</span>
            <span className="arabic text-secondary">ثلاثون جزءاً</span>
          </h3>
          <JuzGrid
            completedJuz={completedJuz}
            todayJuz={todayJuz}
            onToggleJuz={toggleJuz}
          />
        </Card>
        
        {/* Completion celebration */}
        {completedJuz.length === 30 && (
          <Card className="card-animate bg-gradient-to-br from-success/10 to-success/5 border-2 border-success/20 text-center relative overflow-hidden">
            {/* Decorative stars */}
            <div className="absolute inset-0 opacity-20">
              {[...Array(8)].map((_, i) => (
                <div 
                  key={i} 
                  className="absolute text-secondary float"
                  style={{ 
                    top: `${Math.random() * 80}%`, 
                    left: `${Math.random() * 80}%`,
                    animationDelay: `${i * 0.3}s`
                  }}
                >
                  ✦
                </div>
              ))}
            </div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-success/20 flex items-center justify-center">
                <SparklesIcon className="w-8 h-8 text-success" />
              </div>
              <h3 className="text-xl font-bold text-success">Khatm Complete!</h3>
              <p className="arabic text-secondary text-lg mt-1">ختم القرآن</p>
              <p className="text-text-light mt-2">
                MashaAllah! You've completed reading the entire Quran.
              </p>
            </div>
          </Card>
        )}
      </div>
    </PageLayout>
  )
}
