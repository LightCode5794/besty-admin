import { callApi } from "../requestbase";
export const apiGetDetailProduct = async (productId: number) => await callApi<any>(`/products/${productId}`, 'GET');    