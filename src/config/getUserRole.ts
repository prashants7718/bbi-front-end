import { jwtDecode } from "jwt-decode";

export const getUserRoleFromToken = (): string | null => {
  const accessToken = window.sessionStorage.getItem("accessToken");
  if (accessToken) {
    try {
      const decodedToken = jwtDecode<{ role: string }>(accessToken);
      console.log(decodedToken)
      return decodedToken.role; 
    } catch (error) {
      console.error("Error decoding the token", error);
      return null; // Return null if decoding fails
    }
  }
  return null;  
};
