import { useEffect, useState } from "react";
import { Employees } from "../../constant/employees";
import { useUserContext } from "../../context/UserContext";
import InvitationDialog from "../../pages/InvitationDialog";
import Pagination from "../../pages/Pagination";
import { getSortedTeamsWithName } from "../../service/teamService";
import {
  getAllTeamEmployees,
  getTeams,
  UserResponse,
} from "../../service/userService";
import Layout from "../layout/Layout";
import Popup from "../layout/Popup";
import { EmployeeRecord } from "../../types/manager";

const paginate = (items, currentPage, rowsPerPage) => {
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  return items?.slice(startIndex, endIndex);
};

const UserManagement = () => {
  const { userName } = useUserContext();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedTeam, setSelectedTeam] = useState("All");
  const [reportingEmployees, setReportingEmployees] = useState<UserResponse>();
  const [userTeams, setUserTeams] = useState([{ name: "All", _id: "" }]);
  const [totalResults, setTotalResults] = useState(0);

  const sortedEmployees = Employees.slice().sort((a, b) =>
    a.username.localeCompare(b.username)
  );
  const filteredEmployees =
    selectedTeam === "All"
      ? sortedEmployees
      : sortedEmployees
          .filter((emp) => emp.Team === selectedTeam)
          .concat(sortedEmployees.filter((emp) => emp.Team !== selectedTeam));

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(totalResults / rowsPerPage);
  const totalItems = totalResults;

  const getAllReportings = async () => {
    const result = await getAllTeamEmployees(userName);
    setReportingEmployees(result);
    setTotalResults(result?.length);
  };
  const getUserTeams = async () => {
    try {
      const result = await getTeams(userName);
      const updatedTeams = [{ name: "All" }, ...new Set(result)];
      setUserTeams(updatedTeams);
    } catch (error) {
      console.error("Error fetching user teams:", error);
    }
  };

  const getSortedTeam = async (id: string) => {
    try {
      if (!id) {
        getAllReportings();
      } else {
        const sortedEmployees = await getSortedTeamsWithName(userName, id);
        setReportingEmployees(sortedEmployees);
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  useEffect(() => {
    getAllReportings();
    getUserTeams();
  }, [userName]);
  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1); // Reset to the first page
  };
  const currentEmployees = paginate(
    reportingEmployees,
    currentPage,
    rowsPerPage
  );

  return (
    <Layout>
      <div>
        <div className="flex-1 bg-white shadow-bbiCardShadow rounded-lg bb-tbl">
          <div className="heading-text p-4 flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold text-textBlack">
              User Management
            </h2>
            <div>
              <button
                className="p-1 px-5 h-9 bg-secondaryPink text-textBlack rounded shadow hover:bg-secondaryPink"
                onClick={() => setIsPopupOpen(true)}
              >
                <i className="ri-mail-line mr-2 text-lg"></i>
                Invite
              </button>
            </div>
          </div>
          <div className="mt-2 mb-4 px-4 flex justify-between items-center">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Search..."
                className="w-full px-4 h-9 border text-sm rounded focus:outline-none focus:ring-2 focus:ring-primaryBlue"
              />
            </div>
            <div className="flex gap-1 items-center">
              <div>
                <label className="text-sm font-medium text-gray-70 ml-2">
                  Sort by Team
                </label>
                <select
                  id="teamFilter"
                  className="ml-2 border h-9 px-2 rounded shadow-sm text-sm bg-white"
                  value={selectedTeam}
                  onChange={(e) => {
                    const selectedId = e.target.value;
                    setSelectedTeam(selectedId);
                    getSortedTeam(selectedId === "All" ? "" : selectedId);
                  }}
                >
                  {userTeams.map((team) => (
                    <option key={team._id || team.name} value={team._id || ""}>
                      {team.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex space-x-10 px-4 gap-1 items-center text-sm font-normal p-2 space-x-4">
                <i className="ri-file-excel-fill text-base" /> Export to Excel
                <i className="ri-file-pdf-2-fill text-base" /> Export of PDF
              </div>
            </div>
          </div>
          <table className="w-full text-left border-collapse mt-2">
            <thead>
              <tr className="text-secondaryPink bg-white">
                <th className="border-b">Name</th>
                <th className="border-b">Test Status</th>
                <th className="border-b">Job Title</th>
                <th className="border-b">Team</th>
              </tr>
            </thead>
            <tbody>
              {currentEmployees?.map((employee: EmployeeRecord) => (
                <tr key={employee.username}>
                  <td className="border-b">{employee.username}</td>
                  <td
                    className={`border-b ${
                      employee.testStatus === "Completed"
                        ? "text-green-500"
                        : employee.testStatus === "In Progress"
                        ? "text-yellow-500"
                        : "text-red-500"
                    }`}
                  >
                    {employee.testStatus}
                  </td>
                  <td className="border-b">{employee.role}</td>
                  <td className="border-b">{employee.teamNames?.toString()}</td>
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
      <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
        <InvitationDialog
          //handleSendInvitation={handleSendInvitation}
          onClose={() => setIsPopupOpen(false)}
          username={userName}
        />
      </Popup>
    </Layout>
  );
};

export default UserManagement;
