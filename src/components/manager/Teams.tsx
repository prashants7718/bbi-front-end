import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createNewTeam, NewTeam } from "../../service/teamService";
import { getCurrentUser, getTeams, Team } from "../../service/userService";
import Layout from "../layout/Layout";
import Popup from "../layout/Popup";
import CreateTeamDialog from "../../pages/CreateTeamDialog";
import Pagination from "../../pages/Pagination";
import { useUserContext } from "../../context/UserContext";
import { toast } from "react-toastify";

// Define types for team and props
const paginate = (items, currentPage, rowsPerPage) => {
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  return items?.slice(startIndex, endIndex);
};
const Teams = () => {
  const { userName } = useUserContext();
  const [teamData, setTeamData] = useState<NewTeam[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [teamName, setTeamName] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const totalItems = totalResults;
  const totalPages = Math.ceil(totalResults / rowsPerPage);
  const fetchTeamData = async () => {
    try {
      const result = await getTeams(userName);
      const response = await getCurrentUser(userName);
      setCompanyName(response.company);
      setTeamData(result);
      setError(null);
      setTotalResults(result?.length);
    } catch {
      setError("Failed to fetch teams. Please try again later.");
    }
  };

  const handleCreateTeam = async () => {
    if (!teamName) {
      setError("Team name is required.");
      return;
    }
    try {
      const result = await createNewTeam(teamName, companyName, userName);
      setTeamData((prev) => (prev ? [...prev, result] : [result]));
      setTeamName("");
      setError(null);
      setIsPopupOpen(false);
      fetchTeamData();
      toast(`Successfully created a Team`, {
        position: "top-center",
        autoClose: 3000,
        type: "success",
        theme: "colored",
      });
    } catch {
      setError("Failed to create team. Please try again.");
    }
  };
  useEffect(() => {
    fetchTeamData();
  }, [userName, companyName]);
  useEffect(() => {}, [teamData]);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1);
  };

  const currentTeams = paginate(teamData, currentPage, rowsPerPage);

  return (
    <Layout>
      <div className="flex space-x-6">
        <div className="flex-1 bg-white shadow-bbiCardShadow rounded-lg bb-tbl">
          <div className="heading-text p-4 flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold text-textBlack">Teams</h2>
            <div>
              <button
                className="p-1 px-5 h-9 bg-secondaryPink text-textBlack rounded shadow hover:bg-secondaryPink"
                onClick={() => setIsPopupOpen(true)}
              >
                Create Team
              </button>
            </div>
          </div>

          {error && (
            <div className="text-red-600 bg-red-100 p-3 rounded">{error}</div>
          )}

          {teamData && teamData.length > 0 ? (
            <div>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-secondaryPink bg-white">
                    <th className="border-b p-3">Team</th>
                    <th className="border-b p-3">Members</th>
                  </tr>
                </thead>
                <tbody>
                  {currentTeams.map((team: Team) => (
                    <tr key={team?._id}>
                      <td
                        className={`border-b p-3 text-primaryBlue  ${
                          team?.membersCount > 0
                            ? "underline cursor-pointer"
                            : ""
                        }`}
                        onClick={() => {
                          if (team?.membersCount > 0) {
                            navigate(`/manager/team/${team._id}`);
                          }
                        }}
                      >
                        {team?.name}
                      </td>
                      <td className="border-b p-3">
                        {team?.membersCount ?? 0}
                      </td>
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
          ) : (
            <div className="text-center py-6">
              No records found.Click 'Create Team' to create your first Team
            </div>
          )}
        </div>
      </div>
      <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
        <CreateTeamDialog
          onClose={() => setIsPopupOpen(false)}
          handleCreateTeam={handleCreateTeam}
          teamName={teamName}
          setTeamName={setTeamName}
        />
      </Popup>
    </Layout>
  );
};

export default Teams;
