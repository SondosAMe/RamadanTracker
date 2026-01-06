import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { AppProvider } from './context/AppContext'
import {
  Dashboard,
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

function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/prayer" element={<PrayerPage />} />
            <Route path="/quran" element={<QuranPage />} />
            <Route path="/tafsir" element={<TafsirPage />} />
            <Route path="/azkar" element={<AzkarPage />} />
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
