"use client";

import React, { useState, useCallback, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ColumnDef } from "@tanstack/react-table";
import Navbar from "@/components/navbar";
import { AppSidebar } from "@/components/sidebar";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";
import { Download, ExternalLink, FileIcon } from 'lucide-react';

interface UploadedFile {
  fileName: string;
  fileUrl?: string;
}

const FolderPage = ({ params }: { params: Promise<{ slug: string }> }) => {
  const [slug, setSlug] = useState<string>("");

  useEffect(() => {
    const fetchSlug = async () => {
      const resolvedParams = await params;
      setSlug(resolvedParams.slug);
    };
    fetchSlug();
  }, [params]);

  const [file, setFile] = useState<File | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Supabase client setup
  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_KEY || "";
  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
  const router = useRouter();

  // Fetch files from Supabase Storage
  const fetchFilesFromSupabase = async () => {
    try {
      const { data, error } = await supabase
        .storage
        .from("Pdf document homework")
        .list(slug, { limit: 100 });

      if (error) throw error;

      const files =
        data?.map((file) => ({
          fileName: file.name,
          fileUrl: `${SUPABASE_URL}/storage/v1/object/public/Pdf%20document%20homework/${slug}/${file.name}`,
        })) || [];

      setUploadedFiles(files);
    } catch (err) {
      setError("Failed to fetch files from Supabase");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFilesFromSupabase();
  }, [slug]);

  // Handle file input
  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== "application/pdf") {
        setError("Only PDF files are allowed");
        return;
      }
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError("File size should not exceed 10MB");
        return;
      }
      setFile(selectedFile);
      setError(null);
    }
  }, []);

  // Handle file upload
  const handleUpload = useCallback(async () => {
    if (!file) {
      setError("Please select a PDF file first");
      return;
    }

    const { name } = file;
    const filePath = `${slug}/${name}`;
    const storageBucket = "Pdf document homework";

    try {
      setIsLoading(true);
      setError(null);

      const { error: uploadError } = await supabase
        .storage
        .from(storageBucket)
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      fetchFilesFromSupabase();
      setFile(null);

      const fileInput = document.getElementById("fileInput") as HTMLInputElement;
      if (fileInput) fileInput.value = "";
    } catch (err) {
      const errorMessage = axios.isAxiosError(err)
        ? err.response?.data?.error || "Network error occurred"
        : "An unexpected error occurred";
      setError(errorMessage);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [file, slug]);

  const columns: ColumnDef<UploadedFile>[] = [
    {
      accessorKey: "fileName",
      header: "File Name",
      cell: ({ row }) => (
        <div className="flex items-center">
          <FileIcon className="mr-2 h-5 w-5 text-blue-500" />
          {row.getValue("fileName")}
        </div>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const file = row.original;
        return (
          <div className="flex justify-center space-x-2">
            {file.fileUrl && (
              <>
                <a
                  href={file.fileUrl}
                  download
                  className="inline-flex items-center justify-center w-8 h-8 text-blue-500 hover:text-blue-600 hover:bg-blue-100 rounded-full transition-colors"
                >
                  <Download className="h-5 w-5" />
                </a>
                <a
                  href={file.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-8 h-8 text-blue-500 hover:text-blue-600 hover:bg-blue-100 rounded-full transition-colors"
                >
                  <ExternalLink className="h-5 w-5" />
                </a>
              </>
            )}
          </div>
        );
      },
    },
    
  ];

  return (
    <div className="flex min-h-screen">
      <AppSidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <div className="p-4">
          <Button
            onClick={() => router.push("/")}
            className="bg-blue-700 rounded-xl hover:bg-blue-900"
          >
            Back to Folders
          </Button>
        </div>

        <div className="container mx-auto max-w-5xl px-4 py-8">
          <h1 className="text-3xl font-bold mb-6 text-center">{slug || "Untitled"}</h1>

          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex items-center space-x-4 mb-4">
              <input
                id="fileInput"
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="flex-grow file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              <button
                onClick={handleUpload}
                disabled={!file || isLoading}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? "Uploading..." : "Upload File"}
              </button>
            </div>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                {error}
              </div>
            )}

            {uploadedFiles.length > 0 && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-4">Uploaded Files</h2>
                <DataTable columns={columns} data={uploadedFiles} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FolderPage;

