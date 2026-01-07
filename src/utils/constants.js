// Prayer names with Arabic
export const PRAYERS = [
  { id: 'fajr', name: 'Fajr', arabic: 'الفجر' },
  { id: 'dhuhr', name: 'Dhuhr', arabic: 'الظهر' },
  { id: 'asr', name: 'Asr', arabic: 'العصر' },
  { id: 'maghrib', name: 'Maghrib', arabic: 'المغرب' },
  { id: 'isha', name: 'Isha', arabic: 'العشاء' }
]

// Aladhan calculation methods
export const CALCULATION_METHODS = [
  { id: 0, name: 'Shia Ithna-Ashari' },
  { id: 1, name: 'University of Islamic Sciences, Karachi' },
  { id: 2, name: 'Islamic Society of North America (ISNA)' },
  { id: 3, name: 'Muslim World League' },
  { id: 4, name: 'Umm Al-Qura University, Makkah' },
  { id: 5, name: 'Egyptian General Authority of Survey' },
  { id: 7, name: 'Institute of Geophysics, University of Tehran' },
  { id: 8, name: 'Gulf Region' },
  { id: 9, name: 'Kuwait' },
  { id: 10, name: 'Qatar' },
  { id: 11, name: 'Majlis Ugama Islam Singapura' },
  { id: 12, name: 'Union Organization Islamic de France' },
  { id: 13, name: 'Diyanet İşleri Başkanlığı, Turkey' },
  { id: 14, name: 'Spiritual Administration of Muslims of Russia' },
  { id: 15, name: 'Moonsighting Committee Worldwide' }
]

// Good deeds categories
export const DEED_CATEGORIES = [
  { id: 'charity', name: 'Charity', icon: '💝', color: '#E74C3C' },
  { id: 'kindness', name: 'Kindness', icon: '🤝', color: '#3498DB' },
  { id: 'helping', name: 'Helping Others', icon: '🙌', color: '#2ECC71' },
  { id: 'family', name: 'Family', icon: '👨‍👩‍👧‍👦', color: '#9B59B6' },
  { id: 'learning', name: 'Learning', icon: '📚', color: '#F39C12' },
  { id: 'other', name: 'Other', icon: '✨', color: '#1ABC9C' }
]

// Tasbeeh phrases
export const TASBEEH_PHRASES = [
  { id: 'subhanallah', phrase: 'سُبْحَانَ اللهِ', transliteration: 'SubhanAllah', meaning: 'Glory be to Allah' },
  { id: 'alhamdulillah', phrase: 'الْحَمْدُ لِلَّهِ', transliteration: 'Alhamdulillah', meaning: 'All praise is due to Allah' },
  { id: 'allahuakbar', phrase: 'اللهُ أَكْبَرُ', transliteration: 'Allahu Akbar', meaning: 'Allah is the Greatest' },
  { id: 'lailaha', phrase: 'لَا إِلٰهَ إِلَّا اللهُ', transliteration: 'La ilaha illallah', meaning: 'There is no god but Allah' },
  { id: 'astaghfirullah', phrase: 'أَسْتَغْفِرُ اللهَ', transliteration: 'Astaghfirullah', meaning: 'I seek forgiveness from Allah' },
  { id: 'la_hawla', phrase: 'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللهِ', transliteration: 'La hawla wa la quwwata illa billah', meaning: 'There is no power nor strength except with Allah' }
]

// Tasbeeh goal presets
export const TASBEEH_GOALS = [33, 99, 100, 1000]

// Quran Juz names (optional Arabic names for each juz)
export const JUZ_NAMES = [
  'Alif Lam Mim', 'Sayaqool', 'Tilkar Rusul', 'Lan Tana Loo', 'Wal Mohsanat',
  'La Yuhibbullah', 'Wa Iza Samiu', 'Wa Lau Annana', 'Qalal Malao', 'Wa Alamu',
  'Yatazeroon', 'Wa Ma Min Dabbah', 'Wa Ma Ubrioo', 'Rubama', 'Subhanallazi',
  'Qal Alam', 'Iqtaraba', 'Qadd Aflaha', 'Wa Qalallazina', 'Amman Khalaq',
  'Utlu Ma Oohi', 'Wa Man Yaqnut', 'Wa Mali', 'Faman Azlam', 'Ilaihi Yuraddu',
  'Ha Mim', 'Qala Fama Khatbukum', 'Qadd Sami Allah', 'Tabarakallazi', 'Amma'
]

