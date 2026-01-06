export function ProgressCircle({ 
  value = 0, 
  max = 100, 
  size = 120,
  strokeWidth = 8,
  className = '',
  showLabel = true,
  color = 'primary',
  children
}) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100))
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (percentage / 100) * circumference
  
  const colors = {
    primary: '#1B4965',
    secondary: '#D4AF37',
    success: '#4A7C59'
  }
  
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-background-alt"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={colors[color]}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="progress-circle"
          style={{ transition: 'stroke-dashoffset 0.5s ease-out' }}
        />
      </svg>
      
      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {children ? children : (
          showLabel && (
            <>
              <span className="text-2xl font-bold text-text">{Math.round(percentage)}%</span>
              <span className="text-xs text-text-light">{value}/{max}</span>
            </>
          )
        )}
      </div>
    </div>
  )
}

