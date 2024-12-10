"use client"

import React, { useState } from 'react';
import { format } from 'date-fns';
import { Save } from 'lucide-react';
import { savefolders } from '@/lib/action';  // Pastikan action diimpor dengan benar

interface TaskFormData {
  name_assignment: string;
  slug: string;
  created_at: string;
  due_date: string;
  class_type: string;
  description: string;
}

const TaskCreationForm = ({ onClose }: { onClose: () => void }) => {
  const [taskData, setTaskData] = useState<TaskFormData>({
    name_assignment: '',
    slug: '',
    created_at: '',
    due_date: '',
    class_type: '',
    description: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate created_at timestamp
    const currentTimestamp = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
    
    // Prepare FormData
    const formData = new FormData();
    formData.append('name_assignment', taskData.name_assignment);
    formData.append('slug', taskData.name_assignment);  // You can adjust slug logic if necessary
    formData.append('created_at', currentTimestamp);
    formData.append('due_date', taskData.due_date);
    formData.append('class_type', taskData.class_type);
    formData.append('description', taskData.description);

    // Call savefolders directly to handle data
    const result = await savefolders(formData);
    
    // Handle result (you can show success or error messages here)
    console.log(result);  // Optionally log the result
    onClose(); // Close the form after submission
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTaskData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center">Buat Tugas Baru</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Form fields */}
          <div>
            <label htmlFor="name_assignment" className="block text-sm font-medium mb-1">
              Nama Tugas
            </label>
            <input 
              type="text" 
              id="name_assignment"
              name="name_assignment"
              value={taskData.name_assignment}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Masukkan nama tugas"
            />
          </div>

          <div>
            <label htmlFor="due_date" className="block text-sm font-medium mb-1">
              Deadline
            </label>
            <input 
              type="datetime-local" 
              id="due_date"
              name="due_date"
              value={taskData.due_date.replace(' ', 'T')}
              onChange={(e) => {
                const [date, time] = e.target.value.split('T');
                if (!time) return; // Add null check for time
                const timeWithSeconds = time.split(':').slice(0, 2).join(':') + ':00'; // Pastikan detik bernilai "00"
                const formattedDate = `${date} ${timeWithSeconds}`;
                setTaskData(prev => ({
                  ...prev,
                  due_date: formattedDate
                }));
              }}
              required
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>


          <div>
            <label htmlFor="class_type" className="block text-sm font-medium mb-1">
              Tipe Kelas
            </label>
            <select 
              id="class_type"
              name="class_type"
              value={taskData.class_type}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="">Pilih Tipe Kelas</option>
              <option value="SDT A">SDT A</option>
              <option value="SDT B">SDT B</option>
              <option value="SDT C">SDT C</option>
            </select>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-1">
              Deskripsi Tugas
            </label>
            <textarea 
              id="description"
              name="description"
              value={taskData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Tambahkan deskripsi tugas"
            />
          </div>

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
};

export default TaskCreationForm;
