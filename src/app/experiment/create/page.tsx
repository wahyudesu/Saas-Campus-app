"use client"

import React, { useState } from 'react';
import { format } from 'date-fns';
import { Calendar, Clock, Folder, Tag, Save } from 'lucide-react';

interface TaskFormData {
  name: string;
  dueDate: string;
  dueTime: string;
  classType: string;
}

export default function TaskCreationForm() {
  const [taskData, setTaskData] = useState<TaskFormData>({
    name: '',
    dueDate: '',
    dueTime: '',
    classType: ''
  });

  const [createdFolder, setCreatedFolder] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Buat folder berdasarkan nama tugas dan waktu pembuatan
    const folderName = `${taskData.name}-${format(new Date(), 'yyyy-MM-dd-HH-mm')}`;
    setCreatedFolder(folderName);

    // Tambahkan logika submit form di sini
    console.log('Task submitted:', taskData);
    console.log('Created folder:', folderName);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTaskData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 flex items-center justify-center">
          <Folder className="mr-2 text-blue-500" /> Buat Tugas Baru
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nama Tugas */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nama Tugas
            </label>
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                id="name"
                name="name"
                value={taskData.name}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Masukkan nama tugas"
              />
            </div>
          </div>

          {/* Tanggal Deadline */}
          <div>
            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
              Tanggal Deadline
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="date" 
                id="dueDate"
                name="dueDate"
                value={taskData.dueDate}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Waktu Deadline */}
          <div>
            <label htmlFor="dueTime" className="block text-sm font-medium text-gray-700 mb-1">
              Waktu Deadline
            </label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input 
                type="time" 
                id="dueTime"
                name="dueTime"
                value={taskData.dueTime}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Tipe Kelas */}
          <div>
            <label htmlFor="classType" className="block text-sm font-medium text-gray-700 mb-1">
              Tipe Kelas
            </label>
            <select 
              id="classType"
              name="classType"
              value={taskData.classType}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Pilih Tipe Kelas</option>
              <option value="online">Online</option>
              <option value="offline">Offline</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>

          {/* Folder Dibuat */}
          {createdFolder && (
            <div className="bg-green-50 border border-green-200 p-3 rounded-md">
              <p className="text-sm text-green-700">
                Folder dibuat: <span className="font-bold">{createdFolder}</span>
              </p>
            </div>
          )}

          {/* Tombol Submit */}
          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300 flex items-center justify-center"
          >
            <Save className="mr-2" /> Simpan Tugas
          </button>
        </form>
      </div>
    </div>
  );
}