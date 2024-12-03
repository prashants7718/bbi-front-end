import { jwtDecode } from "jwt-decode";

export const isAuthenticated = (): boolean => {
  try {
    const accessToken = window.sessionStorage.getItem("accessToken");
    if (accessToken) {
       const decodedToken = jwtDecode<{ exp: number }>(accessToken);

       const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
      if (decodedToken.exp > currentTime) {
        return true; // Token is valid and not expired
      }
    }
  } catch (error) {
    console.error("Error decoding the token", error);
  }
  return false; 
};
