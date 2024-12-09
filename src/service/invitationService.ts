import axios, { AxiosError } from "axios";
import { getAxiosInstance } from "../config/axiosConfig";

interface VerifyUser {
  code: string;
}

const axiosInstance = getAxiosInstance();

export const verifyUser = async (verificationCode: VerifyUser) => {
  try {
    const response = await axiosInstance.post(
      "/verifyEmployeeCode",
      verificationCode
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ message: string }>;
      throw (
        axiosError.response?.data?.message ||
        "An error occurred during verification."
      );
    }
    throw new Error("An unexpected error occurred");
  }
};
