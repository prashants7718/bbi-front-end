import { getAxiosInstance } from "../config/axiosConfig";
import { UserTest } from "../types/userTest";

const axiosInstance = getAxiosInstance();

export const getUserTests = async (
  username: string,
  status: string
): Promise<UserTest[]> => {
  try {
    console.debug("In login API call");
    const response = await axiosInstance.post<UserTest[]>(
      `/getusertestbystatus`,
      {
        username,
        status,
      }
    );

    console.debug("Response data:", response.data);
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error(error.message || "An error occurred.");
    }
  }
};

export const getSpecificUserTest = async (
  username: string,
  testname: string
): Promise<UserTest> => {
  try {
    console.debug("In login API call");
    const response = await axiosInstance.post<UserTest>(
      `/getusertestbyUserAndTestname`,
      {
        username,
        testname,
      }
    );

    console.debug("Response data:", response.data);
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error(error.message || "An error occurred.");
    }
  }
};

export const getAllUserTests = async (
  username: string
): Promise<UserTest[]> => {
  try {
    console.debug("In login API call");
    const response = await axiosInstance.post<UserTest>(
      `/getusertest`,
      {
        username,
      }
    );

    console.debug("Response data:", response.data);
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error(error.message || "An error occurred.");
    }
  }
};

export const updateUserTestStatus = async (
  username: string,
  testname: string,
  status: string
): Promise<UserTest[]> => {
  try {
    console.debug("In login API call");
    const response = await axiosInstance.post<UserTest[]>(
      `/updateUserTestStatus`,
      {
        username,
        testname,
        status,
      }
    );

    console.debug("Response data:", response.data);
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error(error.message || "An error occurred.");
    }
  }
};

export const pushSubmissionToUserTest = async (
  username: string,
  testname: string,
  submission: any,
  timeRemained: number
): Promise<UserTest> => {
  try {
    const response = await axiosInstance.post<UserTest>(
      `/pushSubmissionToUserTest`,
      {
        username,
        testname,
        submission,
        timeRemained,
      }
    );

    console.debug("Response data:", response.data);
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error(error.message || "An error occurred.");
    }
  }
};

export const calculateScore = async (
  username: string,
  testname: string
): Promise<UserTest> => {
  try {
    const response = await axiosInstance.post<UserTest>(`/calculateScore`, {
      username,
      testname,
    });
    console.debug("Response data:", response.data);
    return response.data;
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error(error.message || "An error occurred.");
    }
  }
};
