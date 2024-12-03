import { useState, useEffect } from "react";
import Layout from "../layout/Layout";
import { useNavigate } from "react-router-dom";
import { getTeams } from "../../service/userService";

// Define types for team and props
interface Team {
  _id: string;
  name: string;
  username: string;
  membersCount: number; 
}

interface Props {
  username: string;
}

const Teams: React.FC<Props> = ({ username }) => {
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [teamData, setTeamData] = useState<Team[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchTeamData = async () => {
    try {
      setLoading(true);
      const result = await getTeams(username);
      setTeamData(result);
      setError(null); 
    } catch (err) {
      setError("Failed to fetch teams. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeamData();
  }, [username]);

  return (
    <Layout>
      <div className="flex space-x-6">
        <div className="flex-1 bg-primaryPink p-6 shadow-lg rounded-lg">
          <h2 className="text-3xl font-bold text-secondaryPink mb-6">Teams</h2>

          {error && (
            <div className="text-red-600 bg-red-100 p-3 rounded">
              {error}
            </div>
          )}

          {loading ? (
            <div className="text-center py-6">Loading teams...</div>
          ) : teamData && teamData.length > 0 ? (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-secondaryPink bg-white">
                  <th className="border-b p-3">Team</th>
                  <th className="border-b p-3">Members</th>
                </tr>
              </thead>
              <tbody>
                {teamData.map((team) => (
                  <tr key={team._id}>
                    <td
                      className="border-b p-3 text-primaryBlue cursor-pointer underline"
                      onClick={() => navigate(`/manager/team/${team._id}`)}
                    >
                      {team.name}
                    </td>
                    <td className="border-b p-3">{team.membersCount || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-6">No teams found.</div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Teams;
