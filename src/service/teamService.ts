import axios, { AxiosError } from "axios";
import { getAxiosInstance } from "../config/axiosConfig";

const axiosInstance = getAxiosInstance();

interface TeamResponse {
  data: Team;
}

export interface Team {
  _id: string;
  name: string;
  username: string;
  company: string;
}
export interface NewTeam {
  _id: string;
  name: string;
  username: string;
  company: string;
}

export const getSpecificTeam = async (team: string): Promise<Team> => {
  try {
    const response = await axiosInstance.post<Team>("/getTeam", {
      team,
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

export const getAllTeamOfManager = async (username: string): Promise<Team> => {
  try {
    const response = await axiosInstance.post<TeamResponse>("/getTeam", {
      username,
    });
    return response.data.data;
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

export const createAndAssignTeamWithEmployees = async (
  name: string,
  company: string,
  username: string,
  employees: string[]
) => {
  try {
    const response = await axiosInstance.post<TeamResponse>(
      `/createTeamWithEmployees`,
      {
        name,
        company,
        username,
        employees,
      }
    );
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ message: string }>;
      throw (
        axiosError.response?.data?.message ||
        "An error occurred while creating Team."
      );
    }
    throw new Error("An unexpected error occurred");
  }
};

export const getSortedTeamsWithName = async (username: string, id: string) => {
  try {
    const response = await axiosInstance.post("/getSortedTeamById", {
      username,
      id,
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

export const createNewTeam = async (
  name: string,
  company: string,
  username: string
): Promise<Team> => {
  try {
    const response = await axiosInstance.post<TeamResponse>("/createTeam", {
      name,
      company,
      username,
    });
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<{ message: string }>;
      throw (
        axiosError.response?.data?.message ||
        "An error occurred during creating team."
      );
    }
    throw new Error("An unexpected error occurred");
  }
};
