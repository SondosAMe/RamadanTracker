import { useState } from 'react'
import { PageLayout } from '../components/layout'
import { DeedForm, DeedList } from '../components/deeds'
import { Card, Button } from '../components/common'
import { useApp } from '../context/AppContext'
import { formatDateKey } from '../utils/dateHelpers'

export function DeedsPage() {
  const { deeds, addDeed, deleteDeed, getDeedsByDate } = useApp()
  const [showForm, setShowForm] = useState(false)
  const [view, setView] = useState('today') // 'today' or 'all'
  
  const todayDeeds = getDeedsByDate(formatDateKey())
  
  return (
    <PageLayout title="Good Deeds">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-text flex items-center gap-2">
              Good Deeds
              <span className="arabic text-secondary">الأعمال الصالحة</span>
            </h2>
            <p className="text-sm text-text-light">
              {todayDeeds.length} {todayDeeds.length === 1 ? 'deed' : 'deeds'} today
            </p>
          </div>
          
          <Button onClick={() => setShowForm(true)}>
            + Add Deed
          </Button>
        </div>
        
        
        {/* Add form */}
        {showForm && (
          <Card>
            <h3 className="font-semibold text-text mb-4">Record a Good Deed</h3>
            <DeedForm
              onSubmit={(data) => {
                addDeed(data)
                setShowForm(false)
              }}
              onCancel={() => setShowForm(false)}
            />
          </Card>
        )}
        
        {/* View toggle */}
        <div className="flex gap-2">
          <button
            onClick={() => setView('today')}
            className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors ${
              view === 'today' 
                ? 'bg-primary text-white' 
                : 'bg-surface text-text hover:bg-primary/10'
            }`}
          >
            Today ({todayDeeds.length})
          </button>
          <button
            onClick={() => setView('all')}
            className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors ${
              view === 'all' 
                ? 'bg-primary text-white' 
                : 'bg-surface text-text hover:bg-primary/10'
            }`}
          >
            All ({deeds.length})
          </button>
        </div>
        
        {/* Deed list */}
        <DeedList
          deeds={view === 'today' ? todayDeeds : deeds}
          onDelete={deleteDeed}
          showDate={view === 'all'}
        />
      </div>
    </PageLayout>
  )
}

