import Cookies from "js-cookie";
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Archive from "./components/employee/Archive";
import Assessment from "./components/employee/Assessment";
import AvailableTest from "./components/employee/AvailableTest";
import Settings from "./components/manager/Settings";
import TeamMatching from "./components/manager/TeamMatching";
import { Roles } from "./constant/enum";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import UserManagement from "./components/manager/UserManagement";
import Teams from "./components/manager/Teams";
import InvitationDialog from "./pages/InvitationDialog";

export const isAuthenticated = (): boolean => {
  try {
    const userCookie = Cookies.get("user");
    if (userCookie) {
      const username = JSON.parse(userCookie)?.username;
      return !!username; // Returns true if username exists, otherwise false
    }
  } catch (error) {
    console.error("Failed to parse cookie data:", error);
  }
  return false;
};

// PrivateRoute Component
interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  return isAuthenticated() ? <>{children}</> : <Navigate to="/" />;
};

const App: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route
          path="/"
          element={isAuthenticated() ? <Navigate to="/dashboard" /> : <Home />}
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard role={Roles.MANAGER} />
            </PrivateRoute>
          }
        />
        <Route path="/available-tests" element={<AvailableTest />} />
        <Route path="/archive" element={<Archive />} />
        <Route path="/test/:testName" element={<Assessment />} />
        <Route path="/team-matching" element={<TeamMatching />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/user-management" element={<UserManagement />} />
        <Route path="/teams" element={<Teams />} />
       </Routes>
    </div>
  );
};

export default App;
