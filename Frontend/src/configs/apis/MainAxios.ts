import Axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { ENV } from "@configs/Environment";

export const MainAxios = Axios.create({
  baseURL: ENV.BASE_API,
});

MainAxios.interceptors.request.use((request: InternalAxiosRequestConfig) => {
  return request;
});

MainAxios.interceptors.response.use(
  (response: AxiosResponse) => {
    return Promise.resolve(response.data);
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);
