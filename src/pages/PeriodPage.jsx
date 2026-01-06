import { PageLayout } from '../components/layout'
import { PeriodTracker } from '../components/period'
import { useApp } from '../context/AppContext'

export function PeriodPage() {
  const { period, togglePeriodDay } = useApp()
  
  return (
    <PageLayout title="Period Tracker">
      <PeriodTracker
        markedDays={period.markedDays || []}
        onToggleDay={togglePeriodDay}
      />
    </PageLayout>
  )
}

