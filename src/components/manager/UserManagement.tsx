import {
  faEnvelope
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Employees } from "../../constant/employees";
import InvitationDialog from "../../pages/InvitationDialog";
import Layout from "../layout/Layout";
import Popup from "../layout/Popup";
import { getAllTeamEmployees, getTeams } from "../../service/userService";
import { getSortedTeamsWithName } from "../../service/teamService";

const UserManagement = ({ username }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleSendInvitation = () => {
    console.log("Invitation sent");
  };

  const [selectedTeam, setSelectedTeam] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [reportingEmployees, setReportingEmployees] = useState([])
  const [userTeams, setUserTeams] = useState([{name : "All"}]);
  const uniqueTeams = ["All", ...new Set(Employees.map((emp) => emp.Team))];

  const sortedEmployees = Employees.slice().sort((a, b) =>
    a.Name.localeCompare(b.Name)
  );
  const filteredEmployees =
    selectedTeam === "All"
      ? sortedEmployees
      : sortedEmployees
          .filter((emp) => emp.Team === selectedTeam)
          .concat(sortedEmployees.filter((emp) => emp.Team !== selectedTeam));

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEmployees = filteredEmployees.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);

  const getAllReportings = async() => {
    const result = await getAllTeamEmployees(username);
    setReportingEmployees(result)
  }
  const getUserTeams = async () => {
    try {
      const result = await getTeams(username);
      const updatedTeams = [{name : "All"}, ...new Set(result)];
      setUserTeams(updatedTeams);
    } catch (error) {
      console.error("Error fetching user teams:", error);
    }
  };

  const getSortedTeam = async(id) => {
    const result = await getSortedTeamsWithName(username, id)
    setReportingEmployees(result)
  }

  useEffect (() => {
    getAllReportings()
    getUserTeams()
  }, [])

  return (
    <Layout>
      <div>
        <div className="items-center justify-between bg-primaryPink p-4 shadow-lg rounded-lg">
          <div className="p-1">
            <div className="flex justify-between p-1 items-center">
              <h2 className="text-3xl font-bold text-secondaryPink">
                User Management
              </h2>
              <button
                className="mb-1 p-1 px-5 bg-secondaryPink text-white rounded shadow hover:bg-secondaryPink"
                onClick={() => setIsPopupOpen(true)}
              >
                <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                Invite
              </button>
            </div>
            <div className="mt-2  flex justify-start items-center">
              <label className="text-sm font-medium text-gray-70 ml-2">
                Sort by Team:
              </label>
              <select
                id="teamFilter"
                className="ml-2 border rounded shadow-sm text-sm"
                value={selectedTeam}
                onChange={(e) => {
                  getSortedTeam(e.target.value)
                  setSelectedTeam(e.target.value)
                }}
              >
                {userTeams.map((team) => (
                  <option key={team._id} value={team._id} className="text-sm" onClick={() => {
                    getSortedTeam(team._id)
                  }}>
                    {team.name}
                  </option>
                ))}
              </select>
            </div>
            <table className="w-full text-left border-collapse mt-2">
              <thead>
                <tr className="text-secondaryPink bg-white">
                  <th className="border-b p-3">Name</th>
                  <th className="border-b p-3">Test Status</th>
                  <th className="border-b p-3">Job Title</th>
                  <th className="border-b p-3">Team</th>
                </tr>
              </thead>
              <tbody>
                {reportingEmployees.map((employee) => (
                  <tr key={employee.username}>
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
                    <td className="border-b p-3">{employee.teamNames.toString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* <div className="mt-4 flex justify-end space-x-2 ">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <FontAwesomeIcon icon={faCircleChevronLeft} />
              </button>
              <span className="flex items-center justify-center">
                {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <FontAwesomeIcon icon={faCircleChevronRight} />
              </button>
            </div> */}
          </div>
        </div>
      </div>
      <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
        <InvitationDialog
          //handleSendInvitation={handleSendInvitation}
          onClose={() => setIsPopupOpen(false)}
        />
      </Popup>
    </Layout>
  );
};

export default UserManagement;
