"use client"

import { useState, useEffect, Key } from "react";
import { PrismaClient } from '@prisma/client';
import FolderItem from "@/components/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const prisma = new PrismaClient();

async function getFolders() {
  return prisma.folders.findMany({
    orderBy: {
      created_at: 'desc', // Menampilkan folder berdasarkan tanggal pembuatan terbaru
    },
  });
}

export default async function HomePage() {
  // Mengambil data folder dari database
  const folders = await getFolders();

  const [newFolder, setNewFolder] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredFolders = folders.filter((folder) =>
    folder.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex">
      {/* Sidebar */}
      <AppSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="min-h-screen flex flex-col items-center justify-start p-4 mt-10">
          <h1 className="text-2xl font-bold mb-8">Management Tugas</h1>

          {/* Search Input */}
          <div className="w-full max-w-2xl mb-4">
            <Input
              type="text"
              placeholder="Search folder by name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mb-4"
            />
          </div>

          {/* Sorting Controls */}
          <div className="w-full max-w-2xl mb-2">
            <div className="mb-4 flex gap-3">
              <Button
                className="bg-blue-700 rounded-xl hover:bg-blue-900"
                onClick={() => setIsDialogOpen(true)}
              >
                + Add Assignment
              </Button>
            </div>
          </div>

          {/* Folder List */}
          <div className="w-full max-w-2xl">
            <div className="grid grid-cols-3 gap-4 mb-4">
              {filteredFolders.map((folder) => (
                <FolderItem
                  key={folder.id}
                  id={folder.id.toString()}
                  name={folder.name}
                  fileCount={0} // Placeholder for file count
                  isPinned={false}
                  due_date={folder.due_date}
                  is_late={folder.is_late}
                  class_type={folder.class_type}
                  onOpen={() => console.log(`Open folder ${folder.id}`)}
                  onRename={(id, newName) => console.log(`Rename folder ${id} to ${newName}`)}
                  onDelete={() => console.log(`Delete folder ${folder.id}`)}
                  onPin={() => console.log("Pin functionality is not implemented")}
                />
              ))}
            </div>
          </div>

          {/* Add Assignment Dialog */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Assignment</DialogTitle>
              </DialogHeader>
              <div className="py-4">
                <Input
                  type="text"
                  placeholder="Enter assignment name"
                  value={newFolder}
                  onChange={(e) => setNewFolder(e.target.value)}
                />
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Batal
                </Button>
                <Button onClick={() => console.log("Add Folder functionality here")}>Oke</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
