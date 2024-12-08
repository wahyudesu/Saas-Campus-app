"use server";

import {prisma} from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const createFolder = async (folderData: { name: string; slug: string; due_date?: Date; class_type?: string }) => {
    return await prisma.folders.create({
      data: folderData,
    })
  }
  
  // Delete an existing folder
  export const deleteFolder = async (id: number) => {
    return await prisma.folders.delete({
      where: { id },
    })
  }
  
// export async function createFolder(formData: FormData) {
//   const name = formData.get("name") as string;
//   const slug = formData.get("slug") as string;

//   if (!name.trim() || !slug.trim()) {
//     return;
//   }

//   await prisma.folders.create({
//     data: {
//       name,
//       slug,
//     },
//   });

//   revalidatePath("/");
// }

export async function updateFolder(formData: FormData) {
  const inputId = formData.get("inputId") as string;
  const newName = formData.get("newName") as string;
  const newSlug = formData.get("newSlug") as string;

  await prisma.folders.update({
    where: {
      id: Number(inputId),
    },
    data: {
      name: newName,
      slug: newSlug,
    },
  });

  revalidatePath("/");
}

// export async function deleteFolder(formData: FormData) {
//   const inputId = formData.get("inputId") as string;

//   await prisma.folders.delete({
//     where: {
//       id: Number(inputId),
//     },
//   });

//   revalidatePath("/");
// }

export async function getFolder(inputId: string) {
  const folder = await prisma.folders.findUnique({
    where: {
      id: Number(inputId),
    },
  });

  return folder;
}