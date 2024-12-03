import { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import Cookies from "js-cookie";
import { getUserTests } from "../../service/usertestService";

const Archive = ({ username }) => {
  // const archivedTests = testData.filter((test) => test.status === "Completed");
  const [testData, setTestData] = useState<Test[] | null>(null);
  const getScoreForTest = (testName) => {
    const savedScore = Cookies.get(`${testName}-score`);
    return savedScore ? parseInt(savedScore, 10) : 0;
  };

  const getUserTestData = async () => {
    try {
      const result = await getUserTests(username, "Completed");
      setTestData(result);
      console.log(result)
    } catch (error) {
      console.error("Error fetching user tests:", error);
      setTestData([]); 
    }
  };

  useEffect(() => {
    getUserTestData()
  }, [] )
  return (
    <Layout>
      <div className="flex h-screen">
      <div className="flex-1 p-4">
          <div className="flex space-x-6">
            <div className="flex-1 bg-primaryPink p-5 shadow-xl rounded-lg">
              <h2 className="text-3xl font-bold text-secondaryPink mb-6">
                Archived Tests
              </h2>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-secondaryPink bg-white">
                    <th className="border-b p-2">Test Name</th>
                    <th className="border-b p-2">Status</th>
                    <th className="border-b p-2">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {testData?.map((test) => (
                    <tr
                      key={test.id}
                      className="text-gray-700"
                    >
                      <td className="border-b p-2">{test.testname}</td>
                      <td
                        className={`border-b p-2 ${
                          test.status === "Completed"
                            ? "text-green-500"
                            : test.status === "In Progress"
                            ? "text-yellow-500"
                            : "text-red-500"
                        }`}
                      >
                        {test.status}
                      </td>
                      <td className="border-b p-2">
                        {getScoreForTest(test.name)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Archive;
