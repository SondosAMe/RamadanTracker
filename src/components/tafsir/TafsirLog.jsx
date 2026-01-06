import { Card, Button } from '../common'
import { formatDisplayDate, parseDateKey } from '../../utils/dateHelpers'
import { SURAHS } from '../../utils/constants'

export function TafsirLog({ entries = [], onDelete }) {
  if (entries.length === 0) {
    return (
      <div className="text-center py-8 text-text-light">
        <p>No tafsir entries yet.</p>
        <p className="text-sm mt-1">Start logging your daily reflections!</p>
      </div>
    )
  }
  
  // Sort entries by date (newest first)
  const sortedEntries = [...entries].sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  )
  
  return (
    <div className="space-y-3">
      {sortedEntries.map(entry => (
        <Card key={entry.id} padding="sm">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                {entry.surah && (
                  <span className="font-medium text-text">
                    {SURAHS[entry.surah - 1] || `Surah ${entry.surah}`}
                  </span>
                )}
                {entry.ayahRange && (
                  <span className="text-sm text-text-light">
                    Ayat {entry.ayahRange}
                  </span>
                )}
                {entry.pageNumber && (
                  <span className="text-sm text-secondary">
                    Page {entry.pageNumber}
                  </span>
                )}
              </div>
              
              <p className="text-xs text-text-light mt-1">
                {formatDisplayDate(parseDateKey(entry.date), { 
                  weekday: 'short', 
                  year: 'numeric', 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </p>
              
              {entry.notes && (
                <p className="text-sm text-text mt-2 bg-background-alt p-2 rounded-lg">
                  {entry.notes}
                </p>
              )}
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(entry.id)}
              className="text-error/60 hover:text-error hover:bg-error/10"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </Button>
          </div>
        </Card>
      ))}
    </div>
  )
}

