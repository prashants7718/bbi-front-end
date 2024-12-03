import { getAxiosInstance } from "../config/axiosConfig";

const axiosInstance = getAxiosInstance();

interface TeamResponse {
    data: Team;
}

interface Team {
    _id: string;
    name: string;
    username: string
}

export const getSpecificTeam = async (
    team: string
  ): Promise<Team> => {
    try {
      const response = await axiosInstance.post<TeamResponse>(`http://localhost:3000/getTeam`, {
        team
      });
      console.log(response.data)
      return response.data;
    } catch (error: any) {
      throw error.response?.data?.message || "An error occurred during login.";
    }
};

export const getAllTeamOfManager = async (
    username: string
  ): Promise<Team> => {
    try {
      const response = await axiosInstance.post<TeamResponse>(`http://localhost:3000/getTeam`, {
        username
      });
      console.log(response.data)
      return response.data;
    } catch (error: any) {
      throw error.response?.data?.message || "An error occurred during login.";
    }
};

export const createAndAssignTeamWithEmployees = async (
  name: string,
  company: string,
  username: string,
  employees: string[]
): Promise<Team> => {
  try {
    const response = await axiosInstance.post<TeamResponse>(`http://localhost:3000/createTeamWithEmployees`, {
      name, company, username, employees
    });
    console.log(response.data)
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || "An error occurred during login.";
  }
};

export const getSortedTeamsWithName = async (
  username: string,
  id: string
): Promise<Team> => {
  try {
    const response = await axiosInstance.post<TeamResponse>(`http://localhost:3000/getSortedTeamById`, {
      username, id
    });
    console.log(response.data)
    return response.data;
  } catch (error: any) {
    throw error.response?.data?.message || "An error occurred during login.";
  }
};
  