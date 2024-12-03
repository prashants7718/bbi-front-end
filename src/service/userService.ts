import { getAxiosInstance } from "../config/axiosConfig";

interface Team {
  username: string;
  _id: string;
  name: string;
}

interface User {
  username: string;
  _id: string;
  email: string;
  company: string;
  local: object;
  role: string;
  team: string;
}
interface TeamsResponse {
  teams: Team[];
}
interface UserResponse {
  users: User[];
}
interface RemoveTeamResponse {
  message: string;
  success: boolean;
}
const axiosInstance = getAxiosInstance();
export const getTeams = async (
  username: string
): Promise<Team[]> => {
  try {
    const response = await axiosInstance.post<TeamsResponse>(`http://localhost:3000/getTeams`, {
      username
    });

    console.log(response.data)
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || "An error occurred during login.";
  }
};

export const getTeamMembers = async (
  team: string
): Promise<User[]> => {
  try {
    const response = await axiosInstance.post<UserResponse>(`http://localhost:3000/getUsersByTeam`, {
      team
    });

    console.log(response.data)
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || "An error occurred during login.";
  }
};

export const removeTeamFromUser = async (
  username: string,
  team: string
): Promise<RemoveTeamResponse> => {
  try {
    console.log("Calling API to remove team from user");
    
    const response = await axiosInstance.post<RemoveTeamResponse>(
      `http://localhost:3000/removeUsersFromTeam`,
      { username, team }
    );

    console.log("Response message:", response.data.message);
    return response.data.message;
  } catch (error: any) {
    // Handle and re-throw a meaningful error
    const errorMessage = error.response?.data?.message || "An error occurred during the operation.";
    console.error("Error:", errorMessage);
    throw new Error(errorMessage);
  }
};

export const getAllTeamEmployees = async (
  username: string,
): Promise<User[]> => {
  try {
    const response = await axiosInstance.post<UserResponse>(`http://localhost:3000/getUsersOfManager`, {
      username
    });

    console.log(response.data)
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || "An error occurred during login.";
  }
};

export const assignToTeam = async (
  userIds: string[],
  teamId: string
): Promise<User[]> => {
  try {
    const response = await axiosInstance.post<UserResponse>(`http://localhost:3000/assignToTeam`, {
      userIds, teamId
    });

    console.log(response.data)
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || "An error occurred during login.";
  }
};

export const getCurrentUser = async (
  username: string,
): Promise<User[]> => {
  try {
    const response = await axiosInstance.post<UserResponse>(`http://localhost:3000/getUser`, {
      username
  });

    console.log(response.data)
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || "An error occurred during login.";
  }
};
