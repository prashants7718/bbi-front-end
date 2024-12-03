import { faPlayCircle } from "@fortawesome/free-solid-svg-icons"; // Play Circle icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Font Awesome component
import "chart.js/auto";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AssessmentStartDialog from "../../pages/AssessmentStartDialog";
import Layout from "../layout/Layout";
import Popup from "../layout/Popup";
import { TestItem } from "../../App";
import { getAllUserTests, updateUserTestStatus } from "../../service/usertestService";

const EmployeeDashboard = ({ username }) => {
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
  const [userTestData, setUserTestData] = useState<Test[] | null>(null);
  const getUserTestsDetails = async () => {
    const result = await getAllUserTests(username);
    setUserTestData(result)
  }
  const handleStartClick = (testName: string) => {
    setCurrentTestName(testName);
    setIsPopupOpen(true);
  };

  const handleStartTest = async() => {
    const result = await updateUserTestStatus(username, currentTestName, "In progress")
    console.log(result)
    navigate(`/employee/test/${currentTestName}`);
  };
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds}`;
  };

  useEffect(() => {
    getUserTestsDetails()
  }, [])
  return (
    <Layout>
        {/* Main Content */}
        <div className="flex-1 p-4">
        <div className="flex space-x-6">
          <div className="flex-1 bg-primaryPink p-5 shadow-xl rounded-lg ">
            <h2 className="text-3xl font-bold text-secondaryPink mb-6">
              Dashboard
            </h2>
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="text-secondaryPink bg-white">
                  <th className="border-b p-2">Test Name</th>
                  <th className="border-b p-2">Status</th>
                  <th className="border-b p-2">Time Remaining</th>
                  <th className="border-b p-2">Action</th>
                </tr>
              </thead>
                <tbody>
                  {userTestData?.map((test: TestItem) => (
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
                      <td className="border-b p-2">{test.status !== 'Completed'
                                        ? (test?.time_remaining?.seconds > -1 ? `${formatTime(test?.time_remaining?.seconds)} mins`
                                        : `${formatTime(300)} mins`) : '-'}
                      </td>
                      <td className="border-b p-2">
                        {test.status !== "Completed" ? (
                          <FontAwesomeIcon
                            icon={faPlayCircle}
                            onClick={() => handleStartClick(test.testname)}
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
