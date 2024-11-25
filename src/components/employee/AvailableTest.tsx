import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { testData } from "./EmployeeDashboard";
import Layout from "../layout/Layout";

const AvailableTest = () => {
  const [startTest, setStartTest] = useState(false);
  const [currentTestName, setCurrentTestName] = useState("");
  const navigate = useNavigate();
  const availableTest = testData.filter(
    (test) => test.status === "Not Started"
  );
  const handleStartClick = (testName: string) => {
    console.log("testName======", testName);
     setCurrentTestName(testName);
    setStartTest(true);
  };

  const handleStartTest = () => {
    navigate(`/test/${currentTestName}`);
    console.log("start Test");
    setStartTest(false);
  };
  return (
    <Layout>
      <div className="flex h-screen">
        {/* Main Content */}
        <div className="flex-1 p-6">
          <h2 className="text-3xl font-bold text-primaryBlue mb-6">
            Available Tests
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
                    <th className="border-b py-2">Time Remaining</th>
                    <th className="border-b py-2">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {availableTest.map((test) => (
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
                      <td className="border-b py-2">{test.timeRemaining}</td>
                      <td className="border-b py-2">
                        {test.status !== "Completed" && (
                          <FontAwesomeIcon
                            icon={faPlayCircle}
                            onClick={() => handleStartClick(test.name)}
                            className="cursor-pointer text-blue-500 hover:text-blue-600"
                            title="Start or Continue Test"
                            size="lg"
                          />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {startTest && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-sm p-3 bg-white rounded shadow-lg">
            <h2 className="mb-4 text-lg font-normal text-blue-900 text-center">
              Let’s begin! Click ‘Start’ to begin your test journey.
            </h2>

            <div className="flex items-center justify-center space-x-2">
              <button
                onClick={() => setStartTest(false)}
                className="px-4 py-1 text-gray-700 bg-gray-300 hover:bg-primaryBlue hover:text-white rounded-full"
              >
                Cancel
              </button>
              <button
                onClick={handleStartTest}
                className="px-4 py-1 text-gray-700 bg-gray-300 hover:bg-primaryBlue hover:text-white rounded-full"
              >
                Start
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default AvailableTest;
