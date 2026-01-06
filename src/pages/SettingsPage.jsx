import { PageLayout } from '../components/layout'
import { Card, Button, Select } from '../components/common'
import { useApp } from '../context/AppContext'
import { useTheme } from '../context/ThemeContext'
import { CALCULATION_METHODS } from '../utils/constants'
import { clearAllData, exportData } from '../utils/storage'

export function SettingsPage() {
  const { settings, setSettings, geolocation } = useApp()
  const { theme, toggleTheme } = useTheme()
  
  const methodOptions = CALCULATION_METHODS.map(m => ({
    id: m.id,
    name: m.name
  }))
  
  const handleExport = () => {
    const data = exportData()
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `ramadan-tracker-backup-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }
  
  const handleClearData = () => {
    if (confirm('Are you sure you want to clear all data? This cannot be undone.')) {
      clearAllData()
      window.location.reload()
    }
  }
  
  const handleRefreshLocation = () => {
    geolocation.requestLocation()
  }
  
  return (
    <PageLayout title="Settings">
      <div className="space-y-4">
        {/* Location */}
        <Card>
          <h3 className="font-semibold text-text mb-3">Location</h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text">{settings.location.city || 'Not set'}</p>
                {settings.location.lat && (
                  <p className="text-xs text-text-light">
                    {settings.location.lat.toFixed(4)}, {settings.location.lng.toFixed(4)}
                  </p>
                )}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefreshLocation}
                disabled={geolocation.loading}
              >
                {geolocation.loading ? 'Loading...' : 'Refresh'}
              </Button>
            </div>
            
            {geolocation.error && (
              <p className="text-sm text-error">{geolocation.error}</p>
            )}
          </div>
        </Card>
        
        {/* Prayer calculation method */}
        <Card>
          <h3 className="font-semibold text-text mb-3">Prayer Calculation</h3>
          <Select
            label="Calculation Method"
            value={settings.calculationMethod}
            onChange={(value) => setSettings(prev => ({ 
              ...prev, 
              calculationMethod: parseInt(value) 
            }))}
            options={methodOptions}
          />
        </Card>
        
        {/* Appearance */}
        <Card>
          <h3 className="font-semibold text-text mb-3">Appearance</h3>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text">Dark Mode</p>
              <p className="text-sm text-text-light">
                {theme === 'dark' ? 'Enabled' : 'Disabled'}
              </p>
            </div>
            <button
              onClick={toggleTheme}
              className={`
                relative w-14 h-8 rounded-full transition-colors duration-200
                ${theme === 'dark' ? 'bg-primary' : 'bg-background-alt'}
              `}
            >
              <div className={`
                absolute top-1 w-6 h-6 rounded-full bg-white shadow transition-transform duration-200
                ${theme === 'dark' ? 'translate-x-7' : 'translate-x-1'}
              `}>
                {theme === 'dark' ? '🌙' : '☀️'}
              </div>
            </button>
          </div>
        </Card>
        
        {/* Data management */}
        <Card>
          <h3 className="font-semibold text-text mb-3">Data</h3>
          
          <div className="space-y-3">
            <Button variant="outline" className="w-full" onClick={handleExport}>
              Export Data (JSON)
            </Button>
            
            <Button variant="danger" className="w-full" onClick={handleClearData}>
              Clear All Data
            </Button>
          </div>
        </Card>
        
        {/* About */}
        <Card>
          <h3 className="font-semibold text-text mb-2">About</h3>
          <p className="text-sm text-text-light">
            Ramadan Tracker v1.0.0
          </p>
          <p className="text-sm text-text-light mt-1">
            Track your spiritual practices during Ramadan and beyond.
          </p>
        </Card>
      </div>
    </PageLayout>
  )
}

