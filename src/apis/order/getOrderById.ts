import { callApi } from "../requestbase";
export const apiGetOrderById = async (id : number) => await callApi<any>(`/orders/${id}`, 'GET');
