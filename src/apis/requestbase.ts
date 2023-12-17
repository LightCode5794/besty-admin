import axios, { AxiosResponse, AxiosError, Method} from 'axios';


const baseUrl = import.meta.env.VITE_BACKEND_BASE_URL;

export async function callApi<T extends {data: any}>(suffix: string, method: Method, data?: any): Promise<T> {
  try {
    // console.log(`${baseUrl}${suffix}`)
    const response: AxiosResponse<T> = await axios({
      url: `${baseUrl}${suffix}`,
      method: method,
      data: data,
      timeout: 5000
    });

    // console.log(response.data.data)

    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.log('HTTP response error:', error.response.status, error.response.data);
    } else if (error.request) {
      console.log('No response received from server:', error.request);
    } else {
      console.log('Error sending request:', error.message);
    }

    throw error;
  }
}