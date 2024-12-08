"use client"

import React from 'react'
import useSWR from 'swr'
import FolderItem from '@/components/card'

interface Folder {
  id: string
  name: string
  fileCount: number
  isPinned: boolean
  due_date: string | null
  is_late: boolean
  class_type?: string
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const Home = () => {
  const { data: folders, error } = useSWR<Folder[]>('/api/folders', fetcher)

  if (error) return <div>Error loading folders</div>
  if (!folders) return <div>Loading...</div>

  const handleOpen = () => {
    // Logic to open the folder
  }

  const handleRename = async (id: string, newName: string) => {
    // Logic to rename the folder
  }

  const handleDelete = () => {
    // Logic to delete the folder
  }

  const handlePin = () => {
    // Logic to pin/unpin the folder
  }

  return (
    <div>
      <h1>Folders</h1>
      <div className="grid grid-cols-3 gap-4">
        {folders.map((folder) => (
          <FolderItem
            key={folder.id}
            id={folder.id}
            name={folder.name}
            fileCount={folder.fileCount}
            isPinned={folder.isPinned}
            due_date={folder.due_date || ''}
            is_late={folder.is_late}
            class_type={folder.class_type}
            onOpen={handleOpen}
            onRename={handleRename}
            onDelete={handleDelete}
            onPin={handlePin}
          />
        ))}
      </div>
    </div>
  )
}

export default Home
