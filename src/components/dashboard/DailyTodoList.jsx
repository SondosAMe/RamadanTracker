import { useNavigate } from 'react-router-dom'
import { Card, ProgressBar } from '../common'
import { TodoItem } from './TodoItem'
import { useDailyTodos } from '../../hooks/useDailyTodos'

export function DailyTodoList() {
  const { todos, completedCount, totalCount, completionPercentage } = useDailyTodos()
  const navigate = useNavigate()

  const handleTodoClick = (todo) => {
    // Navigate to appropriate page based on todo type
    switch (todo.type) {
      case 'prayer':
        navigate('/prayer')
        break
      case 'azkar':
        navigate(`/azkar/${todo.id === 'azkar_morning' ? 'morning' : 'evening'}`)
        break
      case 'tasbeeh':
        navigate('/tasbeeh')
        break
      case 'taraweh':
        navigate('/taraweh')
        break
      case 'tafsir':
        navigate('/tafsir')
        break
      case 'quran':
        navigate('/quran')
        break
      default:
        break
    }
  }

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-text">Daily Tasks</h3>
          <p className="text-sm text-text-light">
            {completedCount} of {totalCount} completed
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-primary">{completionPercentage}%</p>
        </div>
      </div>

      <ProgressBar 
        value={completedCount} 
        max={totalCount} 
        color="primary"
        className="mb-4"
      />

      <div className="space-y-2">
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onClick={() => handleTodoClick(todo)}
          />
        ))}
      </div>
    </Card>
  )
}

