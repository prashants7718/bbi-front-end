import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { getSpecificTeam, Team } from "../../service/teamService";
import { getTeamMembers, removeTeamFromUser } from "../../service/userService";
import Layout from "../layout/Layout";
import { useUserContext } from "../../context/UserContext";
import { toast } from "react-toastify";
import { EmployeeRecord } from "../../types/manager";

interface User {
  username: string;
  _id: string;
  email: string;
  company: string;
  local: object;
  role: string;
  team: string;
  jobTitle: string;
}

const TeamMembers = () => {
  const { teamName } = useParams<{ teamName: string }>();
  const { userName } = useUserContext();
  const [teamMembers, setTeamMembers] = useState<EmployeeRecord[]>([]);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  // const [selectedTeam, setSelectedTeam] = useState<string>("");
  const [selectedMember, setSelectedMember] = useState<User>();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [currentTeam, setCurrentTeam] = useState<Team>();

  const dropdownRef = useRef<HTMLDivElement>(null);
  const getTeamMember = async () => {
    if (!teamName) {
      return;
    }
    const result = await getTeamMembers(teamName);
    const response = await getSpecificTeam(teamName);
    setCurrentTeam(response);
    setTeamMembers(result);
  };
  useEffect(() => {
  }, [currentTeam, teamMembers]);
  const handleEllipsisClick = (member) => {
    setSelectedMember(member);
    // setSelectedTeam("");
    setIsDropdownVisible((prev) => !prev);
  };
  useEffect(() => {
    getTeamMember();
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
    setIsRemoveModalOpen(true);
    setIsDropdownVisible(false);
  };
  useEffect(() => {}, [userName]);
  if (!teamMembers?.length) {
    return <p>No members found for this team.</p>;
  }

  const handleRemoveFromTeam = async (): void => {
    if (!teamName) {
      return;
    }
    if (selectedMember) {
      await removeTeamFromUser(selectedMember.username, teamName);
      toast(`Successfully removed from the Team`, {
        position: "top-center",
        autoClose: 3000,
        type: "success",
        theme: "colored",
      });
      setIsRemoveModalOpen(false);
      getTeamMember();
    }
  };

  return (
    <Layout>
      <div className="flex-1 bg-white shadow-bbiCardShadow rounded-lg bb-tbl">
        <div className="heading-text p-4 flex items-center justify-between gap-4">
          <h2 className="text-xl font-semibold text-textBlack">
            Team {currentTeam?.name}
          </h2>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-secondaryPink bg-white">
              <th className="border-b p-3">Name</th>
              <th className="border-b p-3">Role</th>
              <th className="border-b p-3">Job Title</th>
              <th className="border-b p-3 w-32 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {teamMembers?.map((member, index) => (
              <tr key={index}>
                <td className="border-b p-3">{member.username}</td>
                <td className="border-b p-3">{member.role}</td>
                <td className="border-b p-3">{member.jobTitle}</td>
                <td className="border-b p-3 cursor-pointer relative text-center">
                  <button
                    className="flex items-center justify-center w-8 h-8 rounded-full mx-auto hover:bg-grayBackground"
                    onClick={() => handleEllipsisClick(member)}
                  >
                    <i className="ri-more-2-fill"></i>
                  </button>
                  {isDropdownVisible &&
                    selectedMember?.username === member.username && (
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
              Are you sure you want to remove {selectedMember?.username} from
              Team?
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
