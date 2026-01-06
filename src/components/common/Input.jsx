export function Input({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  className = '',
  error,
  ...props
}) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-text mb-1.5">
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className={`
          w-full px-4 py-2.5 rounded-xl
          bg-background border-2 border-primary/20
          text-text placeholder:text-text-light
          focus:outline-none focus:border-primary
          transition-colors duration-200
          ${error ? 'border-error' : ''}
        `}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-error">{error}</p>
      )}
    </div>
  )
}

export function Textarea({
  label,
  value,
  onChange,
  placeholder,
  className = '',
  rows = 4,
  error,
  ...props
}) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-text mb-1.5">
          {label}
        </label>
      )}
      <textarea
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className={`
          w-full px-4 py-2.5 rounded-xl
          bg-background border-2 border-primary/20
          text-text placeholder:text-text-light
          focus:outline-none focus:border-primary
          transition-colors duration-200
          resize-none
          ${error ? 'border-error' : ''}
        `}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-error">{error}</p>
      )}
    </div>
  )
}

export function Select({
  label,
  value,
  onChange,
  options = [],
  className = '',
  placeholder = 'Select...',
  ...props
}) {
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-text mb-1.5">
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="
          w-full px-4 py-2.5 rounded-xl
          bg-background border-2 border-primary/20
          text-text
          focus:outline-none focus:border-primary
          transition-colors duration-200
          cursor-pointer
        "
        {...props}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map(opt => (
          <option key={opt.value || opt.id} value={opt.value || opt.id}>
            {opt.label || opt.name}
          </option>
        ))}
      </select>
    </div>
  )
}

