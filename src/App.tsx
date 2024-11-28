import Cookies from "js-cookie";
import React, { useState } from "react";
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
import TeamMembers from "./components/manager/TeamMembers";

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
export type TestItem = {
  id: number;
  name: string;
  status: "Not Started" | "In Progress" | "Completed"; // Use a union type for the status
  timeRemaining: string; // Representing as a string since it's formatted
};
const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  return isAuthenticated() ? <>{children}</> : <Navigate to="/" />;
};

const App: React.FC = () => {
  const [testData, setTestData] = useState<TestItem[]>([
    { id: 1, name: "ADHD", status: "Not Started", timeRemaining: "5 mins" },
    { id: 2, name: "Autism", status: "Not Started", timeRemaining: "10 mins" },
    { id: 3, name: "Dyslexia", status: "Not Started", timeRemaining: "5 mins" },
    {
      id: 4,
      name: "Dyscalculia",
      status: "In Progress",
      timeRemaining: "5 mins",
    },
  ]);
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
              <Dashboard role={Roles.MANAGER} testData={testData} />
            </PrivateRoute>
          }
        />
        <Route
          path="/available-tests"
          element={
            <PrivateRoute>
              <AvailableTest testData={testData} setTestData={setTestData} />
            </PrivateRoute>
          }
        />
        <Route
          path="/archive"
          element={
            <PrivateRoute>
              <Archive testData={testData} />{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/test/:testName"
          element={
            <PrivateRoute>
              <Assessment testData={testData} setTestData={setTestData} />
            </PrivateRoute>
          }
        />
        <Route path="/team-matching" element={<TeamMatching />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/user-management" element={<UserManagement />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/team/:teamName" element={<TeamMembers />} />
      </Routes>
    </div>
  );
};

export default App;
