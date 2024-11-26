import { useState } from "react";
import { Employees } from "../../constant/employees";
import Layout from "../layout/Layout";

const Teams = () => {
  const [selectedTeam, setSelectedTeam] = useState("All");
  const uniqueTeams = ["All", ...new Set(Employees.map((emp) => emp.Team))];
  const filteredEmployees =
    selectedTeam === "All"
      ? Employees
      : Employees.filter((emp) => emp.Team === selectedTeam);

  return (
    <Layout>
      <div className="p-6">
        <h2 className="text-3xl font-bold text-primaryBlue mb-6">Teams</h2>
        <div className="flex space-x-6">
          <div className="flex-1 bg-white p-6 shadow rounded-lg">
            <div className="mb-1 flex justify-end items-center">
              <label className="text-sm font-medium text-gray-700">
                Filter by Team:
              </label>
              <select
                id="teamFilter"
                className="ml-2 p-1 border rounded shadow-sm"
                value={selectedTeam}
                onChange={(e) => setSelectedTeam(e.target.value)}
              >
                {uniqueTeams.map((team) => (
                  <option key={team} value={team}>
                    {team}
                  </option>
                ))}
              </select>
            </div>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-primaryBlue">
                  <th className="border-b p-3">Name</th>
                  <th className="border-b p-3">Test Status</th>
                  <th className="border-b p-3">Job Title</th>
                  <th className="border-b p-3">Team</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((employee) => (
                  <tr key={employee.Name} className="hover:bg-gray-50">
                    <td className="border-b p-3">{employee.Name}</td>
                    <td
                      className={`border-b p-3 ${
                        employee.TestStatus === "Completed"
                          ? "text-green-500"
                          : employee.TestStatus === "In Progress"
                          ? "text-yellow-500"
                          : "text-red-500"
                      }`}
                    >
                      {employee.TestStatus}
                    </td>
                    <td className="border-b p-3">{employee.JobTitle}</td>
                    <td className="border-b p-3">{employee.Team}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Teams;
