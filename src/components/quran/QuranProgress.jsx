import { ProgressCircle, ProgressBar, SparklesIcon } from '../common'

export function QuranProgress({ completedJuz = [], showCircle = true }) {
  const completed = completedJuz.length
  const total = 30
  const percentage = Math.round((completed / total) * 100)
  
  if (showCircle) {
    return (
      <div className="flex items-center gap-6">
        <div className="relative">
          <ProgressCircle
            value={completed}
            max={total}
            size={120}
            strokeWidth={10}
            color="success"
          >
            <div className="text-center">
              <span className="text-2xl font-bold text-text">{completed}</span>
              <span className="text-text-light">/{total}</span>
              <p className="text-xs text-text-light mt-1">Juz</p>
            </div>
          </ProgressCircle>
          
          {/* Decorative ring */}
          {completed === total && (
            <div className="absolute inset-[-8px] rounded-full border-2 border-secondary/30 glow-pulse" />
          )}
        </div>
        
        <div className="flex-1">
          <h3 className="font-semibold text-text mb-2 flex items-center gap-2">
            Quran Progress
            <span className="arabic text-secondary text-sm">القرآن</span>
          </h3>
          <p className="text-3xl font-bold bg-gradient-to-r from-success to-primary bg-clip-text text-transparent mb-1">
            {percentage}%
          </p>
          <p className="text-sm text-text-light">
            {completed === total 
              ? (
                <span className="flex items-center gap-1 text-success">
                  <SparklesIcon className="w-4 h-4" />
                  Khatm complete!
                </span>
              )
              : `${total - completed} juz remaining`
            }
          </p>
        </div>
      </div>
    )
  }
  
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <span className="font-medium text-text">Quran Progress</span>
        <span className="text-sm text-text-light">{completed}/{total} Juz</span>
      </div>
      <ProgressBar value={completed} max={total} showLabel={false} color="success" />
    </div>
  )
}
