import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Employees } from "../../constant/employees";
import Layout from "../layout/Layout";
import { getTeamMembers, removeTeamFromUser } from "../../service/userService";
import { getSpecificTeam } from "../../service/teamService";

interface User {
  username: string;
  _id: string;
  email: string;
  company: string;
  local: object;
  role: string;
  team: string;
}

const TeamMembers = () => {
  const { teamName } = useParams();
  // const teamMembers = Employees.filter((emp) => emp.Team === teamName);
  const [teamMembers, setTeamMembers] = useState<User[] | null>(null)
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<string>("");
  const [selectedMember, setSelectedMember] = useState(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [currentTeam, setCurrentTeam] = useState(null)

  const dropdownRef = useRef<HTMLDivElement>(null);
  const getTeamMember = async () => {
    const result = await getTeamMembers(teamName)
    const response = await getSpecificTeam(teamName)
    setCurrentTeam(response)
    setTeamMembers(result)
    console.log(result)
  }

  const handleEllipsisClick = (member) => {
    console.log("member", member);
    setSelectedMember(member);
    setSelectedTeam("");
    setIsDropdownVisible((prev) => !prev);
  };
  useEffect(() => {
    getTeamMember()
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const handleRemoveOption = () => {
    console.log("Remove option clicked for", selectedMember);
    setIsRemoveModalOpen(true);
    setIsDropdownVisible(false);
  };

  if (!teamMembers?.length) {
    return <p>No members found for this team.</p>;
  }

  const handleRemoveFromTeam = async(): void => {
    if (selectedMember) {
      const result = await removeTeamFromUser(selectedMember.username, teamName)
      console.log(result)
      alert(`Removed from team ${selectedTeam}`);
      setIsRemoveModalOpen(false);
    }
  };

  return (
    <Layout>
      <div className="mt-6 bg-primaryPink p-6 shadow-lg rounded-lg">
        <h3 className="text-2xl font-bold text-secondaryPink mb-4">
          Team {currentTeam.name}
        </h3>
        <table className="w-full text-left border-collapse">
          <thead>
          <tr className="text-secondaryPink bg-white">
              <th className="border-b p-3">Name</th>
              <th className="border-b p-3">Role</th>
              <th className="border-b p-3">Job Title</th>
              <th className="border-b p-3"></th>
            </tr>
          </thead>
          <tbody>
            {teamMembers?.map((member, index) => (
              <tr key={index}>
                <td className="border-b p-3">{member.username}</td>
                <td className="border-b p-3">{member.role}</td>
                <td className="border-b p-3">{member.email}</td>
                <td className="border-b p-3 cursor-pointer relative">
                  <button onClick={() => handleEllipsisClick(member)}>
                    <FontAwesomeIcon icon={faEllipsisVertical} size="sm" />
                  </button>
                  {isDropdownVisible && selectedMember === member && (
                    <div
                      ref={dropdownRef}
                      className="absolute right-0 mt-2 w-40 bg-white shadow-lg text-sm rounded-md border z-40"
                    >
                      <button
                        onClick={handleRemoveOption}
                        className="w-full px-4 py-2 flex items-center justify-between border-b border-gray-200 text-primaryBlue"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isRemoveModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white w-1/4 rounded-lg p-6 shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-primaryBlue">
              Are you sure you want to remove {selectedMember?.username} from Team?
            </h3>

            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsRemoveModalOpen(false)}
                className="px-4 py-1 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => handleRemoveFromTeam()}
                className={`px-4 py-1 rounded bg-secondaryPink text-white hover:bg-secondaryPink}`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default TeamMembers;
