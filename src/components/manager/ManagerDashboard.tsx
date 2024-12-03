import { useEffect, useState } from "react";
import { Employees } from "../../constant/employees";
import Layout from "../layout/Layout";
import TeamMatching from "./TeamMatching";
import { assignToTeam, getAllTeamEmployees, getCurrentUser, getTeams } from "../../service/userService";
import { createAndAssignTeamWithEmployees } from "../../service/teamService";

const ManagerDashboard = ({username}) => {
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<string>("");
  const [newTeamName, setNewTeamName] = useState("");
  const isTableView = Employees.every((emp) => emp.TestStatus === "Completed");
  const Teams = [...new Set(Employees.map((emp) => emp.Team))];
  const [teams, setTeams] = useState([])
  const [reportingEmployees, setReportingEmployees] = useState([])
  const [currentUser, setCurrentUser] = useState(null)
  const handleSelect = (employeeId: string): void => {
    setSelectedEmployees((prev) =>
      prev.includes(employeeId)
        ? prev.filter((name) => name !== employeeId)
        : [...prev, employeeId]
    );
  };
  const openModal = (): void => {
    setIsModalOpen(true);
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
    setSelectedTeam("");
    setNewTeamName("");
    setSelectedEmployees([]);
  };

  const handleAssignToTeam = async(): void => {
    if (selectedTeam) {
      const result = await assignToTeam(selectedEmployees, selectedTeam)
      console.log(`Assigned to ${selectedTeam}:`, selectedEmployees);
      alert(`Assigned ${selectedEmployees.join(", ")} to ${selectedTeam}`);
      setSelectedEmployees([]);
      setSelectedTeam("");
      closeModal();
    } else {
      alert("Please select a team!");
    }
  };

  const handleCreateAndAssignToTeam = async() => {
    if (!newTeamName) return;

    alert(`Assigning employees to new team: ${newTeamName}`);
    console.log(`Creating new team: ${newTeamName}`);

    // Simulate adding the new team to the list of teams
    const updatedTeams = [...Teams, newTeamName];
    // setTeams(updatedTeams);
    const result = await createAndAssignTeamWithEmployees(newTeamName, currentUser.company, username, selectedEmployees)
    console.log(result)
    // Assign selected employees to the newly created team
    console.log(`Assigning employees to new team: ${newTeamName}`);

    // Reset the new team name input and close the modal
    setNewTeamName("");
    closeModal();
  };

  const getAllReportings = async() => {
    const result = await getAllTeamEmployees(username);
    setReportingEmployees(result)
  }
  const getUserTeams = async () => {
    try {
      const result = await getTeams(username);
      // const updatedTeams = [{name : "All"}, ...new Set(result)];
      setTeams(result);
    } catch (error) {
      console.error("Error fetching user teams:", error);
    }
  };

  const getCurrentUserDetails = async() => {
    const result = await getCurrentUser(username)
    setCurrentUser(result)
  }

  useEffect (() => {
    getCurrentUserDetails()
    getUserTeams()
    getAllReportings()
  }, [])
  return (
    <Layout>
      <div className="flex-1">
        <div className="flex justify-between items-center"></div>
        {!isTableView ? (
          <div className="flex space-x-6 flex-col">
            <div className="flex-1 bg-primaryPink p-6 shadow-lg rounded-lg">
              <div className="flex justify-between mb-4 item-center">
                <h2 className="text-3xl font-bold text-secondaryPink">
                  Dashboard
                </h2>
                {selectedEmployees.length > 0 && (
                  <button
                    onClick={openModal}
                    className="p-1 bg-secondaryPink text-white rounded shadow hover:bg-secondaryPink"
                  >
                    Assign to Team
                  </button>
                )}
              </div>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-secondaryPink bg-white">
                    <th className="border-b p-3"></th>
                    <th className="border-b p-3">Name</th>
                    <th className="border-b p-3">Test Status</th>
                    <th className="border-b p-3">Role</th>
                    <th className="border-b p-3">Job Title</th>
                  </tr>
                </thead>
                <tbody>
                  {reportingEmployees.map((employee) => (
                    <tr key={employee._id}>
                      <td className="border-b p-3">
                        <input
                          type="checkbox"
                          checked={selectedEmployees.includes(employee._id)}
                          onChange={() => handleSelect(employee._id)}
                          className="h-4 w-4 text-primaryBlue focus:ring-primaryBlue"
                        />
                      </td>
                      <td className="border-b p-3">{employee.username}</td>
                      <td
                        className={`border-b p-3 ${
                          employee.testStatus === "Completed"
                            ? "text-green-500"
                            : employee.testStatus === "In Progress"
                            ? "text-yellow-500"
                            : "text-red-500"
                        }`}
                      >
                        {employee.testStatus}
                      </td>
                      <td className="border-b p-3">{employee.role}</td>
                      <td className="border-b p-3">{"Software Engineer"}</td>
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
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white w-1/4 rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-4 text-primaryBlue">
                Assign to a Team
              </h3>
              <select
                value={selectedTeam}
                onChange={(e) => {
                  setSelectedTeam(e.target.value)}}
                className="border border-gray-300 px-4 py-1 rounded w-full mb-4 bg-white text-sm"
              >
                <option value="" disabled>
                  Select a team
                </option>
                <option value="create-new">Create New Team</option>
                {teams.map((team) => (
                  <option key={team} value={team._id}>
                    {team.name}
                  </option>
                ))}
              </select>

              {selectedTeam === "create-new" && (
                <div className="mt-1">
                  <input
                    id="newTeamName"
                    value={newTeamName}
                    onChange={(e) => setNewTeamName(e.target.value)}
                    placeholder="Enter team name"
                    className="w-full px-4 py-1 border border-gray-300 rounded mb-4 bg-white text-sm"
                  />
                </div>
              )}
              <div className="flex justify-end space-x-4">
                <button
                  onClick={closeModal}
                  className="px-4 py-1 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={ () => {
                    selectedTeam === "create-new"
                      ? handleCreateAndAssignToTeam()
                      : handleAssignToTeam()
                  }}
                  disabled={
                    selectedTeam === "create-new" ? !newTeamName : !selectedTeam
                  }
                  className={`px-4 py-1 rounded ${
                    selectedTeam &&
                    (selectedTeam !== "create-new" || newTeamName)
                      ? "bg-secondaryPink text-white hover:bg-secondaryPink"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                  {selectedTeam === "create-new" ? "Create & Assign" : "Assign"}
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="mt-8">
          <TeamMatching />
        </div>
      </div>
    </Layout>
  );
};

export default ManagerDashboard;
