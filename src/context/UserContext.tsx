import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { getUserDetailsFromToken } from "../utils/getUserRole";

interface UserContextType {
  role: string;
  userName: string;
  setUserDetails: (role: string | null, userName: string | null) => void;
  handleUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [role, setRole] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    const userDetails = getUserDetailsFromToken();
    if (userDetails.role && userDetails.userName) {
      setRole(userDetails.role);
      setUserName(userDetails.userName);
    }
  }, []);

  const handleUser = async () => {
    const userDetails = getUserDetailsFromToken();
    setRole(userDetails.role);
    setUserName(userDetails.userName);
  };
  useEffect(() => {
  }, [role, userName]);
  const setUserDetails = (role: string | null, userName: string | null) => {
    setRole(role);
    setUserName(userName);
  };
  return (
    <UserContext.Provider
      value={{ role, userName, setUserDetails, handleUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
