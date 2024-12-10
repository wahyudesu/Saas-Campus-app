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
import { format } from "date-fns";
import { getfolders } from "@/lib/data";

const formatDueDate = (isoDate: string | null) => {
  if (!isoDate) return null;
  const date = new Date(isoDate);
  return format(date, "d MMMM HH:mm");
};

const FolderCard = memo(({ folder }: { folder: any }) => {
  const { id, name_assignment, slug, due_date, class_type } = folder;
  const formattedDueDate = formatDueDate(due_date);

  return (
    <div className="relative p-4 border rounded-lg hover:shadow-md transition">
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
        <Link href={`/folder/${slug}`}>
          <h3 className="text-lg font-semibold hover:underline">{name_assignment}</h3>
        </Link>
      </div>

      {/* Tanggal Due Date */}
      <div className="text-left text-sm text-gray-600 mb-4">
        {formattedDueDate ? `Due: ${formattedDueDate}` : "No due date"}
      </div>

      {/* Badge untuk Class Type dan Late Status */}
      <div className="flex justify-start flex-wrap gap-2">
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
            <DropdownMenuItem onClick={() => console.log(`Pin ${id}`)}>
              Pin
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log(`Rename ${id}`)}>
              Rename
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => console.log(`Delete ${id}`)}
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

const FolderCardList = async () => {
  const folders = await getfolders();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {folders.map((folder: any) => (
        <FolderCard key={folder.id} folder={folder} />
      ))}
    </div>
  );
};

export default FolderCardList;
