import {
  faCircleChevronLeft,
  faCircleChevronRight,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Employees } from "../../constant/employees";
import InvitationDialog from "../../pages/InvitationDialog";
import Layout from "../layout/Layout";
import Popup from "../layout/Popup";

const UserManagement = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleSendInvitation = () => {
    console.log("Invitation sent");
  };

  const [selectedTeam, setSelectedTeam] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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

  return (
    <Layout>
      <div className="p-6">
        <div>
          <h2 className="text-3xl font-bold text-primaryBlue">
            User Management
          </h2>
          <div className="flex justify-end p-1">
            <button
              className="mb-1 p-1 px-5 bg-primaryBlue text-white rounded shadow hover:bg-primaryBlue"
              onClick={() => setIsPopupOpen(true)}
            >
              <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
              Invite
            </button>
          </div>
        </div>
        <div className="items-center justify-between bg-white p-6 shadow rounded-lg">
          <div className="p-1">
            <div className="mb-1 flex justify-start items-center">
              <label className="text-base font-medium text-gray-70 ml-2">
                Filter by Team:
              </label>
              <select
                id="teamFilter"
                className="ml-2 border rounded shadow-sm "
                value={selectedTeam}
                onChange={(e) => setSelectedTeam(e.target.value)}
              >
                {uniqueTeams.map((team) => (
                  <option key={team} value={team} className="text-sm">
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
                {currentEmployees.map((employee) => (
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
          handleSendInvitation={handleSendInvitation}
          onClose={() => setIsPopupOpen(false)}
        />
      </Popup>
    </Layout>
  );
};

export default UserManagement;
