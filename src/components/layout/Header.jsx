import { useTheme } from '../../context/ThemeContext'
import { useApp } from '../../context/AppContext'
import { formatDisplayDate, isRamadan } from '../../utils/dateHelpers'
import { CrescentStar, MoonIcon, SunriseIcon } from '../common'

export function Header({ title, showLocation = false }) {
  const { theme, toggleTheme } = useTheme()
  const { settings } = useApp()
  
  const today = new Date()
  const ramadan = isRamadan(today)
  
  return (
    <header className="sticky top-0 z-30 bg-surface/90 backdrop-blur-xl border-b border-secondary/10 pt-[env(safe-area-inset-top,0px)]">
      {/* Decorative top border */}
      <div className="h-1 bg-gradient-to-r from-primary via-secondary to-primary" />
      
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left: Logo and Title */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center shadow-lg shadow-primary/20">
                <svg className="w-6 h-6 text-secondary" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3c-1.5 2-2.5 4-2.5 6 0 1.5.5 2.5 2.5 3 2 .5 2.5-1.5 2.5-3 0-2-1-4-2.5-6z" />
                  <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z" opacity="0.6" />
                </svg>
              </div>
              {/* Decorative dot */}
              <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-secondary rounded-full border-2 border-surface" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-text">{title || 'Ramadan Tracker'}</h1>
              {showLocation && settings.location.city && (
                <p className="text-xs text-text-light flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {settings.location.city}
                </p>
              )}
            </div>
          </div>
          
          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            {/* Ramadan badge */}
            {ramadan && (
              <span className="px-3 py-1.5 text-xs font-semibold bg-gradient-to-r from-secondary/20 to-primary/20 text-secondary rounded-full border border-secondary/30 flex items-center gap-1.5">
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z" />
                </svg>
                Ramadan
              </span>
            )}
            
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="relative p-2.5 rounded-xl bg-background-alt hover:bg-primary/10 transition-all duration-300 group"
              aria-label="Toggle theme"
            >
              <div className="relative w-5 h-5">
                {theme === 'light' ? (
                  <svg className="w-5 h-5 text-primary transition-transform duration-300 group-hover:rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-secondary transition-transform duration-300 group-hover:rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                )}
              </div>
            </button>
          </div>
        </div>
        
        {/* Date display */}
        <p className="text-sm text-text-light mt-2 flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
          {formatDisplayDate(today)}
        </p>
      </div>
    </header>
  )
}
