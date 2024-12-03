import { jwtDecode } from "jwt-decode";
import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import Archive from "./components/employee/Archive";
import Assessment from "./components/employee/Assessment";
import AvailableTest from "./components/employee/AvailableTest";
import EmployeeDashboard from "./components/employee/EmployeeDashboard";
import ManagerDashboard from "./components/manager/ManagerDashboard";
import TeamMembers from "./components/manager/TeamMembers";
import Teams from "./components/manager/Teams";
import UserManagement from "./components/manager/UserManagement";
import Home from "./pages/Home";
import InviteSignup from "./pages/InviteSignup";
import { getUserDetailsFromToken } from "./utils/getUserRole"; 

const data = [
  { id: 1, name: "ADHD", status: "Not Started", timeRemaining: "5 mins" },
  { id: 2, name: "Autism", status: "Not Started", timeRemaining: "10 mins" },
  { id: 3, name: "Dyslexia", status: "Completed", timeRemaining: "5 mins" },
  {
    id: 4,
    name: "Dyscalculia",
    status: "In Progress",
    timeRemaining: "5 mins",
  },
];
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

const ProtectedRoute = (isUserAuthenticated: any) => {
  if (!isUserAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
const isUserAuthenticated = isAuthenticated();
const user = getUserDetailsFromToken();
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    index: true,
  },
  {
    path: "/manager",
    element: <ProtectedRoute isAuthenticated={isUserAuthenticated} />,
    children: [
      {
        path: "dashboard",
        element: <ManagerDashboard username={user.userName} />,
      },
      {
        path: "user-management",
        element: <UserManagement username={user.userName} />,
      },
      {
        path: "teams",
        element: <Teams username={user.userName} />,
      },
      {
        path: "team/:teamName",
        element: <TeamMembers username={user.userName} />,
      },
    ],
  },
  {
    path: "/employee",
    element: <ProtectedRoute isAuthenticated={isUserAuthenticated} />,
    children: [
      {
        path: "dashboard",
        element: <EmployeeDashboard testData={data} username={user.userName} />,
      },
      {
        path: "available-tests",
        element: (
          <AvailableTest
            testData={data}
            setTestData={data}
            username={user.userName}
          />
        ),
      },
      {
        path: "archive",
        element: <Archive testData={data} username={user.userName} />,
      },
      {
        path: "test/:testName",
        element: (
          <Assessment
            testData={data}
            setTestData={data}
            username={user.userName}
          />
        ),
      },
    ],
  },
  {
    path: "/join/:code",
    element: <InviteSignup />,
  },
  {
    path: "*",
    element: <p>404 Error - Nothing here...</p>,
  },
]);

export default router;
