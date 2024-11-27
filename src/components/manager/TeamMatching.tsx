import { useState } from "react";
import Layout from "../layout/Layout";

const TeamMatching = () => {
  const [teamSize, setTeamSize] = useState(1);
  const [selectedJobs, setSelectedJobs] = useState([]);

  const jobTitles = [
    "Software Engineer",
    "Marketing Specialist",
    "Project Manager",
    "Sales Associate",
    "Data Analyst",
    "QA",
  ];

  const handleJobSelect = (e:React.ChangeEvent<HTMLInputElement>) => {
    setSelectedJobs((prev) => ({ ...prev, }));
  };

  return (
    <Layout>
      <div className="flex-1 p-6">
        <h2 className="text-3xl font-bold text-primaryBlue mb-6">
          Team Matching
        </h2>
        <div className="flex  bg-white p-4 shadow rounded-lg justify-around">
          <div className="mb-6 w-56">
            <label className="block text-sm font-semibold mb-2">
              Select number of team members:
            </label>
            <select
              value={teamSize}
              onChange={(e) => setTeamSize(Number(e.target.value))}
              className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryBlue"
            >
              {[1, 2, 3, 4, 5].map((size) => (
                <option key={size} value={size}>
                  {size} {size === 1 ? "member" : "members"}
                </option>
              ))}
            </select>
          </div>
          <div>
            <div className="mb-6 w-56">
              <label className="block text-sm font-semibold mb-2">
                Select job titles:
              </label>
              <select
                value={selectedJobs}
                onChange={(e) => handleJobSelect(e.target.value)}
                className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primaryBlue"
              >
                {jobTitles.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TeamMatching;
