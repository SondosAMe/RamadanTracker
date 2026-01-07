import { JUZ_NAMES } from '../../utils/constants'
import { CheckCircleIcon } from '../common'

export function JuzGrid({ completedJuz = [], todayJuz = null, onToggleJuz }) {
  return (
    <div className="grid grid-cols-5 gap-2">
      {Array.from({ length: 30 }, (_, i) => i + 1).map((juz, index) => {
        const isCompleted = completedJuz.includes(juz)
        const isTodayJuz = todayJuz === juz
        
        return (
          <button
            key={juz}
            onClick={() => onToggleJuz(juz)}
            className={`
              grid-item aspect-square rounded-xl flex flex-col items-center justify-center
              transition-all duration-300 text-center relative overflow-hidden
              hover:scale-105 active:scale-95
              ${isTodayJuz
                ? 'bg-gradient-to-br from-primary to-primary-light text-white shadow-md shadow-primary/30 ring-2 ring-primary/50 juz-scale-in' 
                : isCompleted 
                ? 'bg-gradient-to-br from-success/20 to-success/10 text-text border-2 border-success/30' 
                : 'bg-surface hover:bg-primary/10 text-text border border-primary/10 hover:border-primary/30'
              }
            `}
            style={{ animationDelay: `${index * 0.02}s` }}
            title={JUZ_NAMES[juz - 1]}
          >
            <span className={`text-lg font-bold relative z-10 ${isTodayJuz ? 'text-white' : ''}`}>
              {juz}
            </span>
            {isTodayJuz && (
              <CheckCircleIcon className="w-3 h-3 mt-0.5 relative z-10 text-white" />
            )}
            {!isTodayJuz && isCompleted && (
              <CheckCircleIcon className="w-3 h-3 mt-0.5 relative z-10 text-success" />
            )}
          </button>
        )
      })}
    </div>
  )
}
