import { getfolders } from "@/lib/data";

const FolderTable = async () => {
    const folders = await getfolders();

    return (
        <table className="min-w-full">
            <thead className="bg-gray-200">
                <tr>
                    <th className="px-4 py-2">ID</th>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Slug</th>
                    <th className="px-4 py-2">Due Date</th>
                    <th className="px-4 py-2">Class Type</th>
                </tr>
            </thead>
            <tbody>
                {folders?.map((folder) => (
                    <tr key={folder.id} className="border-b">
                        <td className="px-4 py-2">{folder.id}</td>
                        <td className="px-4 py-2">{folder.name}</td>
                        <td className="px-4 py-2">{folder.slug || 'N/A'}</td>
                        <td className="px-4 py-2">{folder.due_date?.toString() || 'N/A'}</td>
                        <td className="px-4 py-2">{folder.class_type || 'N/A'}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default FolderTable