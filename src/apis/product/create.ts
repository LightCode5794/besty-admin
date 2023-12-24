import { callApi } from "../requestbase";
export const apiCreateProduct = async (newProduct: any) => await callApi<any>('/products', 'POST', newProduct);