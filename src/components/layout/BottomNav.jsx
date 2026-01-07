import { NavLink } from 'react-router-dom'

const navItems = [
  { path: '/', icon: 'home', label: 'Home' },
  { path: '/prayer', icon: 'prayer', label: 'Prayer' },
  { path: '/quran', icon: 'quran', label: 'Quran' },
  { path: '/azkar', icon: 'azkar', label: 'Azkar' },
  { path: '/dashboard', icon: 'dashboard', label: 'Progress' },
  { path: '/more', icon: 'more', label: 'More' }
]

const icons = {
  home: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  prayer: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  quran: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  azkar: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
    </svg>
  ),
  dashboard: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  more: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
    </svg>
  )
}

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-surface/95 backdrop-blur-xl border-t border-secondary/10 pb-[env(safe-area-inset-bottom)] z-40">
      {/* Decorative top line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-secondary/50 to-transparent" />
      
      <div className="flex items-center justify-around h-16 max-w-2xl mx-auto px-1">
        {navItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              relative flex flex-col items-center justify-center gap-0.5 px-2 py-2 rounded-xl flex-1
              transition-all duration-300 ease-out
              ${isActive 
                ? 'text-primary scale-105' 
                : 'text-text-light hover:text-primary hover:bg-primary/5'
              }
            `}
          >
            {({ isActive }) => (
              <>
                {/* Active indicator */}
                {isActive && (
                  <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-primary to-secondary rounded-full" />
                )}
                
                {/* Icon with background for active */}
                <span className={`
                  transition-all duration-300
                  ${isActive ? 'bg-primary/10 p-1.5 rounded-lg' : ''}
                `}>
                  {icons[item.icon]}
                </span>
                
                <span className={`
                  text-xs font-medium transition-all duration-300
                  ${isActive ? 'text-primary' : ''}
                `}>
                  {item.label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
