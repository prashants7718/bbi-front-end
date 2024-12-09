import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useUserContext } from "../../context/UserContext";
import { getGeneratedTeam, getJobProfiles } from "../../service/userService";

interface Row {
  id: string;
  teamSize: number;
  jobTitle: string;
}

export default function TeamMatching() {
  const { userName } = useUserContext();
  const [rows, setRows] = useState<Row[]>([
    { id: `${new Date().getTime()}`, teamSize: 1, jobTitle: "" },
  ]);

  const [selectedJobTitles, setSelectedJobTitles] = useState<string[]>([]);
  const [generatedTeam, setGeneratedTeam] = useState<any[]>([]);
  // const [isTeamGeneration, setIsTeamGeneration] = useState<boolean>(false);
  // const [showTeam, setShowTeam] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const addRow = () => {
    setRows([
      ...rows,
      { id: `${new Date().getTime()}`, teamSize: 1, jobTitle: "" },
    ]);
  };
  const removeRow = (id: string) => {
    setRows((prevRows) => {
      const filteredRows = prevRows.filter((row) => row.id !== id);
      return filteredRows;
    });
  };
  const updateRow = (id: string, key: keyof Row, value: number | string) => {
    const updatedRows = rows.map((row) =>
      row.id === id ? { ...row, [key]: value } : row
    );
    setRows(updatedRows);
  };

  const generateTeam = async () => {
    const constraints = rows.map((row) => {
      return {
        name: row.jobTitle,
        count: row.teamSize,
      };
    });

    const result = await getGeneratedTeam(userName, constraints);
    toast("Team Generated successfully", {
      position: "top-center",
      autoClose: 3000,
      type: "success",
      theme: "colored",
    });
    setGeneratedTeam(result?.[0]?.assigned);
    // setIsTeamGeneration(false);
    // setShowTeam(true);
    setShowModal(false);
  };
  const clearTable = () => {
    setGeneratedTeam([]);
    setRows([
      {
        id: `${new Date().getTime()}`,
        teamSize: 1,
        jobTitle: "",
      },
    ]);
  };

  const getAllJobProfiles = async () => {
    const result = await getJobProfiles(userName);
    setSelectedJobTitles(result);
  };

  useEffect(() => {
    getAllJobProfiles();
  }, [userName]);

  return (
    <div className="flex-1 bg-white shadow-bbiCardShadow rounded-lg bb-tbl">
      <div className="heading-text p-4 flex items-center justify-between gap-4">
        <h2 className="text-xl font-semibold text-textBlack">Team Matching</h2>
        {generatedTeam.length === 0 ? (
          <button
            className="py-1 px-5  h-9 bg-secondaryPink text-textBlack rounded shadow hover:bg-secondaryPink"
            onClick={() => setShowModal(true)}
          >
            Match Team
          </button>
        ) : (
          <button
            className="px-4 py-1 bg-secondaryPink text-white rounded"
            onClick={clearTable}
          >
            Clear Table
          </button>
        )}
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center overflow-auto">
          <div className="bg-white p-4 rounded shadow-lg max-w-xl w-full">
            <h3 className="text-lg font-normal mb-4 text-textBlack">
              Create Team
            </h3>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {rows.map((row) => (
                <div key={row.id} className="flex items-center space-x-4">
                  <select
                    value={row.teamSize}
                    onChange={(e) =>
                      updateRow(row.id, "teamSize", Number(e.target.value))
                    }
                    className="w-32 p-1 h-9 border rounded bg-white"
                  >
                    {[1, 2, 3, 4, 5].map((size) => (
                      <option key={size} value={size}>
                        {size} {size === 1 ? "member" : "members"}
                      </option>
                    ))}
                  </select>
                  <select
                    value={row.jobTitle}
                    onChange={(e) =>
                      updateRow(row.id, "jobTitle", e.currentTarget.value)
                    }
                    className="flex-1 p-1 h-9 border rounded bg-white"
                  >
                    <option value="" disabled>
                      Select Job Title
                    </option>
                    {selectedJobTitles?.map((title) => (
                      <option key={title} value={title}>
                        {title}
                      </option>
                    ))}
                  </select>
                  <button
                    className="p-1 rounded"
                    onClick={() => removeRow(row.id)}
                  >
                    <i className="ri-close-circle-line text-xl"></i>
                  </button>
                </div>
              ))}
              <div className="space-x-4">
                <button
                  className="px-2 py-1 bg-blueBackground text-white rounded text-sm"
                  onClick={addRow}
                >
                  Add Role
                </button>
              </div>
            </div>
            <div className="flex justify-end space-x-4 mt-3 text-sm">
              <button
                className="px-4 py-1 bg-darkGrayBackground text-textBlack rounded"
                onClick={() => {
                  setShowModal(false);
                  setRows([
                    {
                      id: `${new Date().getTime()}`,
                      teamSize: 1,
                      jobTitle: "",
                    },
                  ]);
                }}
              >
                Cancel
              </button>
              <button
                className="px-2 bg-secondaryPink text-textBlack rounded"
                onClick={generateTeam}
              >
                Generate Team
              </button>
            </div>
          </div>
        </div>
      )}
      {generatedTeam.length > 0 && (
        <div className="flex-1 bb-tbl">
          <div className="flex items-center justify-between pb-3">
            <div className="flex items-center px-4 justify-between gap-4">
              <h2 className="text-md font-medium text-textBlack">
                Generated Team Members
              </h2>
            </div>
          </div>
          <table className="min-w-full table-auto">
            <thead>
              <tr className="text-secondaryPink bg-white">
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Job Title</th>
                <th className="px-4 py-2 text-left">Score</th>
              </tr>
            </thead>
            <tbody>
              {generatedTeam.map((member) => (
                <tr key={member.Name} className="border-t">
                  <td className="px-4 py-2">{member.username}</td>
                  <td className="px-4 py-2">{member.jobTitle}</td>
                  <td className="px-4 py-2">{member.scores.toString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
