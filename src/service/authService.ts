import axios, { AxiosError } from "axios";
import { getAxiosInstance } from "../config/axiosConfig";
import { LoginResponse, SignupPayload } from "../types/auth";

const axiosInstance = getAxiosInstance();

export const login = async (username: string, password: string) => {
  try {
    const response = await axiosInstance.post("/login", {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ message: string }>;
      throw axiosError.response?.data?.message;
    }
    throw new Error("An unexpected error occurred");
  }
};

export const signUp = async (payload: SignupPayload) => {
  try {
    const response = await axiosInstance.post("/user", payload);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ message: string }>;
      throw axiosError.response?.data?.message;
    }
    throw new Error("An unexpected error occurred");
  }
};
