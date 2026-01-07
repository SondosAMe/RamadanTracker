import { useMemo } from 'react'
import { useApp } from '../context/AppContext'
import { formatDateKey, parseDateKey, isSameDay } from '../utils/dateHelpers'
import { PRAYERS } from '../utils/constants'

/**
 * Custom hook to aggregate historical data by time period
 */
export function useHistoricalData(period = 'all') {
  const {
    prayers,
    quran,
    azkar,
    taraweh,
    deeds,
    tasbeeh
  } = useApp()

  const data = useMemo(() => {
    const now = new Date()
    let startDate = new Date()
    
    // Calculate start date based on period
    switch (period) {
      case 'week':
        startDate.setDate(now.getDate() - 7)
        break
      case 'month':
        startDate.setMonth(now.getMonth() - 1)
        break
      case 'year':
        startDate.setFullYear(now.getFullYear() - 1)
        break
      case 'all':
      default:
        startDate = new Date(0) // Beginning of time
        break
    }

    const dailyData = []
    const currentDate = new Date(startDate)
    const today = new Date()

    // Generate all dates in the period
    while (currentDate <= today) {
      const dateKey = formatDateKey(currentDate)
      const dayPrayers = prayers[dateKey] || {}
      const dayAzkar = azkar[dateKey] || { morning: {}, evening: {} }
      const dayTaraweh = taraweh[dateKey]
      const dayDeeds = deeds.filter(d => d.date === dateKey)
      const dayTasbeeh = tasbeeh[dateKey] || {}

      // Calculate prayer completion
      const prayersCompleted = PRAYERS.filter(p => dayPrayers[p.id]?.completed).length
      const prayerPercentage = (prayersCompleted / 5) * 100

      // Calculate azkar completion
      const morningAzkar = typeof dayAzkar.morning === 'boolean' 
        ? (dayAzkar.morning ? 100 : 0)
        : (() => {
            const items = Object.values(dayAzkar.morning || {})
            if (items.length === 0) return 0
            const completed = items.filter(item => item.completed).length
            return (completed / items.length) * 100
          })()
      
      const eveningAzkar = typeof dayAzkar.evening === 'boolean'
        ? (dayAzkar.evening ? 100 : 0)
        : (() => {
            const items = Object.values(dayAzkar.evening || {})
            if (items.length === 0) return 0
            const completed = items.filter(item => item.completed).length
            return (completed / items.length) * 100
          })()

      // Calculate overall score (weighted average)
      const overallScore = Math.round(
        (prayerPercentage * 0.3) +
        (morningAzkar * 0.15) +
        (eveningAzkar * 0.15) +
        ((dayTaraweh?.completed ? 100 : 0) * 0.1) +
        ((quran.completedJuz?.length || 0) / 30 * 100 * 0.2) +
        (Math.min(dayDeeds.length * 10, 100) * 0.1)
      )

      dailyData.push({
        date: dateKey,
        dateObj: new Date(currentDate),
        prayers: {
          completed: prayersCompleted,
          total: 5,
          percentage: prayerPercentage
        },
        azkar: {
          morning: morningAzkar,
          evening: eveningAzkar,
          average: (morningAzkar + eveningAzkar) / 2
        },
        taraweh: {
          completed: dayTaraweh?.completed || false,
          location: dayTaraweh?.location || null
        },
        quran: {
          juzCompleted: quran.completedJuz?.filter(juz => {
            // Check if juz was completed on or before this date
            // For simplicity, we'll use current juz count
            return true
          }).length || 0
        },
        deeds: {
          count: dayDeeds.length
        },
        tasbeeh: {
          total: Object.values(dayTasbeeh).reduce((sum, count) => sum + (typeof count === 'number' ? count : 0), 0)
        },
        overallScore
      })

      currentDate.setDate(currentDate.getDate() + 1)
    }

    return dailyData.reverse() // Most recent first
  }, [period, prayers, quran, azkar, taraweh, deeds, tasbeeh])

  // Calculate weekly summaries
  const weeklyData = useMemo(() => {
    const weeks = []
    const grouped = {}

    data.forEach(day => {
      const weekStart = new Date(day.dateObj)
      weekStart.setDate(weekStart.getDate() - weekStart.getDay()) // Start of week (Sunday)
      const weekKey = formatDateKey(weekStart)

      if (!grouped[weekKey]) {
        grouped[weekKey] = []
      }
      grouped[weekKey].push(day)
    })

    Object.entries(grouped).forEach(([weekKey, days]) => {
      const avgScore = days.reduce((sum, d) => sum + d.overallScore, 0) / days.length
      const totalPrayers = days.reduce((sum, d) => sum + d.prayers.completed, 0)
      const avgAzkar = days.reduce((sum, d) => sum + d.azkar.average, 0) / days.length
      const tarawehNights = days.filter(d => d.taraweh.completed).length
      const totalDeeds = days.reduce((sum, d) => sum + d.deeds.count, 0)

      weeks.push({
        weekStart: weekKey,
        days: days.length,
        averageScore: Math.round(avgScore),
        totalPrayers,
        averageAzkar: Math.round(avgAzkar),
        tarawehNights,
        totalDeeds
      })
    })

    return weeks.sort((a, b) => b.weekStart.localeCompare(a.weekStart))
  }, [data])

  // Calculate monthly summaries
  const monthlyData = useMemo(() => {
    const months = []
    const grouped = {}

    data.forEach(day => {
      const monthKey = `${day.dateObj.getFullYear()}-${String(day.dateObj.getMonth() + 1).padStart(2, '0')}`
      
      if (!grouped[monthKey]) {
        grouped[monthKey] = []
      }
      grouped[monthKey].push(day)
    })

    Object.entries(grouped).forEach(([monthKey, days]) => {
      const avgScore = days.reduce((sum, d) => sum + d.overallScore, 0) / days.length
      const totalPrayers = days.reduce((sum, d) => sum + d.prayers.completed, 0)
      const avgAzkar = days.reduce((sum, d) => sum + d.azkar.average, 0) / days.length
      const tarawehNights = days.filter(d => d.taraweh.completed).length
      const totalDeeds = days.reduce((sum, d) => sum + d.deeds.count, 0)

      months.push({
        month: monthKey,
        days: days.length,
        averageScore: Math.round(avgScore),
        totalPrayers,
        averageAzkar: Math.round(avgAzkar),
        tarawehNights,
        totalDeeds
      })
    })

    return months.sort((a, b) => b.month.localeCompare(a.month))
  }, [data])

  return {
    dailyData: data,
    weeklyData,
    monthlyData,
    stats: {
      totalDays: data.length,
      averageScore: data.length > 0 
        ? Math.round(data.reduce((sum, d) => sum + d.overallScore, 0) / data.length)
        : 0,
      totalPrayers: data.reduce((sum, d) => sum + d.prayers.completed, 0),
      totalTarawehNights: data.filter(d => d.taraweh.completed).length,
      totalDeeds: data.reduce((sum, d) => sum + d.deeds.count, 0)
    }
  }
}

