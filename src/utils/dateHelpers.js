// Date formatting utilities

/**
 * Format date to YYYY-MM-DD string
 */
export function formatDateKey(date = new Date()) {
  return date.toISOString().split('T')[0]
}

/**
 * Parse YYYY-MM-DD string to Date object
 */
export function parseDateKey(dateKey) {
  return new Date(dateKey + 'T00:00:00')
}

/**
 * Format date for display
 */
export function formatDisplayDate(date = new Date(), options = {}) {
  const defaultOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
  return date.toLocaleDateString('en-US', { ...defaultOptions, ...options })
}

/**
 * Format time from HH:MM 24h to 12h format
 */
export function formatTime12h(time24) {
  if (!time24) return ''
  const [hours, minutes] = time24.split(':').map(Number)
  const period = hours >= 12 ? 'PM' : 'AM'
  const hours12 = hours % 12 || 12
  return `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`
}

/**
 * Get time difference in milliseconds between two time strings
 */
export function getTimeDiff(time1, time2) {
  const [h1, m1] = time1.split(':').map(Number)
  const [h2, m2] = time2.split(':').map(Number)
  return ((h2 - h1) * 60 + (m2 - m1)) * 60 * 1000
}

/**
 * Format milliseconds to countdown string
 */
export function formatCountdown(ms) {
  if (ms <= 0) return '00:00:00'
  
  const hours = Math.floor(ms / (1000 * 60 * 60))
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((ms % (1000 * 60)) / 1000)
  
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
}

/**
 * Get current time as HH:MM string
 */
export function getCurrentTime() {
  const now = new Date()
  return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
}

/**
 * Check if current time is past a given time
 */
export function isTimePast(timeStr) {
  const [hours, minutes] = timeStr.split(':').map(Number)
  const now = new Date()
  const targetTime = new Date()
  targetTime.setHours(hours, minutes, 0, 0)
  return now >= targetTime
}

/**
 * Get days in a month
 */
export function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate()
}

/**
 * Get first day of month (0 = Sunday, 6 = Saturday)
 */
export function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay()
}

/**
 * Generate calendar days array for a month
 */
export function generateCalendarDays(year, month) {
  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDayOfMonth(year, month)
  const days = []
  
  // Add empty slots for days before the 1st
  for (let i = 0; i < firstDay; i++) {
    days.push(null)
  }
  
  // Add actual days
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(new Date(year, month, day))
  }
  
  return days
}

/**
 * Check if two dates are the same day
 */
export function isSameDay(date1, date2) {
  if (!date1 || !date2) return false
  return date1.toDateString() === date2.toDateString()
}

/**
 * Check if date is today
 */
export function isToday(date) {
  return isSameDay(date, new Date())
}

/**
 * Get number of consecutive days from an array of date strings
 */
export function calculateStreak(dates) {
  if (!dates || dates.length === 0) return 0
  
  const sortedDates = [...dates]
    .map(d => new Date(d + 'T00:00:00'))
    .sort((a, b) => b - a)
  
  let streak = 0
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  // Check if streak includes today or yesterday
  const firstDate = sortedDates[0]
  const daysDiff = Math.floor((today - firstDate) / (1000 * 60 * 60 * 24))
  
  if (daysDiff > 1) return 0 // Streak broken
  
  streak = 1
  for (let i = 1; i < sortedDates.length; i++) {
    const diff = Math.floor((sortedDates[i - 1] - sortedDates[i]) / (1000 * 60 * 60 * 24))
    if (diff === 1) {
      streak++
    } else {
      break
    }
  }
  
  return streak
}

/**
 * Get Ramadan dates for a given year (approximate)
 * Note: Actual dates depend on moon sighting
 */
export function getRamadanDates(year) {
  // Ramadan 2026 is approximately Feb 17 - Mar 18
  // This is a simplified calculation - in production, use a proper Hijri calendar library
  const ramadanDates = {
    2025: { start: new Date(2025, 2, 1), end: new Date(2025, 2, 30) },
    2026: { start: new Date(2026, 1, 17), end: new Date(2026, 2, 18) },
    2027: { start: new Date(2027, 1, 7), end: new Date(2027, 2, 8) }
  }
  
  return ramadanDates[year] || ramadanDates[2026]
}

/**
 * Check if current date is during Ramadan
 */
export function isRamadan(date = new Date()) {
  const year = date.getFullYear()
  const { start, end } = getRamadanDates(year)
  return date >= start && date <= end
}

