import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { AppProvider } from './context/AppContext'
import {
  Dashboard,
  DashboardPage,
  PrayerPage,
  QuranPage,
  TafsirPage,
  AzkarPage,
  TasbeehPage,
  TarawehPage,
  DeedsPage,
  PeriodPage,
  SettingsPage,
  MorePage
} from './pages'
import { HistoryView } from './components/dashboard/HistoryView'
import { AzkarDetailPage } from './components/azkar/AzkarDetailPage'

// Get base path for GitHub Pages deployment
const getBasePath = () => {
  // If we're on GitHub Pages, extract the repo name from the path
  if (window.location.pathname.startsWith('/') && window.location.pathname.split('/').length > 2) {
    const pathParts = window.location.pathname.split('/').filter(p => p)
    if (pathParts.length > 0 && pathParts[0] !== '') {
      return `/${pathParts[0]}/`
    }
  }
  return '/'
}

const basePath = getBasePath()

function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <BrowserRouter basename={basePath}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/history" element={<HistoryView />} />
            <Route path="/prayer" element={<PrayerPage />} />
            <Route path="/quran" element={<QuranPage />} />
            <Route path="/tafsir" element={<TafsirPage />} />
            <Route path="/azkar" element={<AzkarPage />} />
            <Route path="/azkar/morning" element={<AzkarDetailPage type="morning" />} />
            <Route path="/azkar/evening" element={<AzkarDetailPage type="evening" />} />
            <Route path="/tasbeeh" element={<TasbeehPage />} />
            <Route path="/taraweh" element={<TarawehPage />} />
            <Route path="/deeds" element={<DeedsPage />} />
            <Route path="/period" element={<PeriodPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/more" element={<MorePage />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </ThemeProvider>
  )
}

export default App