// Surah list for Tafsir tracker
export const SURAHS = [
  'Al-Fatiha', 'Al-Baqarah', 'Aal-E-Imran', 'An-Nisa', 'Al-Maidah', 'Al-Anam', 'Al-Araf',
  'Al-Anfal', 'At-Tawbah', 'Yunus', 'Hud', 'Yusuf', 'Ar-Ra\'d', 'Ibrahim', 'Al-Hijr',
  'An-Nahl', 'Al-Isra', 'Al-Kahf', 'Maryam', 'Ta-Ha', 'Al-Anbiya', 'Al-Hajj', 'Al-Mu\'minun',
  'An-Nur', 'Al-Furqan', 'Ash-Shu\'ara', 'An-Naml', 'Al-Qasas', 'Al-Ankabut', 'Ar-Rum',
  'Luqman', 'As-Sajdah', 'Al-Ahzab', 'Saba', 'Fatir', 'Ya-Sin', 'As-Saffat', 'Sad',
  'Az-Zumar', 'Ghafir', 'Fussilat', 'Ash-Shura', 'Az-Zukhruf', 'Ad-Dukhan', 'Al-Jathiyah',
  'Al-Ahqaf', 'Muhammad', 'Al-Fath', 'Al-Hujurat', 'Qaf', 'Adh-Dhariyat', 'At-Tur',
  'An-Najm', 'Al-Qamar', 'Ar-Rahman', 'Al-Waqiah', 'Al-Hadid', 'Al-Mujadilah', 'Al-Hashr',
  'Al-Mumtahanah', 'As-Saff', 'Al-Jumuah', 'Al-Munafiqun', 'At-Taghabun', 'At-Talaq',
  'At-Tahrim', 'Al-Mulk', 'Al-Qalam', 'Al-Haqqah', 'Al-Ma\'arij', 'Nuh', 'Al-Jinn',
  'Al-Muzzammil', 'Al-Muddaththir', 'Al-Qiyamah', 'Al-Insan', 'Al-Mursalat', 'An-Naba',
  'An-Nazi\'at', 'Abasa', 'At-Takwir', 'Al-Infitar', 'Al-Mutaffifin', 'Al-Inshiqaq',
  'Al-Buruj', 'At-Tariq', 'Al-A\'la', 'Al-Ghashiyah', 'Al-Fajr', 'Al-Balad', 'Ash-Shams',
  'Al-Lail', 'Ad-Duha', 'Ash-Sharh', 'At-Tin', 'Al-Alaq', 'Al-Qadr', 'Al-Bayyinah',
  'Az-Zalzalah', 'Al-Adiyat', 'Al-Qariah', 'At-Takathur', 'Al-Asr', 'Al-Humazah',
  'Al-Fil', 'Quraish', 'Al-Ma\'un', 'Al-Kawthar', 'Al-Kafirun', 'An-Nasr', 'Al-Masad',
  'Al-Ikhlas', 'Al-Falaq', 'An-Nas'
]

// Storage keys
export const STORAGE_KEYS = {
  SETTINGS: 'ramadan_settings',
  PRAYERS: 'ramadan_prayers',
  QURAN: 'ramadan_quran',
  AZKAR: 'ramadan_azkar',
  TAFSIR: 'ramadan_tafsir',
  TARAWEH: 'ramadan_taraweh',
  DEEDS: 'ramadan_deeds',
  PERIOD: 'ramadan_period',
  TASBEEH: 'ramadan_tasbeeh'
}

// Default settings
export const DEFAULT_SETTINGS = {
  location: { lat: null, lng: null, city: '' },
  calculationMethod: 2, // ISNA
  theme: 'light',
  dateFormat: 'gregorian'
}

