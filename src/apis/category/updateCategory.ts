import { callApi } from "../requestbase";
export const apiUpdateCategory = async (category: any) => 
    await callApi<any>(`/categories/${category.id}`, 'PUT', { name: category.name });