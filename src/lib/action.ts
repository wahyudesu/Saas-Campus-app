"use server"

export const savefolders = async (formData : FormData) => {
    const data = Object.fromEntries(formData.entries());
    console.log(data);
}