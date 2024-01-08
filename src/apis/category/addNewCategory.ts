import { callApi } from "../requestbase";
export const apiAddNewCategory = async (category: any) => await callApi<any>('/categories', 'POST', category);