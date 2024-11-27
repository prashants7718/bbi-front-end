import React from "react";
import EmployeeDashboard from "../components/employee/EmployeeDashboard";
import ManagerDashboard from "../components/manager/ManagerDashboard";
import { Roles } from "../constant/enum";

const Dashboard: React.FC<{ role: Roles; testData }> = ({ role, testData }) => {
  return (
    <div>
      {role === Roles.EMPLOYEE ? (
        <EmployeeDashboard testData={testData} />
      ) : (
        <ManagerDashboard />
      )}
    </div>
  );
};

export default Dashboard;
