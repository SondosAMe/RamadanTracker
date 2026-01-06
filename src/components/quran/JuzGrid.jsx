import { JUZ_NAMES } from '../../utils/constants'
import { CheckCircleIcon } from '../common'

export function JuzGrid({ completedJuz = [], onToggleJuz }) {
  return (
    <div className="grid grid-cols-5 gap-2">
      {Array.from({ length: 30 }, (_, i) => i + 1).map((juz, index) => {
        const isCompleted = completedJuz.includes(juz)
        
        return (
          <button
            key={juz}
            onClick={() => onToggleJuz(juz)}
            className={`
              grid-item aspect-square rounded-xl flex flex-col items-center justify-center
              transition-all duration-300 text-center relative overflow-hidden
              hover:scale-105 active:scale-95
              ${isCompleted 
                ? 'bg-gradient-to-br from-success to-success-light text-white shadow-md shadow-success/20 juz-completed' 
                : 'bg-surface hover:bg-primary/10 text-text border border-primary/10 hover:border-primary/30'
              }
            `}
            style={{ animationDelay: `${index * 0.02}s` }}
            title={JUZ_NAMES[juz - 1]}
          >
            <span className="text-lg font-bold relative z-10">{juz}</span>
            {isCompleted && (
              <CheckCircleIcon className="w-3 h-3 mt-0.5 relative z-10" />
            )}
          </button>
        )
      })}
    </div>
  )
}
