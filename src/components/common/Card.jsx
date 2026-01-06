export function Card({ 
  children, 
  className = '', 
  hover = false,
  padding = 'md',
  featured = false,
  animate = false,
  delay = 0,
  ...props 
}) {
  const paddings = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6'
  }
  
  const hoverClass = hover ? 'hover:shadow-card-hover hover:-translate-y-1 cursor-pointer' : ''
  const featuredClass = featured ? 'card-featured' : ''
  const animateClass = animate ? 'card-animate' : ''
  
  return (
    <div 
      className={`
        bg-surface rounded-2xl shadow-card 
        transition-all duration-300 ease-out
        ${paddings[padding]} 
        ${hoverClass} 
        ${featuredClass}
        ${animateClass}
        ${className}
      `}
      style={animate && delay ? { animationDelay: `${delay}ms` } : {}}
      {...props}
    >
      {children}
    </div>
  )
}

export function CardHeader({ children, className = '' }) {
  return (
    <div className={`mb-4 ${className}`}>
      {children}
    </div>
  )
}

export function CardTitle({ children, className = '', arabic = null }) {
  return (
    <div className="flex items-center justify-between">
      <h3 className={`text-lg font-semibold text-text ${className}`}>
        {children}
      </h3>
      {arabic && (
        <span className="arabic text-secondary text-lg">{arabic}</span>
      )}
    </div>
  )
}

export function CardContent({ children, className = '' }) {
  return (
    <div className={className}>
      {children}
    </div>
  )
}
