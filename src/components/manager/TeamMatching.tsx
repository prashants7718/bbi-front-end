import Layout from "../layout/Layout";
import { Employees } from "../../constant/employees";
import { useState } from "react";

interface Row {
  id: string;
  teamSize: number;
  jobTitle: string;
}

export default function TeamMatching() {
  const [rows, setRows] = useState<Row[]>([
    { id: `${new Date().getTime()}`, teamSize: 1, jobTitle: "" },
  ]);
  const jobTitles: string[] = [
    ...new Set(Employees.map((employee) => employee.JobTitle)),
  ];
  const [generatedTeam, setGeneratedTeam] = useState<any[]>([]);
  const [isTeamGeneration, setIsTeamGenration] = useState<boolean>(false);

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

  const calculateTotalTeamMembers = () => {
    return rows.reduce((total, row) => total + row.teamSize, 0);
  };

  const generateTeam = () => {
    const team: any[] = [];
    const remainingEmployees = [...Employees];

    for (const row of rows) {
      const { teamSize, jobTitle } = row;
      if (jobTitle) {
        const employeesForJob = remainingEmployees.filter(
          (employee) => employee.JobTitle === jobTitle
        );

        const selectedEmployees = employeesForJob.slice(0, teamSize);

        for (const selected of selectedEmployees) {
          const index = remainingEmployees.findIndex(
            (employee) => employee.Name === selected.Name
          );
          if (index > -1) remainingEmployees.splice(index, 1);
        }

        team.push(...selectedEmployees);

        if (selectedEmployees.length < teamSize) {
          console.warn(
            `Not enough ${jobTitle}s available. Requested: ${teamSize}, Available: ${selectedEmployees.length}`
          );
        }
      }
    }
    setGeneratedTeam(team);
    setIsTeamGenration(false);
  };

  return (
    <Layout>
      <div className="flex-1 p-6">
        <h2 className="text-3xl font-bold text-primaryBlue mb-6">
          Team Matching
        </h2>
        {/* <div className="flex gap-4">
          <button
            className="px-6 py-3 bg-primaryBlue text-white font-semibold rounded-full shadow hover:bg-primaryBlue"
            onClick={() => {
              setIsTeamGenration(true);
            }}
          >
            Create Team
          </button>
          <button
            className="px-6 py-3 bg-secondaryPink text-white font-semibold rounded-full shadow hover:bg-secondaryPink"
            onClick={() => {
              setRows([
                { id: `${new Date().getTime()}`, teamSize: 1, jobTitle: "" },
              ]);
              setIsTeamGenration(false);
            }}
          >
            Cancel
          </button>
        </div>
        {isTeamGeneration && (
          <>
            <div className="flex flex-col bg-white p-4 shadow rounded-lg justify-around mt-12 space-y-2">
              {rows.map((row, i) => (
                <div
                  key={row.id}
                  className="flex bg-white p-2 items-center space-x-20"
                >
                  <div className="mb-6 w-56">
                    <label className="block text-sm font-semibold mb-2">
                      Select number of team members:
                    </label>
                    <select
                      value={row.teamSize}
                      onChange={(e) =>
                        updateRow(row.id, "teamSize", Number(e.target.value))
                      }
                      className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryBlue"
                    >
                      {[1, 2, 3, 4, 5].map((size) => (
                        <option key={size} value={size}>
                          {size} {size === 1 ? "member" : "members"}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-6 w-56">
                    <label className="block text-sm font-semibold mb-2">
                      Select job title:
                    </label>
                    <select
                      value={row.jobTitle}
                      onChange={(e) =>
                        updateRow(row.id, "jobTitle", e.currentTarget.value)
                      }
                      className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryBlue"
                    >
                      <option value="" disabled>
                        Select a job
                      </option>
                      {jobTitles.map((title) => (
                        <option key={title} value={title}>
                          {title}
                        </option>
                      ))}
                    </select>
                  </div>
                  {rows.length === i + 1 ? (
                    <button
                      disabled={row.jobTitle.length === 0}
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-primaryBlue text-white text-2xl"
                      onClick={addRow}
                    >
                      +
                    </button>
                  ) : (
                    <button
                      className="flex items-center justify-center w-10 h-10 rounded-full bg-secondaryPink text-white text-2xl"
                      onClick={() => removeRow(row.id)}
                    >
                      -
                    </button>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-between items-center">
              <h3 className="text-xl font-bold">
                Total Team Members: {calculateTotalTeamMembers()}
              </h3>
              <button
                className="px-6 py-3 bg-primaryBlue text-white font-semibold rounded-full shadow hover:bg-primaryBlue"
                onClick={() => {
                  generateTeam();
                }}
              >
                Generate Team
              </button>
            </div>
          </>
        )}

        {generatedTeam.length > 0 && (
          <div className="mt-6 bg-white p-4 shadow rounded-lg">
            <h3 className="text-xl font-bold mb-4">Generated Team Members:</h3>
            <ul className="space-y-2">
              {generatedTeam.map((member) => (
                <li
                  key={member.Name}
                  className="flex items-center justify-between"
                >
                  <span>{member.Name}</span>
                  <span className="text-gray-600">{member.JobTitle}</span>
                  <span className="text-gray-600">{member.Team}</span>
                  <span className="text-gray-600">{member.role}</span>
                </li>
              ))}
            </ul>
          </div>
        )} */}
      </div>
    </Layout>
  );
}
