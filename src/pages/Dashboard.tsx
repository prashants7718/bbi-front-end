import React from "react";
import { getUserDetailsFromToken } from "../utils/getUserRole";

const Dashboard: React.FC<{ testData }> = ({ testData }) => {
  const user = getUserDetailsFromToken();
  return (
    <div>
      {/* {user.role === "Employee" ? (
        <EmployeeDashboard testData={testData} />
      ) : (
        <ManagerDashboard />
      )} */}
    </div>
  );
};

export default Dashboard;
