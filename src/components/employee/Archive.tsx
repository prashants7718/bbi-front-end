import Layout from "../layout/Layout";
import Cookies from "js-cookie";

const Archive = ({ testData }) => {
  const archivedTests = testData.filter((test) => test.status === "Completed");

  const getScoreForTest = (testName) => {
    const savedScore = Cookies.get(`${testName}-score`);
    return savedScore ? parseInt(savedScore, 10) : 0;
  };
  return (
    <Layout>
      <div className="flex h-screen">
        <div className="flex-1 p-6">
          <h2 className="text-3xl font-bold text-primaryBlue mb-6">
            Archived Tests
          </h2>
          <div className="flex space-x-6">
            <div className="flex-1 bg-white p-4 shadow rounded-lg">
              <h3 className="text-xl font-bold text-primaryBlue mb-4">
                Test Overview
              </h3>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-primaryBlue">
                    <th className="border-b py-2">Test Name</th>
                    <th className="border-b py-2">Status</th>
                    <th className="border-b py-2">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {archivedTests.map((test) => (
                    <tr
                      key={test.id}
                      className="text-gray-700 hover:bg-grayBackground"
                    >
                      <td className="border-b py-2">{test.name}</td>
                      <td
                        className={`border-b py-2 ${
                          test.status === "Completed"
                            ? "text-green-500"
                            : test.status === "In Progress"
                            ? "text-yellow-500"
                            : "text-red-500"
                        }`}
                      >
                        {test.status}
                      </td>
                      <td className="border-b py-2">
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
