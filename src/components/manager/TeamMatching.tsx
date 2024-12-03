import { useState } from "react";
import { Employees } from "../../constant/employees";

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
  const [isTeamGeneration, setIsTeamGeneration] = useState<boolean>(false);
  const [showTeam, setShowTeam] = useState(false);
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
  const calculateDistance = (vectorA: number[], vectorB: number[]): number => {
    if (vectorA.length !== vectorB?.length) {
      throw new Error("Vectors must be of the same length");
    }
    const distance = Math.sqrt(
      vectorA.reduce((sum, value, index) => {
        return sum + Math.pow(value - vectorB[index], 2);
      }, 0)
    );

    return distance;
  };
  const findClosestMatch = (
    userScores: number[],
    otherUsers: User[]
  ): { user: User | null; distance: number } => {
    return otherUsers.reduce(
      (bestMatch, currentUser) => {
        console.log({ currentUser });
        const distance = calculateDistance(userScores, currentUser.scores);

        if (distance < bestMatch.distance) {
          return { user: currentUser, distance };
        }

        return bestMatch;
      },
      { user: null, distance: Infinity }
    );
  };
  const calculateAverageScores = (members: any[]): number[] => {
    const scoresLength = members[0]?.scores?.length || 0;
    return Array(scoresLength)
      .fill(0)
      .map((_, i) => {
        return (
          members.reduce((sum, member) => sum + member.scores[i], 0) /
          members.length
        );
      });
  };
  const buildTeam = (
    requirements: any[],
    candidates: any[],
    initialTeamMembers: any[]
  ) => {
    const team: any[] = [];
    // const team = [];
    requirements.forEach((role) => {
      const { teamSize, jobTitle } = role;
      const filteredCandidates = candidates.filter(
        (candidate) => candidate.JobTitle === jobTitle
      );

      let selectedCount = 0;
      const avgTeamScores = calculateAverageScores(filteredCandidates);
      while (selectedCount < teamSize && filteredCandidates.length > 0) {
        const bestMatch = findClosestMatch(avgTeamScores, filteredCandidates);

        if (bestMatch.user) {
          team.push(bestMatch.user);
          selectedCount++;
          const userIndex = filteredCandidates.indexOf(bestMatch.user);
          filteredCandidates.splice(userIndex, 1);
        } else {
          break;
        }
      }
    });
    return team;
  };
  const generateTeam = () => {
    const team: any[] = [];
    const remainingEmployees = [...Employees];
    const getteam = buildTeam(rows, remainingEmployees);

    console.log(getteam);
    // for (const row of rows) {
    //   const { teamSize, jobTitle } = row;
    //   if (jobTitle) {
    //     const employeesForJob = remainingEmployees.filter(
    //       (employee) => employee.JobTitle === jobTitle
    //     );

    //     const selectedEmployees = employeesForJob.slice(0, teamSize);

    //     for (const selected of selectedEmployees) {
    //       const index = remainingEmployees.findIndex(
    //         (employee) => employee.Name === selected.Name
    //       );
    //       if (index > -1) remainingEmployees.splice(index, 1);
    //     }

    //     team.push(...selectedEmployees);

    //     if (selectedEmployees.length < teamSize) {
    //       console.warn(
    //         `Not enough ${jobTitle}s available. Requested: ${teamSize}, Available: ${selectedEmployees.length}`
    //       );
    //     }
    //   }
    // }
    setGeneratedTeam(getteam);
    setIsTeamGeneration(false);
    setShowTeam(true);
  };

  return (
    <div className="flex-1">
      <h2 className="text-3xl font-bold text-secondaryPink mb-2">
        Team Matching
      </h2>
      <div className="flex gap-4">
        <button
          className="p-1 px-2 bg-secondaryPink text-white rounded shadow hover:bg-secondaryPink"
          onClick={() => {
            setIsTeamGeneration(true);
          }}
        >
          Create Team
        </button>
        {isTeamGeneration && (
          <button
            className="px-4 py-1 bg-gray-400 text-gray-800 rounded hover:bg-gray-400"
            onClick={() => {
              setRows([
                { id: `${new Date().getTime()}`, teamSize: 1, jobTitle: "" },
              ]);
              setIsTeamGeneration(false);
              setShowTeam(false);
            }}
          >
            Cancel
          </button>
        )}
      </div>
      {isTeamGeneration && (
        <>
          <div className="flex flex-col bg-primaryPink p-4 shadow-lg rounded-lg justify-around mt-4 space-y-2">
            {rows.map((row, i) => (
              <div
                key={row.id}
                className="flex bg-primaryPink p-2 items-center space-x-20"
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
              className="px-6 py-3 bg-secondaryPink text-white font-semibold rounded-full shadow hover:bg-secondaryPink"
              onClick={() => {
                generateTeam();
              }}
            >
              Generate Team
            </button>
          </div>
        </>
      )}

      {showTeam && generatedTeam.length > 0 && (
        <div className="mt-6 bg-primaryPink p-4 shadow-lg rounded-lg ">
          <h3 className="text-xl font-bold mb-4 text-secondaryPink">
            Generated Team Members:
          </h3>
          <table className="min-w-full table-auto">
            <thead>
              <tr className="text-secondaryPink bg-white">
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Job Title</th>
                <th className="px-4 py-2 text-left">Team</th>
                <th className="px-4 py-2 text-left">Role</th>
              </tr>
            </thead>
            <tbody>
              {generatedTeam.map((member) => (
                <tr key={member.Name} className="border-t">
                  <td className="px-4 py-2">{member.Name}</td>
                  <td className="px-4 py-2 text-gray-600">{member.JobTitle}</td>
                  <td className="px-4 py-2 text-gray-600">{member.Team}</td>
                  <td className="px-4 py-2 text-gray-600">{member.Role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
