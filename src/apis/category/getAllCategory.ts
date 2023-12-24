
import { callApi } from "../requestbase";

export const apiGetAllCategories = async () => await callApi<any>('/categories', 'GET');