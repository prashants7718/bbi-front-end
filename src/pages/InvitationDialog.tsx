import { useEffect, useState } from "react";
import { Employees } from "../constant/employees";
import { inviteUser } from "../service/managerService";
import { useNavigate } from "react-router-dom";

interface UserManagementProps {
  handleSendInvitation?: () => void;
  onClose: () => void;
}
const InvitationDialog = ({ onClose }: UserManagementProps) => {
  const [selectedTeam, setSelectedTeam] = useState<string>();
  const [formData, setFormData] = useState({
    email: "",
    company: "HT",
    team: selectedTeam,
  });
  const navigate = useNavigate();

  const [message, setMessage] = useState<string>("");
  const uniqueTeams = [...new Set(Employees.map((emp) => emp.Team))];
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  useEffect(() => {
    console.log("formData=======", formData);
  }, [formData]);

  const handleInvite = async () => {
    try {
      await inviteUser(formData);
      onClose();
    } catch (error: any) {
      setMessage(
        error.response?.data?.error ||
          "Failed to send invitation. Please try again."
      );
    }
  };
  const handleTeamChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newTeam = e.target.value;
    setSelectedTeam(newTeam);
    setFormData((prev) => ({ ...prev, team: newTeam }));
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="p-6 bg-white rounded-md shadow-lg transform transition-transform scale-100">
        <h2
          id="test-dialog-title"
          className="mb-3 text-xl font-semibold text-center text-blue-900"
        >
          Invite Members to your team
        </h2>
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Eg.john@example.com"
              className={`w-full px-4 py-1  border text-sm  rounded-md focus:outline-none focus:ring-2 focus:ring-primaryBlue`}
            />
          </div>
          {/* <div>
            <label className="block text-sm font-medium mb-2">
              Name(Optional)
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              placeholder="Eg.John"
              onChange={handleChange}
              className={`w-full px-4 py-1   border text-sm   rounded-md focus:outline-none focus:ring-2 focus:ring-primaryBlue`}
            />
          </div> */}
          <div>
            <label className="block text-sm font-medium mb-2">Team</label>
            <select
              id="teamFilter"
              className="px-4 py-1 border rounded shadow-sm w-full bg-white text-sm"
              value={selectedTeam}
              onChange={handleTeamChange}
            >
              <option disabled selected>
                Select a team
              </option>
              {uniqueTeams.map((team) => (
                <option key={team} value={team}>
                  {team}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex items-center justify-center space-x-4 mt-5">
          <button
            className="px-6 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 "
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-6 py-2 text-sm font-medium text-white bg-secondaryPink rounded-lg hover:bg-secondaryPink "
            onClick={handleInvite}
            type="submit"
          >
            Send Invitation
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvitationDialog;
