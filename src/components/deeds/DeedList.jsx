import { useState } from 'react'
import { Card, Button, GiftIcon, HeartIcon, HandsIcon, UsersIcon, BookIcon, SparklesIcon } from '../common'
import { DEED_CATEGORIES } from '../../utils/constants'
import { formatDisplayDate, parseDateKey } from '../../utils/dateHelpers'

// Map category IDs to icon components
const categoryIcons = {
  charity: GiftIcon,
  kindness: HeartIcon,
  helping: HandsIcon,
  family: UsersIcon,
  learning: BookIcon,
  other: SparklesIcon
}

export function DeedList({ deeds = [], onDelete, showDate = false }) {
  const [expandedId, setExpandedId] = useState(null)
  
  if (deeds.length === 0) {
    return (
      <div className="text-center py-8 text-text-light">
        <p>No good deeds logged yet.</p>
        <p className="text-sm mt-1">Start recording your acts of kindness!</p>
      </div>
    )
  }
  
  const getCategoryInfo = (categoryId) => {
    return DEED_CATEGORIES.find(c => c.id === categoryId) || DEED_CATEGORIES[5]
  }
  
  // Group by date if showDate is true
  const groupedDeeds = showDate
    ? deeds.reduce((acc, deed) => {
        if (!acc[deed.date]) acc[deed.date] = []
        acc[deed.date].push(deed)
        return acc
      }, {})
    : { all: deeds }
  
  const sortedDates = Object.keys(groupedDeeds).sort((a, b) => 
    new Date(b) - new Date(a)
  )
  
  return (
    <div className="space-y-4">
      {sortedDates.map(date => (
        <div key={date}>
          {showDate && date !== 'all' && (
            <h4 className="text-sm font-medium text-text-light mb-2">
              {formatDisplayDate(parseDateKey(date), {
                weekday: 'short',
                month: 'short',
                day: 'numeric'
              })}
            </h4>
          )}
          
          <div className="space-y-2">
            {groupedDeeds[date].map(deed => {
              const category = getCategoryInfo(deed.category)
              const isExpanded = expandedId === deed.id
              const IconComponent = categoryIcons[deed.category] || SparklesIcon
              
              return (
                <Card 
                  key={deed.id} 
                  padding="sm"
                  hover
                  onClick={() => setExpandedId(isExpanded ? null : deed.id)}
                  style={{ borderLeftColor: category.color, borderLeftWidth: '4px' }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div 
                        className="w-9 h-9 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${category.color}20` }}
                      >
                        <IconComponent className="w-5 h-5" style={{ color: category.color }} />
                      </div>
                      <div>
                        <p className="font-medium text-text">{deed.description}</p>
                        <p className="text-xs text-text-light mt-0.5">{category.name}</p>
                      </div>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation()
                        onDelete(deed.id)
                      }}
                      className="text-error/60 hover:text-error hover:bg-error/10"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </Button>
                  </div>
                  
                  {isExpanded && deed.notes && (
                    <p className="mt-3 pt-3 border-t border-primary/10 text-sm text-text-light">
                      {deed.notes}
                    </p>
                  )}
                </Card>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

