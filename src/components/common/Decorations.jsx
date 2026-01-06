// Islamic decorative elements

export function IslamicDivider({ className = '' }) {
  return (
    <div className={`flex items-center justify-center gap-3 my-6 ${className}`}>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-secondary/50 to-transparent" />
      <svg className="w-6 h-6 text-secondary" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L14.5 9H22L16 14L18.5 22L12 17L5.5 22L8 14L2 9H9.5L12 2Z" />
      </svg>
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-secondary/50 to-transparent" />
    </div>
  )
}

export function IslamicBorder({ children, className = '' }) {
  return (
    <div className={`relative ${className}`}>
      {/* Corner ornaments */}
      <svg className="absolute -top-2 -left-2 w-6 h-6 text-secondary/40" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 3v6h2V5h4V3H3zm18 0h-6v2h4v4h2V3z" />
      </svg>
      <svg className="absolute -top-2 -right-2 w-6 h-6 text-secondary/40 rotate-90" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 3v6h2V5h4V3H3zm18 0h-6v2h4v4h2V3z" />
      </svg>
      <svg className="absolute -bottom-2 -left-2 w-6 h-6 text-secondary/40 -rotate-90" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 3v6h2V5h4V3H3zm18 0h-6v2h4v4h2V3z" />
      </svg>
      <svg className="absolute -bottom-2 -right-2 w-6 h-6 text-secondary/40 rotate-180" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 3v6h2V5h4V3H3zm18 0h-6v2h4v4h2V3z" />
      </svg>
      {children}
    </div>
  )
}

export function CrescentStar({ className = '', size = 'md' }) {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  }
  
  return (
    <div className={`${sizes[size]} ${className}`}>
      <svg viewBox="0 0 100 100" fill="currentColor">
        {/* Crescent */}
        <path d="M50 10 A40 40 0 1 0 50 90 A32 32 0 1 1 50 10" className="text-secondary" fill="currentColor" />
        {/* Star */}
        <polygon 
          points="75,25 78,33 87,33 80,39 83,47 75,42 67,47 70,39 63,33 72,33" 
          className="text-secondary" 
          fill="currentColor" 
        />
      </svg>
    </div>
  )
}

export function GeometricPattern({ className = '' }) {
  return (
    <svg className={`opacity-10 ${className}`} viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
      <pattern id="islamic-pattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
        <path d="M10 0 L20 10 L10 20 L0 10 Z" />
        <circle cx="10" cy="10" r="4" />
      </pattern>
      <rect x="0" y="0" width="100" height="100" fill="url(#islamic-pattern)" />
    </svg>
  )
}

export function StarIcon8Point({ className = "w-6 h-6" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 1L13.5 8.5L21 7L15.5 12L21 17L13.5 15.5L12 23L10.5 15.5L3 17L8.5 12L3 7L10.5 8.5L12 1Z" />
    </svg>
  )
}

export function ArabescueLine({ className = '' }) {
  return (
    <div className={`h-1 w-full ${className}`}>
      <svg viewBox="0 0 200 4" preserveAspectRatio="none" className="w-full h-full">
        <defs>
          <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="20%" stopColor="currentColor" stopOpacity="0.3" />
            <stop offset="50%" stopColor="currentColor" />
            <stop offset="80%" stopColor="currentColor" stopOpacity="0.3" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <path 
          d="M0,2 Q25,0 50,2 T100,2 T150,2 T200,2" 
          fill="none" 
          stroke="url(#line-gradient)" 
          strokeWidth="2"
          className="text-secondary"
        />
      </svg>
    </div>
  )
}

export function LoadingSpinner({ size = 'md', className = '' }) {
  const sizes = {
    sm: 'w-5 h-5',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }
  
  return (
    <div className={`${sizes[size]} ${className}`}>
      <svg viewBox="0 0 50 50" className="spin">
        <circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="80 120"
          className="text-primary"
        />
        <circle
          cx="25"
          cy="25"
          r="12"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="50 70"
          className="text-secondary"
          style={{ animationDirection: 'reverse' }}
        />
      </svg>
    </div>
  )
}

