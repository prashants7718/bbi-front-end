import { faPlayCircle } from "@fortawesome/free-solid-svg-icons"; // Play Circle icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Font Awesome component
import "chart.js/auto";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AssessmentStartDialog from "../../pages/AssessmentStartDialog";
import Layout from "../layout/Layout";
import Popup from "../layout/Popup";
import { TestItem } from "../../App";

const EmployeeDashboard = ({ testData }) => {
  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  // const statusCounts = {
  //   "Not Started": testData.filter((test) => test.status === "Not Started")
  //     .length,
  //   "In Progress": testData.filter((test) => test.status === "In Progress")
  //     .length,
  //   Completed: testData.filter((test) => test.status === "Completed").length,
  // };
  const [currentTestName, setCurrentTestName] = useState("");
  // const chartData = {
  //   labels: ["Not Started", "In Progress", "Completed"],
  //   datasets: [
  //     {
  //       data: Object.values(statusCounts),
  //       backgroundColor: ["#ffc3e1", "#004c80", "#f88da7"],
  //       borderWidth: 1,
  //     },
  //   ],
  // };

  // const chartOptions = {
  //   plugins: {
  //     legend: {
  //       labels: {
  //         usePointStyle: true,
  //         pointStyle: "circle",
  //       },
  //     },
  //   },
  // };

  const handleStartClick = (testName: string) => {
    setCurrentTestName(testName);
    setIsPopupOpen(true);
  };

  const handleStartTest = () => {
    navigate(`/test/${currentTestName}`);
  };
  return (
    <Layout>
      <div className="flex">
        {/* Main Content */}
        <div className="flex-1 p-6">
          <h2 className="text-3xl font-bold text-primaryBlue mb-6">
            Dashboard
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
                  {testData.map((test: TestItem) => (
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
                        {test.status !== "Completed" ? (
                          <FontAwesomeIcon
                            icon={faPlayCircle}
                            onClick={() => handleStartClick(test.name)}
                            className="cursor-pointer text-primaryBlue hover:text-primaryBlue"
                            title="Start or Continue Test"
                            size="lg"
                          />
                        ) : (
                          <div className="ml-1">-</div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pie Chart */}
            {/* <div className="w-1/3 bg-white p-4 shadow rounded-lg">
              <h3 className="text-xl font-bold text-primaryBlue mb-4">Test Status Distribution</h3>
              <Pie data={chartData} options={chartOptions} />
            </div> */}
          </div>
        </div>
      </div>
      <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
        <AssessmentStartDialog
          handleStartTest={handleStartTest}
          onClose={() => setIsPopupOpen(false)}
        />
      </Popup>
    </Layout>
  );
};

export default EmployeeDashboard;
