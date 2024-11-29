import React from "react";
import EmployeeDashboard from "../components/employee/EmployeeDashboard";
import ManagerDashboard from "../components/manager/ManagerDashboard";
import { Roles } from "../constant/enum";

const Dashboard: React.FC<{ role:string; testData }> = ({ role, testData }) => {
  console.log("role in Db",role)
  return (
    <div>
      {role === "Employee" ? (
        <EmployeeDashboard testData={testData} />
      ) : (
        <ManagerDashboard />
      )}
    </div>
  );
};

export default Dashboard;
