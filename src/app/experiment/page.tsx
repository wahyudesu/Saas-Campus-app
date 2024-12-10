
import FolderTable from "@/components/folder-table";
import FolderCardList from "@/components/card";
import FormAssignment from "@/components/createassignment";

const folderpage = () => {
    return (
        <div className="max-w-screen-md mx-auto mt-5">
            <div className="flex items-center justify-between gap-1 mb-5"></div>
            <h1 className="text-center text-3xl mb-4">Hello World</h1>
            <FormAssignment/>
            <FolderTable />
            <FolderCardList />
        </div>
    );
}

export default folderpage;