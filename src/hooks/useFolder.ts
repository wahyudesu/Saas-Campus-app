import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

// Define a strong type for the Folder interface
interface Folder {
  id: string;
  name: string;
  slug: string;
  created_at?: string;
  due_date?: string; // Optional due date
  is_late: boolean;   // Status indicating if the folder is late
  class_type?: string; // Optional class type
}

const createSlug = (folderName: string) => {
  return folderName.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]/g, '');
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_KEY || ''
);

export const useFolders = () => {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch folders
  const fetchFolders = async (sortBy: 'name' | 'date' = 'date') => {
    try {
      setIsLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from('folders')
        .select('*')
        .order(sortBy === 'name' ? 'name' : 'created_at', { ascending: true });

      if (error) throw error;
      setFolders(data || []);
    } catch (err: any) {
      const errorMessage = err.message || 'Failed to fetch folders';
      setError(errorMessage);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  // Add folder
  const addFolder = async (name: string, dueDate?: string, isLate: boolean = false, classType?: string) => {
    if (!name.trim()) {
      setError("Folder name cannot be empty.");
      return null;
    }

    const slug = createSlug(name);

    try {
      setIsLoading(true);
      setError(null);

      // Check for existing folder
      const { data: existingFolder } = await supabase
        .from('folders')
        .select('slug')
        .eq('slug', slug)
        .single();

      if (existingFolder) {
        setError("A folder with this name already exists.");
        return null;
      }

      // Insert new folder
      const { data, error: insertError } = await supabase
        .from('folders')
        .insert([{ name, slug, due_date: dueDate, is_late: isLate, class_type: classType }])
        .select();

      if (insertError) throw insertError;

      // Refresh folders list
      await fetchFolders('date');

      return data?.[0] || null;
    } catch (err: any) {
      const errorMessage = err.message || "Failed to create folder.";
      setError(errorMessage);
      console.error(err);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Rename folder
  const renameFolder = async (id: string, newName: string, dueDate?: string, isLate?: boolean, classType?: string) => {
    if (!newName.trim()) {
      setError("Folder name cannot be empty.");
      return null;
    }

    const slug = createSlug(newName); // Generate slug based on the new name

    try {
      setIsLoading(true);
      setError(null);

      // Check if a folder with the same slug already exists
      const { data: existingFolder } = await supabase
        .from('folders')
        .select('id')
        .eq('slug', slug)
        .single();

      if (existingFolder && existingFolder.id !== id) {
        setError("A folder with this name already exists.");
        return null;
      }

      // Proceed with updating the folder
      const { data, error } = await supabase
        .from('folders')
        .update({ name: newName, slug, due_date: dueDate, is_late: isLate, class_type: classType }) // Update with new values
        .eq('id', id)
        .select();

      if (error) {
        setError("Failed to rename folder.");
        console.error('Error renaming folder:', error);
        return null;
      }

      // Refresh the folder list after update
      await fetchFolders('date');
      return data?.[0] || null;

    } catch (error) {
      let errorMessage = "Failed to rename folder.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      console.log(errorMessage);
    }
  };

  // Delete folder
  const deleteFolder = async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const { error } = await supabase
        .from('folders')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // Refresh folders list
      await fetchFolders('date');

      return true;
    } catch (err: any) {
      const errorMessage = err.message || "Failed to delete folder.";
      setError(errorMessage);
      console.error(err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Optional: Add useEffect to fetch folders on initial mount
  useEffect(() => {
    fetchFolders();
  }, []);

  return {
    folders,
    isLoading,
    error,
    fetchFolders,
    addFolder,
    renameFolder,
    deleteFolder,
  };
};