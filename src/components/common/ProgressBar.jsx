export function ProgressBar({ 
  value = 0, 
  max = 100, 
  className = '',
  showLabel = true,
  size = 'md',
  color = 'primary',
  animated = true
}) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100))
  
  const sizes = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  }
  
  const colors = {
    primary: 'from-primary to-primary-light',
    secondary: 'from-secondary to-secondary-light',
    success: 'from-success to-success-light'
  }
  
  return (
    <div className={className}>
      {showLabel && (
        <div className="flex justify-between mb-2 text-sm">
          <span className="text-text-light">{value} / {max}</span>
          <span className="font-semibold text-primary">{Math.round(percentage)}%</span>
        </div>
      )}
      <div className={`w-full bg-background-alt rounded-full overflow-hidden ${sizes[size]}`}>
        <div 
          className={`
            h-full bg-gradient-to-r ${colors[color]} rounded-full 
            transition-all duration-700 ease-out relative overflow-hidden
          `}
          style={{ width: `${percentage}%` }}
        >
          {/* Shimmer effect */}
          {animated && percentage > 0 && (
            <div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              style={{
                animation: 'shimmer 2s infinite',
                backgroundSize: '200% 100%'
              }}
            />
          )}
        </div>
      </div>
    </div>
  )
}
