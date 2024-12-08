import {prisma} from "@/lib/prisma"

export const getfolders = async () =>{
    try {
        const folders = await prisma.folders.findMany();
        return folders;
    }   catch (error) {
        throw new Error("Failed to fetch folder data")
    }
}