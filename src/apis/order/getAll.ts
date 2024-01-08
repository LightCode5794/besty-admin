import { callApi } from "../requestbase";
export const apiGetAllOrders = async () => await callApi<any>(`/orders`, 'GET');    