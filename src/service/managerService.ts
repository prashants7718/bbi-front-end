import axios, { AxiosError } from "axios";
import { getAxiosInstance } from "../config/axiosConfig";
import { InviteUserPayload } from "../types/manager";

const axiosInstance = getAxiosInstance();

export const inviteUser = async (
  payload: InviteUserPayload
): Promise<InviteUserPayload> => {
  try {
    const response = await axiosInstance.post("/inviteUser", payload);
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
