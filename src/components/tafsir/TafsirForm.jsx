import { useState } from 'react'
import { Input, Textarea, Select, Button } from '../common'
import { SURAHS } from '../../utils/constants'

export function TafsirForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    surah: '',
    ayahRange: '',
    pageNumber: '',
    notes: ''
  })
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.surah && !formData.pageNumber) return
    
    onSubmit(formData)
    setFormData({ surah: '', ayahRange: '', pageNumber: '', notes: '' })
  }
  
  const surahOptions = SURAHS.map((name, index) => ({
    id: index + 1,
    name: `${index + 1}. ${name}`
  }))
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Select
        label="Surah"
        value={formData.surah}
        onChange={(value) => setFormData(prev => ({ ...prev, surah: value }))}
        options={surahOptions}
        placeholder="Select Surah..."
      />
      
      <Input
        label="Ayah Range"
        value={formData.ayahRange}
        onChange={(value) => setFormData(prev => ({ ...prev, ayahRange: value }))}
        placeholder="e.g., 1-10"
      />
      
      <Input
        label="Page Number (optional)"
        type="number"
        value={formData.pageNumber}
        onChange={(value) => setFormData(prev => ({ ...prev, pageNumber: value }))}
        placeholder="e.g., 45"
      />
      
      <Textarea
        label="Reflections & Notes"
        value={formData.notes}
        onChange={(value) => setFormData(prev => ({ ...prev, notes: value }))}
        placeholder="What did you learn today?"
        rows={4}
      />
      
      <div className="flex gap-3">
        {onCancel && (
          <Button variant="ghost" onClick={onCancel} className="flex-1">
            Cancel
          </Button>
        )}
        <Button type="submit" className="flex-1">
          Save Entry
        </Button>
      </div>
    </form>
  )
}

