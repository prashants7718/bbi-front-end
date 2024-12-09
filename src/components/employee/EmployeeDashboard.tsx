import "chart.js/auto";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import AssessmentStartDialog from "../../pages/AssessmentStartDialog";
import { getSpecificTest } from "../../service/testsService";
import {
  getAllUserTests,
  updateUserTestStatus,
} from "../../service/userTestService";
import Layout from "../layout/Layout";
import Popup from "../layout/Popup";
import { UserTest } from "../../types/userTest";

const EmployeeDashboard = () => {
  const { userName } = useUserContext();
  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentTestName, setCurrentTestName] = useState("");
  const [userTestData, setUserTestData] = useState<UserTest[] | null>(null);
  const [allocatedTime, setAllocatedTime] = useState(0);
  const getUserTestsDetails = async () => {
    const result = await getAllUserTests(userName);
    setUserTestData(result);
  };
  const handleStartClick = (testName: string) => {
    setCurrentTestName(testName);
    setIsPopupOpen(true);
  };

  const handleStartTest = async () => {
    await updateUserTestStatus(userName, currentTestName, "In progress");
    const response = await getSpecificTest(currentTestName);
    setAllocatedTime(response.allocated_time);
    navigate(`/employee/test/${currentTestName}`, {
      state: { allocatedTime: response.allocated_time },
    });
  };
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds}`;
  };

  useEffect(() => {
    getUserTestsDetails();
  }, [userName]);

  return (
    <Layout>
      <div>
        <div className="flex space-x-6">
          <div className="flex-1 bg-white shadow-bbiCardShadow rounded-lg bb-tbl">
            <div className="heading-text p-4 flex items-center justify-between gap-4">
              <h2 className="text-xl font-semibold text-textBlack">
                Dashboard
              </h2>
            </div>
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="text-secondaryPink bg-white">
                  <th className="border-b p-2">Test Name</th>
                  <th className="border-b p-2">Status</th>
                  <th className="border-b p-2">Time Remaining</th>
                  <th className="border-b p-2 w-40 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {userTestData?.map((test: UserTest) => (
                  <tr key={test._id} className="text-gray-700">
                    <td className="border-b p-2">{test.testname}</td>
                    <td
                      className={`border-b p-2 status-column ${
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
                      {test.status !== "Completed"
                        ? test?.time_remaining?.seconds > -1
                          ? `${formatTime(test?.time_remaining?.seconds)} mins`
                          : `${formatTime(300)} mins`
                        : "-"}
                    </td>
                    <td className="border-b p-2 w-40 text-center">
                      {test.status !== "Completed" ? (
                        <i
                          className="ri-play-circle-fill cursor-pointer text-lg"
                          style={{ color: "#f88da7" }}
                          onClick={() => handleStartClick(test.testname)}
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
