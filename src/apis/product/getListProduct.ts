import { callApi } from "../requestbase";

export const apiGetAllProducts = async () => await callApi<any>('/Products', 'GET');