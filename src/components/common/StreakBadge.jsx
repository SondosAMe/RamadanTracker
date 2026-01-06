import { FireIcon } from './Icons'

export function StreakBadge({ count = 0, label = 'day streak', className = '' }) {
  if (count === 0) return null
  
  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/20 ${className}`}>
      <FireIcon className="w-5 h-5 text-orange-500 flame-glow" />
      <span className="font-semibold text-secondary">{count}</span>
      <span className="text-sm text-text-light">{label}</span>
    </div>
  )
}

