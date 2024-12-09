import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { inviteUser } from "../service/managerService";
import { getCurrentUser, getTeams } from "../service/userService";
import { InviteUserPayload } from "../types/manager";

interface UserManagementProps {
  handleSendInvitation?: () => void;
  onClose: () => void;
  username: string;
}
const InvitationDialog = ({ onClose, username }: UserManagementProps) => {
  const [selectedTeam, setSelectedTeam] = useState<string>("");
  const [companyName, setCompanyName] = useState("");
  const [formData, setFormData] = useState<InviteUserPayload>({
    email: "",
    company: companyName,
    name: "",
    team: selectedTeam,
    username: username,
  });
  const [errors, setErrors] = useState({ email: "", name: "" });
   const [teams, setTeams] = useState([]);

  const validate = () => {
    const newErrors = {
      email: formData.email ? "" : "Email is required",
      name: formData.name ? "" : "Name is required",
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((err) => err);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const getCurrentUserDetails = async () => {
    const result = await getCurrentUser(username);
    setCompanyName(result.company);
  };

  const handleInvite = async () => {
    if (validate()) {
      try {
        await inviteUser(formData);
        toast("Invite sent", {
          position: "top-center",
          autoClose: 3000,
          type: "success",
          theme: "colored",
        });
        onClose();
      } catch (error) {
        const errorMessage =
          (error as any) ||
          (error instanceof Error
            ? error.message
            : "An unexpected error occurred");
        toast(errorMessage, {
          position: "top-center",
          autoClose: 3000,
          type: "error",
          theme: "colored",
        });
      }
    }
  };
  const handleTeamChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newTeam = e.target.value;
    setSelectedTeam(newTeam);
    setFormData((prev) => ({ ...prev, team: newTeam }));
  };
  const getUserTeams = async () => {
    try {
      const result = await getTeams(username);
      setTeams(result);
    } catch (error) {
      console.error("Error fetching user teams:", error);
    }
  };

  useEffect(() => {
    getCurrentUserDetails();
    getUserTeams();
  }, []);
  useEffect(() => {
    setFormData((prev) => ({ ...prev, company: companyName }));
  }, [companyName]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[9999]">
      <div className="p-6 bg-white rounded-md shadow-lg transform transition-transform scale-100">
        <h2
          id="test-dialog-title"
          className="mb-4 text-xl font-semibold text-center text-blue-900"
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
              className={`w-full px-4 py-1 h-9 border text-sm  rounded-md focus:outline-none focus:ring-2 focus:ring-primaryBlue`}
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-500">{errors.email}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              placeholder="Eg.John"
              onChange={handleChange}
              className={`w-full px-4 py-1 h-9 border text-sm   rounded-md focus:outline-none focus:ring-2 focus:ring-primaryBlue`}
            />
            {errors.name && (
              <p className="mt-2 text-sm text-red-500">{errors.name}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Team</label>
            <select
              id="teamFilter"
              className="px-4 py-1 h-9 border rounded shadow-sm w-full bg-white text-sm"
              value={selectedTeam}
              onChange={handleTeamChange}
            >
              <option value="" disabled selected>
                Select a team
              </option>
              {teams.map((team) => (
                <option key={team._id} value={team._id}>
                  {team.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex items-center space-x-4 mt-6">
          <button
            className="px-2 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 w-1/2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-2 py-2 text-sm font-medium text-white bg-secondaryPink rounded-lg hover:bg-secondaryPink w-1/2"
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
