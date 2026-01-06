import { useState } from 'react'
import { PageLayout } from '../components/layout'
import { TafsirForm, TafsirLog } from '../components/tafsir'
import { Card, Button, Calendar } from '../components/common'
import { useApp } from '../context/AppContext'

export function TafsirPage() {
  const { tafsir, addTafsirEntry, deleteTafsirEntry } = useApp()
  const [showForm, setShowForm] = useState(false)
  const [view, setView] = useState('log') // 'log' or 'calendar'
  
  const completedDates = [...new Set(tafsir.map(t => t.date))]
  
  return (
    <PageLayout title="Tafsir Tracker">
      <div className="space-y-4">
        {/* Header with add button */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-text flex items-center gap-2">
              Daily Tafsir
              <span className="arabic text-secondary">التفسير</span>
            </h2>
            <p className="text-sm text-text-light">
              {tafsir.length} {tafsir.length === 1 ? 'entry' : 'entries'} logged
            </p>
          </div>
          
          <Button onClick={() => setShowForm(true)}>
            + Add Entry
          </Button>
        </div>
        
        {/* Add form */}
        {showForm && (
          <Card>
            <h3 className="font-semibold text-text mb-4">New Tafsir Entry</h3>
            <TafsirForm
              onSubmit={(data) => {
                addTafsirEntry(data)
                setShowForm(false)
              }}
              onCancel={() => setShowForm(false)}
            />
          </Card>
        )}
        
        {/* View toggle */}
        <div className="flex gap-2">
          <button
            onClick={() => setView('log')}
            className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors ${
              view === 'log' 
                ? 'bg-primary text-white' 
                : 'bg-surface text-text hover:bg-primary/10'
            }`}
          >
            📝 Log View
          </button>
          <button
            onClick={() => setView('calendar')}
            className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors ${
              view === 'calendar' 
                ? 'bg-primary text-white' 
                : 'bg-surface text-text hover:bg-primary/10'
            }`}
          >
            📅 Calendar
          </button>
        </div>
        
        {/* Content */}
        {view === 'log' ? (
          <TafsirLog entries={tafsir} onDelete={deleteTafsirEntry} />
        ) : (
          <Card>
            <h3 className="font-semibold text-text mb-3">Tafsir Days</h3>
            <Calendar completedDates={completedDates} />
          </Card>
        )}
      </div>
    </PageLayout>
  )
}

