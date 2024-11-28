import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Employees } from "../../constant/employees";
import Layout from "../layout/Layout";

const TeamMembers = () => {
  const { teamName } = useParams();
  const teamMembers = Employees.filter((emp) => emp.Team === teamName);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<string>("");
  const [selectedMember, setSelectedMember] = useState(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleEllipsisClick = (member) => {
    console.log("member", member);
    setSelectedMember(member);
    setSelectedTeam("");
    setIsDropdownVisible((prev) => !prev);
  };
  useEffect(() => {
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

  if (!teamMembers.length) {
    return <p>No members found for this team.</p>;
  }

  const handleRemoveFromTeam = (): void => {
    if (selectedMember) {
      alert(`Removed from team ${selectedTeam}`);
      setIsRemoveModalOpen(false);
    }
  };

  return (
    <Layout>
      <div className="mt-6 bg-white p-6 shadow rounded-lg">
        <h3 className="text-2xl font-bold text-primaryBlue mb-4">
          Team {teamName}
        </h3>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-primaryBlue">
              <th className="border-b p-3">Name</th>
              <th className="border-b p-3">Role</th>
              <th className="border-b p-3">Job Title</th>
              <th className="border-b p-3"></th>
            </tr>
          </thead>
          <tbody>
            {teamMembers.map((member, index) => (
              <tr key={index}>
                <td className="border-b p-3">{member.Name}</td>
                <td className="border-b p-3">{member.Role}</td>
                <td className="border-b p-3">{member.JobTitle}</td>
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
              Are you sure you want to remove {selectedMember?.Name} from Team?
            </h3>

            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsRemoveModalOpen(false)}
                className="px-4 py-1 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleRemoveFromTeam}
                className={`px-4 py-1 rounded bg-primaryBlue text-white hover:bg-primaryBlue}`}
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
