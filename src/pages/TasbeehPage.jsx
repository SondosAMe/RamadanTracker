import { useState } from 'react'
import { PageLayout } from '../components/layout'
import { TasbeehCounter } from '../components/tasbeeh'
import { Card, BeadsIcon } from '../components/common'
import { useApp } from '../context/AppContext'
import { TASBEEH_PHRASES } from '../utils/constants'
import { formatDateKey } from '../utils/dateHelpers'
import { useLocalStorage } from '../hooks/useLocalStorage'

export function TasbeehPage() {
  const { getTasbeehCount, incrementTasbeeh, resetTasbeeh, tasbeeh } = useApp()
  const [selectedPhrase, setSelectedPhrase] = useState(TASBEEH_PHRASES[0])
  const [goals, setGoals] = useLocalStorage('ramadan_tasbeeh_goals', {})
  
  const today = formatDateKey()
  const count = getTasbeehCount(selectedPhrase.id)
  const goal = goals[selectedPhrase.id] || 33
  
  const setGoal = (newGoal) => {
    setGoals(prev => ({ ...prev, [selectedPhrase.id]: newGoal }))
  }
  
  // Calculate total counts for today
  const todayCounts = tasbeeh[today] || {}
  const totalToday = Object.values(todayCounts).reduce((sum, c) => sum + c, 0)
  
  return (
    <PageLayout title="Tasbeeh Counter">
      <div className="space-y-6">
        {/* Stats */}
        <Card className="bg-gradient-to-r from-primary to-primary-light text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm">Today's Total</p>
              <p className="text-3xl font-bold">{totalToday}</p>
            </div>
            <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center">
              <BeadsIcon className="w-8 h-8 text-secondary" />
            </div>
          </div>
        </Card>
        
        {/* Phrase selector */}
        <div>
          <h3 className="font-semibold text-text mb-3">Select Dhikr</h3>
          <div className="grid grid-cols-2 gap-2">
            {TASBEEH_PHRASES.map(phrase => (
              <button
                key={phrase.id}
                onClick={() => setSelectedPhrase(phrase)}
                className={`
                  p-3 rounded-xl text-left transition-all duration-200
                  ${selectedPhrase.id === phrase.id
                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                    : 'bg-surface text-text hover:bg-primary/10'
                  }
                `}
              >
                <p className={`arabic text-lg ${selectedPhrase.id === phrase.id ? 'text-secondary' : 'text-secondary'}`}>
                  {phrase.phrase}
                </p>
                <p className="text-sm mt-1 opacity-80">{phrase.transliteration}</p>
                <p className={`text-xs mt-0.5 ${selectedPhrase.id === phrase.id ? 'text-white/60' : 'text-text-light'}`}>
                  {getTasbeehCount(phrase.id)} / {goals[phrase.id] || 33}
                </p>
              </button>
            ))}
          </div>
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
      </div>
    </PageLayout>
  )
}

