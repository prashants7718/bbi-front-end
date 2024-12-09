import axios, { AxiosError } from "axios";
import { getAxiosInstance } from "../config/axiosConfig";

const axiosInstance = getAxiosInstance();
export const getSpecificTest = async (testname: string): Promise<Test> => {
  try {
    const response = await axiosInstance.post<Test>("/getTestByName", {
      testname,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ message: string }>;
      throw (
        axiosError.response?.data?.message || "An error occurred during login."
      );
    }
    throw new Error("An unexpected error occurred");
  }
};
