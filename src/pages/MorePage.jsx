import { Link } from 'react-router-dom'
import { PageLayout } from '../components/layout'
import { 
  Card, 
  BookOpenIcon, 
  MoonIcon, 
  BeadsIcon, 
  SparklesIcon, 
  CalendarIcon, 
  SettingsIcon,
  ChevronRightIcon,
  IslamicDivider
} from '../components/common'

const menuItems = [
  { path: '/tafsir', Icon: BookOpenIcon, iconColor: 'text-amber-500', bgColor: 'bg-gradient-to-br from-amber-500/20 to-amber-500/5', title: 'Tafsir', arabic: 'التفسير', description: 'Track your daily Quran reflection' },
  { path: '/taraweh', Icon: MoonIcon, iconColor: 'text-indigo-500', bgColor: 'bg-gradient-to-br from-indigo-500/20 to-indigo-500/5', title: 'Taraweh', arabic: 'التراويح', description: 'Ramadan night prayer tracker' },
  { path: '/tasbeeh', Icon: BeadsIcon, iconColor: 'text-teal-500', bgColor: 'bg-gradient-to-br from-teal-500/20 to-teal-500/5', title: 'Tasbeeh', arabic: 'التسبيح', description: 'Digital dhikr counter' },
  { path: '/deeds', Icon: SparklesIcon, iconColor: 'text-yellow-500', bgColor: 'bg-gradient-to-br from-yellow-500/20 to-yellow-500/5', title: 'Good Deeds', arabic: 'الأعمال الصالحة', description: 'Log your daily acts of kindness' },
  { path: '/period', Icon: CalendarIcon, iconColor: 'text-rose-500', bgColor: 'bg-gradient-to-br from-rose-500/20 to-rose-500/5', title: 'Period Tracker', arabic: 'الدورة الشهرية', description: 'Manage prayer exemptions' },
]

export function MorePage() {
  return (
    <PageLayout title="More">
      <div className="space-y-3">
        {menuItems.map((item, index) => (
          <Link key={item.path} to={item.path}>
            <Card 
              hover 
              className="flex items-center gap-4 stagger-item"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className={`w-12 h-12 rounded-xl ${item.bgColor} flex items-center justify-center ${item.iconColor} transition-transform duration-300 group-hover:scale-110`}>
                <item.Icon className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-text">{item.title}</h3>
                  <span className="arabic text-secondary text-sm">{item.arabic}</span>
                </div>
                <p className="text-sm text-text-light truncate">{item.description}</p>
              </div>
              <ChevronRightIcon className="w-5 h-5 text-text-light flex-shrink-0" />
            </Card>
          </Link>
        ))}
        
        <IslamicDivider />
        
        {/* Settings */}
        <Link to="/settings">
          <Card 
            hover 
            className="flex items-center gap-4 stagger-item"
            style={{ animationDelay: '0.3s' }}
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gray-500/20 to-gray-500/5 flex items-center justify-center text-gray-500">
              <SettingsIcon className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-text">Settings</h3>
                <span className="arabic text-secondary text-sm">الإعدادات</span>
              </div>
              <p className="text-sm text-text-light">Location, theme, and data</p>
            </div>
            <ChevronRightIcon className="w-5 h-5 text-text-light flex-shrink-0" />
          </Card>
        </Link>
      </div>
    </PageLayout>
  )
}
