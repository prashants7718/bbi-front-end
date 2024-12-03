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
    console.error("Error sending invitation:", error);
    throw error;
  }
};
