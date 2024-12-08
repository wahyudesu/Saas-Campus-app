'use client'

const DeleteFolderButton = ({ folderId }: { folderId: number }) => {
  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this folder?')) return

    try {
      const response = await fetch(`/api/folders/${folderId}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Failed to delete folder')
      }

      alert('Folder deleted successfully!')
      // Optionally, trigger a re-fetch of the folder list
    } catch (error) {
      console.error(error)
      alert('Error deleting folder')
    }
  }

  return (
    <button onClick={handleDelete} className="bg-red-500 text-white p-2 rounded">
      Delete Folder
    </button>
  )
}

export default DeleteFolderButton
