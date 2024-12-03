import { getAxiosInstance } from "../config/axiosConfig";

export interface InviteUserPayload {
  email: string;
  team: string;
  company: string;
}

const axiosInstance = getAxiosInstance();

export const inviteUser = async (
  payload: InviteUserPayload
): Promise<InviteUserPayload> => {
  try {
    const response = await axiosInstance.post("/inviteUser", payload);
    return response.data;
  } catch (error) {
    console.error("Error sending invitation:", error);
    throw error;
  }
};
