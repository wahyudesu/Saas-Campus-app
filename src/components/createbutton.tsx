'use client'

import { useState } from 'react'

const CreateFolderButton = () => {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    due_date: '',
    class_type: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/folders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          due_date: formData.due_date ? new Date(formData.due_date) : undefined,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create folder')
      }

      alert('Folder created successfully!')
      setFormData({ name: '', slug: '', due_date: '', class_type: '' })
    } catch (error) {
      console.error(error)
      alert('Error creating folder')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div>
      <button
        onClick={() => setFormData({ ...formData, isOpen: true })}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Create Folder
      </button>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mt-4 flex flex-col space-y-2">
        <input
          type="text"
          placeholder="Folder Name"
          className="p-2 border border-gray-300 rounded"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Folder Slug"
          className="p-2 border border-gray-300 rounded"
          value={formData.slug}
          onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
          required
        />
        <input
          type="date"
          className="p-2 border border-gray-300 rounded"
          value={formData.due_date}
          onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
        />
        <input
          type="text"
          placeholder="Class Type"
          className="p-2 border border-gray-300 rounded"
          value={formData.class_type}
          onChange={(e) => setFormData({ ...formData, class_type: e.target.value })}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-green-500 text-white p-2 rounded"
        >
          {isSubmitting ? 'Creating...' : 'Submit'}
        </button>
      </form>
    </div>
  )
}

export default CreateFolderButton
