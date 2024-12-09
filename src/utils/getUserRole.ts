import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  role: string;
  userId: string;
}

export const getUserDetailsFromToken = (): {
  role: string | null;
  userName: string | null;
} => {
  const accessToken = window.sessionStorage.getItem("accessToken");
  if (accessToken) {
    try {
      const decodedToken = jwtDecode<DecodedToken>(accessToken);
      return {
        role: decodedToken.role,
        userName: decodedToken.userId,
      };
    } catch (error) {
      console.error("Error decoding the token", error);
      return { role: null, userName: null };
    }
  }
  return { role: null, userName: null }; // Return null values if no token exists
};
