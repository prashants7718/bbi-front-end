import axios, { CreateAxiosDefaults } from "axios";
import { toast } from "react-toastify";

export const getAxiosInstance = () => {
  const defaultOptions: CreateAxiosDefaults = {
    baseURL: process.env.VITE_API_ENDPOINT,
  };
  const axiosInstance = axios.create(defaultOptions);
  axiosInstance.interceptors.request.use(async (request) => {
    const accessToken = window.sessionStorage.getItem("accessToken");
    if (accessToken) {
      request.headers.Authorization = `Bearer ${accessToken}`;
    }
    return request;
  });
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response?.status === 401) {
        window.location.href = "/";
      }
      return Promise.reject(error);
    }
  );
  return axiosInstance;
};
