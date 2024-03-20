import { callApi } from "../requestbase";
export const apiUpdateStatusOrder = async (id: any, status: any) => 
    await callApi<any>(`/orders/${id}/status`, 'PUT', { status: status });