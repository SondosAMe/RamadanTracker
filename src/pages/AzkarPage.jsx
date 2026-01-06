import { useState } from 'react'
import { PageLayout } from '../components/layout'
import { AzkarSection } from '../components/azkar'
import { TasbeehCounter } from '../components/tasbeeh'
import { Card } from '../components/common'
import { useApp } from '../context/AppContext'
import { TASBEEH_PHRASES } from '../utils/constants'
import { formatDateKey } from '../utils/dateHelpers'
import { useLocalStorage } from '../hooks/useLocalStorage'

export function AzkarPage() {
  const { 
    getAzkarStatus, 
    toggleAzkar, 
    getAzkarCompletedDates,
    getTasbeehCount,
    incrementTasbeeh,
    resetTasbeeh
  } = useApp()
  
  const [selectedPhrase, setSelectedPhrase] = useState(TASBEEH_PHRASES[0])
  const [goals, setGoals] = useLocalStorage('ramadan_tasbeeh_goals', {})
  
  const azkarStatus = getAzkarStatus()
  const morningDates = getAzkarCompletedDates('morning')
  const eveningDates = getAzkarCompletedDates('evening')
  
  const today = formatDateKey()
  const count = getTasbeehCount(selectedPhrase.id)
  const goal = goals[selectedPhrase.id] || 33
  
  const setGoal = (newGoal) => {
    setGoals(prev => ({ ...prev, [selectedPhrase.id]: newGoal }))
  }
  
  return (
    <PageLayout title="Azkar & Tasbeeh">
      <div className="space-y-6">
        {/* Azkar sections */}
        <section>
          <h2 className="text-lg font-semibold text-text mb-3 flex items-center gap-2">
            Daily Azkar
            <span className="arabic text-secondary">الأذكار</span>
          </h2>
          <div className="space-y-3">
            <AzkarSection
              type="morning"
              completed={azkarStatus.morning}
              onToggle={toggleAzkar}
              completedDates={morningDates}
            />
            <AzkarSection
              type="evening"
              completed={azkarStatus.evening}
              onToggle={toggleAzkar}
              completedDates={eveningDates}
            />
          </div>
        </section>
        
        {/* Tasbeeh section */}
        <section>
          <h2 className="text-lg font-semibold text-text mb-3 flex items-center gap-2">
            Tasbeeh Counter
            <span className="arabic text-secondary">التسبيح</span>
          </h2>
          
          {/* Phrase selector */}
          <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
            {TASBEEH_PHRASES.map(phrase => (
              <button
                key={phrase.id}
                onClick={() => setSelectedPhrase(phrase)}
                className={`
                  px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap
                  transition-colors duration-200
                  ${selectedPhrase.id === phrase.id
                    ? 'bg-primary text-white'
                    : 'bg-surface text-text hover:bg-primary/10'
                  }
                `}
              >
                {phrase.transliteration}
              </button>
            ))}
          </div>
          
          {/* Counter */}
          <TasbeehCounter
            phrase={selectedPhrase}
            count={count}
            goal={goal}
            onIncrement={() => incrementTasbeeh(selectedPhrase.id)}
            onReset={() => resetTasbeeh(selectedPhrase.id)}
            onSetGoal={setGoal}
          />
        </section>
      </div>
    </PageLayout>
  )
}

