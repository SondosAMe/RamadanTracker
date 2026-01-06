export function Checkbox({ 
  checked = false, 
  onChange, 
  label,
  sublabel,
  className = '',
  size = 'md',
  disabled = false
}) {
  const sizes = {
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-7 h-7'
  }
  
  return (
    <label className={`flex items-center gap-3 cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}>
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => !disabled && onChange?.(e.target.checked)}
          className="sr-only"
          disabled={disabled}
        />
        <div 
          className={`
            ${sizes[size]} 
            rounded-lg border-2 
            flex items-center justify-center
            transition-all duration-200
            ${checked 
              ? 'bg-success border-success' 
              : 'border-primary-light bg-transparent hover:border-primary'
            }
          `}
        >
          {checked && (
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
      </div>
      
      {(label || sublabel) && (
        <div className="flex flex-col">
          {label && <span className="text-text font-medium">{label}</span>}
          {sublabel && <span className="text-text-light text-sm">{sublabel}</span>}
        </div>
      )}
    </label>
  )
}

