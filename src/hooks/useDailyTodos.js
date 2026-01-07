import { useMemo } from 'react'
import { useApp } from '../context/AppContext'
import { formatDateKey } from '../utils/dateHelpers'
import { PRAYERS } from '../utils/constants'

export function useDailyTodos() {
  const {
    getPrayerStatus,
    getAzkarStatus,
    getAzkarCompletion,
    getTarawehStatus,
    getDeedsByDate,
    quran,
    tasbeeh,
    isPeriodDay
  } = useApp()

  const today = formatDateKey()
  const isPeriod = isPeriodDay(today)
  const prayerStatus = getPrayerStatus(today)
  const azkarStatus = getAzkarStatus(today)
  const morningCompletion = getAzkarCompletion('morning', today)
  const eveningCompletion = getAzkarCompletion('evening', today)
  const tarawehStatus = getTarawehStatus(today)
  const deeds = getDeedsByDate(today)
  const todayTasbeeh = tasbeeh[today] || {}
  const tasbeehTotal = Object.values(todayTasbeeh).reduce((sum, count) => sum + (typeof count === 'number' ? count : 0), 0)

  const todos = useMemo(() => {
    const items = []

    // Prayers
    PRAYERS.forEach(prayer => {
      const completed = prayerStatus[prayer.id]?.completed || false
      items.push({
        id: `prayer_${prayer.id}`,
        type: 'prayer',
        label: prayer.name,
        arabic: prayer.arabic,
        completed,
        notRequired: isPeriod,
        progress: completed ? 100 : 0
      })
    })

    // Morning Azkar
    items.push({
      id: 'azkar_morning',
      type: 'azkar',
      label: 'Morning Azkar',
      arabic: 'أذكار الصباح',
      completed: azkarStatus.morning,
      notRequired: isPeriod,
      progress: morningCompletion.percentage
    })

    // Evening Azkar
    items.push({
      id: 'azkar_evening',
      type: 'azkar',
      label: 'Evening Azkar',
      arabic: 'أذكار المساء',
      completed: azkarStatus.evening,
      notRequired: isPeriod,
      progress: eveningCompletion.percentage
    })

    // Tasbeeh
    items.push({
      id: 'tasbeeh',
      type: 'tasbeeh',
      label: 'Tasbeeh',
      arabic: 'التسبيح',
      completed: tasbeehTotal > 0,
      notRequired: false,
      progress: tasbeehTotal > 0 ? Math.min(100, (tasbeehTotal / 100) * 100) : 0,
      count: tasbeehTotal
    })

    // Taraweh
    items.push({
      id: 'taraweh',
      type: 'taraweh',
      label: 'Taraweh Prayer',
      arabic: 'صلاة التراويح',
      completed: tarawehStatus.completed,
      notRequired: isPeriod,
      progress: tarawehStatus.completed ? 100 : 0
    })

    // Tafsir (simplified - we don't track daily tafsir completion, so we'll show it as optional)
    items.push({
      id: 'tafsir',
      type: 'tafsir',
      label: 'Tafsir Reading',
      arabic: 'التفسير',
      completed: false, // Tafsir is tracked separately, not daily
      notRequired: isPeriod,
      progress: 0
    })

    // Quran
    const juzCompleted = quran.completedJuz?.length || 0
    items.push({
      id: 'quran',
      type: 'quran',
      label: 'Quran Reading',
      arabic: 'القرآن',
      completed: juzCompleted > 0,
      notRequired: isPeriod,
      progress: (juzCompleted / 30) * 100,
      count: juzCompleted
    })

    return items
  }, [
    isPeriod,
    prayerStatus,
    azkarStatus,
    morningCompletion,
    eveningCompletion,
    tarawehStatus,
    tasbeehTotal,
    quran
  ])

  const completedCount = todos.filter(t => t.completed).length
  const totalCount = todos.filter(t => !t.notRequired).length
  const completionPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0

  return {
    todos,
    completedCount,
    totalCount,
    completionPercentage
  }
}

