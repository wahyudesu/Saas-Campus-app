"use server"

import { getfolders } from "@/lib/data";
import FolderCard from "./card";

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
