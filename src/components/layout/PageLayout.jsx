import { Header } from './Header'
import { BottomNav } from './BottomNav'

export function PageLayout({ 
  children, 
  title, 
  showLocation = false,
  className = '' 
}) {
  return (
    <div className="min-h-screen bg-background pattern-bg">
      <Header title={title} showLocation={showLocation} />
      <main className={`px-4 py-4 safe-bottom ${className}`}>
        <div className="page-enter">
          {children}
        </div>
      </main>
      <BottomNav />
    </div>
  )
}

