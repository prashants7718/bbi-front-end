import { getAxiosInstance } from "../config/axiosConfig";

interface LoginResponse {
  token: string;
}
interface SignupPayload {
  email: string;
  password: string;
  company: string;
  username: string;
}
const axiosInstance = getAxiosInstance();

export const login = async (
  username: string,
  password: string
): Promise<LoginResponse> => {
  try {
    console.log("in login api");
    const response = await axiosInstance.post<LoginResponse>("/login", {
      username,
      password,
    });
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || "An error occurred during login.";
  }
};

export const signUp = async (payload: SignupPayload) => {
  try {
    const response = await axiosInstance.post("/user", payload);
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || "An error occurred during signup.";
  }
};
