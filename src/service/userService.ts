import axios, { AxiosError } from "axios";
import { getAxiosInstance } from "../config/axiosConfig";
import { EmployeeRecord } from "../types/manager";

export interface Team {
  _id: string;
  username: string;
  name: string;
  company: string;
  membersCount: number;
}

interface Constraints {
  name: string;
  count: number;
}
interface JobTitlesResponse {
  uniqueJobTitles: string[];
}
export interface User {
  username: string;
  _id: string;
  email: string;
  company: string;
  local: object;
  role: string;
  team: string;
}
// interface TeamsResponse {
//   teams: Team[];
// }
export interface UserResponse {
  users: User[];
}
interface RemoveTeamResponse {
  message: string;
  success: boolean;
}
const axiosInstance = getAxiosInstance();
export const getTeams = async (username: string): Promise<Team[]> => {
  try {
    const response = await axiosInstance.post<Team[]>("/getTeams", {
      username,
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

export const getTeamMembers = async (
  team: string
): Promise<EmployeeRecord[]> => {
  try {
    const response = await axiosInstance.post<EmployeeRecord[]>(
      "/getUsersByTeam",
      {
        team,
      }
    );

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

export const removeTeamFromUser = async (
  username: string,
  team: string
): Promise<RemoveTeamResponse> => {
  try {
    const response = await axiosInstance.post<RemoveTeamResponse>(
      "/removeUsersFromTeam",
      { username, team }
    );

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

export const getAllTeamEmployees = async (
  username: string
): Promise<UserResponse> => {
  try {
    const response = await axiosInstance.post<UserResponse>(
      "/getUsersOfManager",
      {
        username,
      }
    );
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

export const assignToTeam = async (
  userIds: string[],
  teamId: string
): Promise<UserResponse> => {
  try {
    const response = await axiosInstance.post<UserResponse>("/assignToTeam", {
      userIds,
      teamId,
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

export const getCurrentUser = async (username: string): Promise<User> => {
  try {
    const response = await axiosInstance.post<User>(`/getUser`, {
      username,
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

export const getJobProfiles = async (username: string): Promise<string[]> => {
  try {
    const response = await axiosInstance.post<JobTitlesResponse>(
      `/getAllJobTitles`,
      {
        username,
      }
    );

    return response.data.uniqueJobTitles;
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

export const getGeneratedTeam = async (
  username: string,
  constraints: Constraints[]
) => {
  try {
    const response = await axiosInstance.post<EmployeeRecord>(`/match-teams`, {
      username,
      constraints,
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
