import { getAxiosInstance } from "../config/axiosConfig";

const axiosInstance = getAxiosInstance();
export const getSpecificTest = async (
  testname: string
): Promise<Test> => {
  try {
    console.log("in login api")
    const response = await axiosInstance.post<Test>(`http://localhost:3000/getTestByName`, {
      testname
    });
    console.log(response.data)
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || "An error occurred during login.";
  }
};
