import { CheckCircleIcon, SunriseIcon, MoonIcon, BeadsIcon, MosqueIcon, BookIcon, BookOpenIcon } from '../common'
import { ProgressBar } from '../common'

const ICON_MAP = {
  prayer: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  azkar: SunriseIcon,
  tasbeeh: BeadsIcon,
  taraweh: MosqueIcon,
  tafsir: BookOpenIcon,
  quran: BookIcon
}

export function TodoItem({ todo, onClick }) {
  const IconComponent = ICON_MAP[todo.type] || CheckCircleIcon
  const Icon = typeof IconComponent === 'function' ? IconComponent : IconComponent
  const isAzkar = todo.type === 'azkar'
  const isMorningAzkar = todo.id === 'azkar_morning'
  const AzkarIcon = isMorningAzkar ? SunriseIcon : MoonIcon

  return (
    <button
      onClick={onClick}
      className={`
        w-full p-3 rounded-xl text-left transition-all duration-200
        ${todo.completed 
          ? 'bg-success/10 border border-success/20' 
          : todo.notRequired
          ? 'bg-background-alt/50 border border-background-alt opacity-60'
          : 'bg-surface border border-primary/10 hover:border-primary/30 hover:shadow-md'
        }
      `}
      disabled={todo.notRequired}
    >
      <div className="flex items-center gap-3">
        {/* Icon */}
        <div className={`
          w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0
          ${todo.completed 
            ? 'bg-success/20 text-success' 
            : todo.notRequired
            ? 'bg-background-alt text-text-light'
            : 'bg-primary/10 text-primary'
          }
        `}>
          {isAzkar ? (
            <AzkarIcon className="w-5 h-5" />
          ) : typeof Icon === 'function' ? (
            <Icon />
          ) : (
            <Icon className="w-5 h-5" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`
              font-medium text-sm
              ${todo.completed ? 'text-success' : todo.notRequired ? 'text-text-light line-through' : 'text-text'}
            `}>
              {todo.label}
            </span>
            {todo.arabic && (
              <span className="arabic text-secondary text-xs">{todo.arabic}</span>
            )}
            {todo.notRequired && (
              <span className="text-xs text-text-light bg-background-alt px-2 py-0.5 rounded">Not required</span>
            )}
          </div>

          {/* Progress bar for items with progress */}
          {(isAzkar || todo.type === 'quran' || todo.type === 'tasbeeh') && !todo.notRequired && (
            <div className="mt-1">
              <ProgressBar 
                value={todo.progress} 
                max={100} 
                color={todo.completed ? "success" : "primary"}
                className="h-1.5"
              />
              <div className="flex items-center justify-between mt-0.5">
                <span className="text-xs text-text-light">{Math.round(todo.progress)}%</span>
                {todo.count !== undefined && (
                  <span className="text-xs text-text-light">{todo.count}</span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Checkmark */}
        <div className="flex-shrink-0">
          {todo.completed ? (
            <CheckCircleIcon className="w-5 h-5 text-success" />
          ) : (
            <div className="w-5 h-5 rounded-full border-2 border-text-light" />
          )}
        </div>
      </div>
    </button>
  )
}

