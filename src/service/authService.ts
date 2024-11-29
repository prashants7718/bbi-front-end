import { getAxiosInstance } from "../config/axiosConfig";

interface LoginResponse {
  token: string;
}

const axiosInstance = getAxiosInstance();

export const login = async (
  username: string,
  password: string
): Promise<LoginResponse> => {
  try {
    console.log("in login api")
    const response = await axiosInstance.post<LoginResponse>(`http://localhost:3000/login`, {
      username,
      password,
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || "An error occurred during login.";
  }
};
