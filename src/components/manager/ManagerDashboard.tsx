import { useState } from "react";
import { Employees } from "../../constant/employees";
import Layout from "../layout/Layout";

const ManagerDashboard = () => {
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<string>("");
  const isTableView = Employees.every((emp) => emp.TestStatus === "Completed");
  const Teams = [...new Set(Employees.map((emp) => emp.Team))];
  const handleSelect = (employeeName: string): void => {
    setSelectedEmployees((prev) =>
      prev.includes(employeeName)
        ? prev.filter((name) => name !== employeeName)
        : [...prev, employeeName]
    );
  };
  const openModal = (): void => {
    setIsModalOpen(true);
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
  };

  const handleAssignToTeam = (): void => {
    if (selectedTeam) {
      console.log(`Assigned to ${selectedTeam}:`, selectedEmployees);
      alert(`Assigned ${selectedEmployees.join(", ")} to ${selectedTeam}`);
      setSelectedEmployees([]);
      setSelectedTeam("");
      closeModal();
    } else {
      alert("Please select a team!");
    }
  };
  return (
    <Layout>
      <div className="flex-1 p-6">
        <h2 className="text-3xl font-bold text-primaryBlue mb-6">Dashboard</h2>
        {!isTableView ? (
          <div className="flex space-x-6 flex-col">
              <div className="flex justify-end">
                {selectedEmployees.length > 0 && (
                  <button
                    onClick={openModal}
                    className="px-4 mb-2 py-1 bg-primaryBlue text-white rounded shadow hover:bg-primaryBlue"
                  >
                    Assign to Team
                  </button>
                )}
              </div>
            <div className="flex-1 bg-white p-6 shadow rounded-lg">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-primaryBlue">
                    <th className="border-b p-3"></th>
                    <th className="border-b p-3">Name</th>
                    <th className="border-b p-3">Test Status</th>
                    <th className="border-b p-3">Role</th>
                    <th className="border-b p-3">Job Title</th>
                  </tr>
                </thead>
                <tbody>
                  {Employees.map((employee) => (
                    <tr key={employee.Name} className="hover:bg-gray-50">
                      <td className="border-b p-3">
                        <input
                          type="checkbox"
                          checked={selectedEmployees.includes(employee.Name)}
                          onChange={() => handleSelect(employee.Name)}
                          className="h-4 w-4 text-primaryBlue focus:ring-primaryBlue"
                        />
                      </td>
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
                      <td className="border-b p-3">{employee.Role}</td>
                      <td className="border-b p-3">{employee.JobTitle}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-gray-500 text-center text-lg mt-28 ">
            Table will be visible when all employees complete the test.
          </div>
        )}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 ">
            <div className="bg-white w-1/4 rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-4 text-primaryBlue">
                Assign to a Team
              </h3>
              <select
                value={selectedTeam}
                onChange={(e) => setSelectedTeam(e.target.value)}
                className="border p-2 rounded w-full mb-4 bg-white text-sm"
              >
                <option value="" disabled>
                  Select a team
                </option>
                {Teams.map((team) => (
                  <option key={team} value={team}>
                    {team}
                  </option>
                ))}
              </select>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={closeModal}
                  className="px-4 py-1 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAssignToTeam}
                  disabled={!selectedTeam}
                  className={`px-4 py-1 rounded ${
                    selectedTeam
                      ? "bg-primaryBlue text-white hover:bg-primaryBlue"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  Assign
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ManagerDashboard;
