import { CrescentStar } from '../common'

export function PrayerCountdown({ nextPrayer, countdown }) {
  if (!nextPrayer) {
    return (
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary-dark p-6 text-center">
        <div className="shimmer absolute inset-0" />
        <p className="text-white/80">Loading prayer times...</p>
      </div>
    )
  }
  
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary-light to-primary p-6 text-white">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="countdown-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M10 0 L20 10 L10 20 L0 10 Z" fill="none" stroke="white" strokeWidth="0.5" />
          </pattern>
          <rect x="0" y="0" width="100" height="100" fill="url(#countdown-pattern)" />
        </svg>
      </div>
      
      {/* Floating crescent decoration */}
      <div className="absolute top-4 right-4 float">
        <svg className="w-10 h-10 text-secondary/40" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z" />
        </svg>
      </div>
      
      <div className="relative z-10">
        <p className="text-white/70 text-sm mb-1">Next Prayer</p>
        
        <div className="flex items-center justify-center gap-2 mb-4">
          <h2 className="text-2xl font-bold">{nextPrayer.name}</h2>
          {nextPrayer.arabic && (
            <span className="arabic text-secondary text-xl">{nextPrayer.arabic}</span>
          )}
        </div>
        
        {nextPrayer.timeStr && (
          <p className="text-white/70 text-sm mb-5">
            at {formatTime12h(nextPrayer.timeStr)}
          </p>
        )}
        
        {/* Countdown display */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 inline-block">
          <div className="flex items-center gap-3">
            {countdown.split(':').map((unit, index) => (
              <div key={index} className="text-center">
                <div className="bg-white/10 rounded-lg px-3 py-2 min-w-[60px]">
                  <span className="text-3xl font-bold font-mono countdown-digit">{unit}</span>
                </div>
                <p className="text-xs text-white/50 mt-1.5 uppercase tracking-wider">
                  {['Hours', 'Mins', 'Secs'][index]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-secondary to-transparent" />
    </div>
  )
}

function formatTime12h(time24) {
  if (!time24) return ''
  const [hours, minutes] = time24.split(':').map(Number)
  const period = hours >= 12 ? 'PM' : 'AM'
  const hours12 = hours % 12 || 12
  return `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`
}
