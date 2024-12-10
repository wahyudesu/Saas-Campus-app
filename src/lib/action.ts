"use server"

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const savefolders = async (formData: FormData) => {
    const data = Object.fromEntries(formData.entries());
    console.log(data)
    try {
        await prisma.folders.create({
            data: {
                name_assignment: data.name_assignment as string,
                created_at: new Date(data.created_at as string),
                due_date: new Date(data.due_date as string),
                class_type: data.kelas as string,
                description: data.description as string,
                assignment_type: data.assignment_type as string
            }
        });
    } catch (error) {
        console.error("Error creating folder:", error);
        throw new Error("Failed to create folder");
    }
    revalidatePath("/assignment");
    redirect("/assignment");
}