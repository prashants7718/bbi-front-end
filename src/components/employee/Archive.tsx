import Layout from "../layout/Layout";
import { testData } from "./EmployeeDashboard";

const Archive = () => {
  const archivedTests = testData.filter((test) => test.status === "Completed");
  return (
    <Layout>
      <div className="flex h-screen">
        {/* Main Content */}
        <div className="flex-1 p-6">
          <h2 className="text-3xl font-bold text-primaryBlue mb-6">
            Archived Tests
          </h2>

          {/* Table and Pie Chart Section */}
          <div className="flex space-x-6">
            {/* Table */}
            <div className="flex-1 bg-white p-4 shadow rounded-lg">
              <h3 className="text-xl font-bold text-primaryBlue mb-4">
                Test Overview
              </h3>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-primaryBlue">
                    <th className="border-b py-2">Test Name</th>
                    <th className="border-b py-2">Status</th>
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
                      {/* <td className="border-b py-2">
                      {test.status !== "Completed" && (
                        <FontAwesomeIcon
                          icon={faPlayCircle}
                          onClick={() => handleStartClick(test)}
                          className="cursor-pointer text-blue-500 hover:text-blue-600"
                          title="Start or Continue Test"
                          size="lg"
                        />
                      )}
                    </td> */}
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
