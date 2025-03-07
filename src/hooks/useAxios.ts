import axios, { AxiosError, AxiosInstance, CreateAxiosDefaults } from "axios";

export interface HttpErrorResponse {
  message: string;
  error: string;
}

let axiosInstance: AxiosInstance | undefined = undefined;

export default function useAxios() {
  if (axiosInstance) return axiosInstance;

  const config: CreateAxiosDefaults = {
    baseURL: "http://localhost:3000/api/",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };

  axiosInstance = axios.create(config);

  axiosInstance.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error: AxiosError<HttpErrorResponse>) {
      console.error(error);

      // TODO: Add notification system for errors

      return null;
    }
  );

  return axiosInstance;
}
