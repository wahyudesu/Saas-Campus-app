import { memo } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { EllipsisVertical } from "lucide-react";
import Link from "next/link";
import { format } from 'date-fns';

export interface FolderItemProps {
  id: string;
  name: string;
  fileCount: number;
  isPinned: boolean;
  due_date: string; 
  is_late: boolean; 
  class_type?: string; 
  onOpen: () => void;
  onRename: (id: string, newName: string) => Promise<void>;
  onDelete: () => void;
  onPin: () => void;
}

const FolderItem = memo(function FolderItem({
  id,
  name,
  fileCount,
  isPinned,
  due_date,
  is_late,
  class_type,
  onOpen,
  onRename,
  onDelete,
  onPin,
}: FolderItemProps) {
  // Fungsi untuk memformat due_date menjadi format yang diinginkan
  const formatDueDate = (isoDate: string) => {
    const date = new Date(isoDate);
    return format(date, "d MMMM HH:mm");  // Menggunakan format internasional standar
  };

  // Formatkan due_date hanya jika ada
  const formattedDueDate = due_date ? formatDueDate(due_date) : null;

  return (
    <div
      className={`p-4 rounded-lg border shadow-sm ${
        isPinned ? "border-yellow-500" : "border-gray-200"
      } bg-gray-100 hover:bg-gray-200 cursor-pointer group relative`}
    >
      {/* Bagian Gambar Folder */}
      <div className="flex justify-start mb-2">
        <img
          src="/open-folder.png"
          alt="Folder"
          className="w-16 h-16"
        />
      </div>

      {/* Nama Folder */}
      <div className="text-left mb-2">
        <Link href={`/folder/${name}`}>
          <div onClick={onOpen}>
            <h3 className="text-lg font-semibold">{name}</h3>
          </div>
        </Link>
      </div>

      {/* Tanggal Due Date */}
      <div className="text-left text-sm text-gray-600 mb-4">
        {formattedDueDate ? `Due: ${formattedDueDate}` : "No due date"}
      </div>

      {/* Badge untuk Class Type dan Late Status */}
      <div className="flex justify-start flex-wrap gap-2">
        {is_late && (
          <span className="px-2 py-1 rounded-full bg-red-100 text-red-600 text-xs font-medium">
            Late
          </span>
        )}
        {class_type && (
          <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-600 text-xs font-medium">
            {class_type}
          </span>
        )}
      </div>

      {/* Dropdown Menu */}
      <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className="opacity-0 group-hover:opacity-100 bg-gray-200 text-black hover:bg-gray-200"
              aria-label="Folder options"
            >
              <EllipsisVertical className="w-5 h-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="z-10">
            <DropdownMenuItem onClick={onPin}>
              {isPinned ? "Unpin" : "Pin"}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onRename(id, name)}>
              Rename
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={onDelete}
              className="text-red-500 font-semibold"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
});

export default FolderItem;
