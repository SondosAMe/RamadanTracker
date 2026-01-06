import { useState } from 'react'
import { Input, Textarea, Select, Button } from '../common'
import { DEED_CATEGORIES } from '../../utils/constants'

export function DeedForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    category: '',
    description: '',
    notes: ''
  })
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.category || !formData.description) return
    
    onSubmit(formData)
    setFormData({ category: '', description: '', notes: '' })
  }
  
  const categoryOptions = DEED_CATEGORIES.map(cat => ({
    id: cat.id,
    name: cat.name
  }))
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Select
        label="Category"
        value={formData.category}
        onChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
        options={categoryOptions}
        placeholder="Select category..."
      />
      
      <Input
        label="What good deed did you do?"
        value={formData.description}
        onChange={(value) => setFormData(prev => ({ ...prev, description: value }))}
        placeholder="e.g., Helped a neighbor with groceries"
      />
      
      <Textarea
        label="Additional notes (optional)"
        value={formData.notes}
        onChange={(value) => setFormData(prev => ({ ...prev, notes: value }))}
        placeholder="Any reflections or details..."
        rows={3}
      />
      
      <div className="flex gap-3">
        {onCancel && (
          <Button variant="ghost" onClick={onCancel} className="flex-1">
            Cancel
          </Button>
        )}
        <Button type="submit" className="flex-1">
          Add Deed
        </Button>
      </div>
    </form>
  )
}

