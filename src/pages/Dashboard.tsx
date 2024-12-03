import React from "react";
import EmployeeDashboard from "../components/employee/EmployeeDashboard";
import ManagerDashboard from "../components/manager/ManagerDashboard";
import { getUserDetailsFromToken } from "../utils/getUserRole";

const Dashboard: React.FC<{ testData }> = ({ testData }) => {
  const user = getUserDetailsFromToken();
  console.log("userRole in Dashboard", userRole);
  return (
    <div>
      {user.role === "Employee" ? (
        <EmployeeDashboard testData={testData} />
      ) : (
        <ManagerDashboard />
      )}
    </div>
  );
};

export default Dashboard;
