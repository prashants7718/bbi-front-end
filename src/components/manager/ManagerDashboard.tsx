import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Employees } from "../../constant/employees";
import { useUserContext } from "../../context/UserContext";
import Pagination from "../../pages/Pagination";
import { createAndAssignTeamWithEmployees } from "../../service/teamService";
import {
  assignToTeam,
  getAllTeamEmployees,
  getCurrentUser,
  getTeams,
  Team,
  User,
  UserResponse,
} from "../../service/userService";
import Layout from "../layout/Layout";
import TeamMatching from "./TeamMatching";
import { EmployeeRecord } from "../../types/manager";

const paginate = (items, currentPage, rowsPerPage) => {
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  return items?.slice(startIndex, endIndex);
};

const ManagerDashboard = () => {
  const { userName } = useUserContext();
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<string>("");
  const [newTeamName, setNewTeamName] = useState("");
  const [teams, setTeams] = useState<Team[]>([]);
  const [reportingEmployees, setReportingEmployees] = useState<UserResponse>();
  const [currentUser, setCurrentUser] = useState<User>();
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const totalItems = totalResults;
  const handleSelect = (employeeId: string): void => {
    setSelectedEmployees((prev) =>
      prev.includes(employeeId)
        ? prev.filter((name) => name !== employeeId)
        : [...prev, employeeId]
    );
  };
  const sortedEmployees = Employees.slice().sort((a, b) =>
    a.username.localeCompare(b.username)
  );
  const totalPages = Math.ceil(totalResults / rowsPerPage);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1);
  };
  const currentEmployees = paginate(
    reportingEmployees,
    currentPage,
    rowsPerPage
  );

  const openModal = (): void => {
    setIsModalOpen(true);
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
    setSelectedTeam("");
    setNewTeamName("");
    setSelectedEmployees([]);
  };

  const handleAssignToTeam = async () => {
    if (selectedTeam) {
      const result = await assignToTeam(selectedEmployees, selectedTeam);
      if (result?.results[0]?.status === "failed") {
        toast("Already exists in the Team", {
          position: "top-center",
          autoClose: 3000,
          type: "error",
          theme: "colored",
        });
      } else {
        toast(`Successfully assigned to Team`, {
          position: "top-center",
          autoClose: 3000,
          type: "success",
          theme: "colored",
        });
      }
      setSelectedTeam("");
      setSelectedEmployees([]);
      closeModal();
    }
  };
  const getCurrentUserDetails = async () => {
    const result = await getCurrentUser(userName);
    setCurrentUser(result);
  };

  const handleCreateAndAssignToTeam = async () => {
    if (!newTeamName) return;

    // Simulate adding the new team to the list of teams
    // const updatedTeams = [...Teams, newTeamName];
    // setTeams(updatedTeams);
    if (currentUser) {
      await createAndAssignTeamWithEmployees(
        newTeamName,
        currentUser.company,
        userName,
        selectedEmployees
      );
      toast("Created team and assigned", {
        position: "top-center",
        autoClose: 3000,
        type: "success",
        theme: "colored",
      });
    }

    setNewTeamName("");
    closeModal();
  };

  const getAllReportings = async () => {
    const result = await getAllTeamEmployees(userName);
    setReportingEmployees(result);
    setTotalResults(result?.length);
  };
  const getUserTeams = async () => {
    try {
      const result = await getTeams(userName);
      setTeams(result);
    } catch (error) {
      console.error("Error fetching user teams:", error);
    }
  };

  useEffect(() => {
    getCurrentUserDetails();
    getUserTeams();
    getAllReportings();
  }, [userName]);

  return (
    <Layout>
      <div className="flex-1">
        <div className="flex justify-between items-center"></div>

        <div className="flex space-x-6 flex-col">
          <div className="flex-1 bg-white shadow-bbiCardShadow rounded-lg bb-tbl">
            <div className="heading-text p-4 flex items-center justify-between gap-4">
              <h2 className="text-xl font-semibold text-textBlack">
                Dashboard
              </h2>
              <div className="flex justify-between mb-4 item-center">
                {selectedEmployees.length > 0 && (
                  <button
                    onClick={openModal}
                    className="p-1 bg-secondaryPink text-white rounded shadow hover:bg-secondaryPink"
                  >
                    Assign to Team
                  </button>
                )}
              </div>
            </div>

            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-textBlack text-sm bg-white">
                  <th className="border-b p-3 w-14 text-center"></th>
                  <th className="border-b p-3">Name</th>
                  <th className="border-b p-3">Test Status</th>
                  <th className="border-b p-3">Role</th>
                  <th className="border-b p-3">Job Title</th>
                </tr>
              </thead>
              <tbody>
                {currentEmployees?.map((employee: EmployeeRecord) => (
                  <tr key={employee._id} className="text-sm">
                    <td className="border-b px-3 py-4 text-center">
                      <input
                        type="checkbox"
                        checked={selectedEmployees.includes(employee._id)}
                        onChange={() => handleSelect(employee._id)}
                        className="h-4 w-4 text-primaryBlue focus:ring-primaryBlue"
                      />
                    </td>
                    <td className="border-b px-3 py-4">{employee.username}</td>
                    <td
                      className={`border-b px-3 py-4 ${
                        employee.testStatus === "Completed"
                          ? "text-green-500"
                          : employee.testStatus === "In Progress"
                          ? "text-yellow-500"
                          : "text-red-500"
                      }`}
                    >
                      {employee.testStatus}
                    </td>
                    <td className="border-b px-3 py-4">{employee.role}</td>
                    <td className="border-b px-3 py-4">{employee.jobTitle}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-end">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[5, 10, 20, 50]}
                totalItems={totalItems}
                onRowsPerPageChange={handleRowsPerPageChange}
              />
            </div>
          </div>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white w-1/4 rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-4 text-primaryBlue">
                Assign to a Team
              </h3>
              <select
                value={selectedTeam}
                onChange={(e) => {
                  setSelectedTeam(e.target.value);
                }}
                className="border border-gray-300 px-4 py-1 rounded w-full mb-4 bg-white text-sm"
              >
                <option value="" disabled>
                  Select a team
                </option>
                <option value="create-new">Create New Team</option>
                {teams.map((team) => (
                  <option key={team._id} value={team._id}>
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
                  onClick={() => {
                    if (selectedTeam === "create-new") {
                      handleCreateAndAssignToTeam();
                    } else {
                      handleAssignToTeam();
                    }
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
          <TeamMatching username={userName} />
        </div>
      </div>
    </Layout>
  );
};

export default ManagerDashboard;
