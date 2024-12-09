import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import AssessmentStartDialog from "../../pages/AssessmentStartDialog";
import { getSpecificTest } from "../../service/testsService";
import {
  getUserTests,
  updateUserTestStatus,
} from "../../service/userTestService";
import Layout from "../layout/Layout";
import Popup from "../layout/Popup";
import { UserTest } from "../../types/userTest";

const AvailableTest = () => {
  const { userName } = useUserContext();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentTestName, setCurrentTestName] = useState("");
  const [testData, setTestData] = useState<UserTest[] | null>(null);
  const [allocatedTime, setAllocatedTime] = useState(0);
  const navigate = useNavigate();
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
    setIsPopupOpen(false);
  };
  const getUserTestData = async () => {
    try {
      const result = await getUserTests(userName, "Not started");
      setTestData(result);
    } catch (error) {
      console.error("Error fetching user tests:", error);
      setTestData([]);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds}`;
  };

  useEffect(() => {
    getUserTestData();
  }, [userName]);
  return (
    <Layout>
      <div className="flex space-x-6">
        <div className="flex-1 bg-white shadow-bbiCardShadow rounded-lg bb-tbl">
          <div className="heading-text p-4 flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold text-textBlack">
              Available Tests
            </h2>
          </div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-secondaryPink bg-white">
                <th className="border-b p-2">Test Name</th>
                <th className="border-b p-2">Status</th>
                <th className="border-b p-2">Time Remaining</th>
                <th className="border-b p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {testData?.map((test: UserTest) => (
                <tr key={test._id} className="text-gray-700">
                  <td className="border-b p-2">{test.testname}</td>
                  <td
                    className={`border-b p-2  ${
                      test.status === "Completed"
                        ? "text-green-500"
                        : test.status === "In progress"
                        ? "text-yellow-500"
                        : "text-red-500"
                    }`}
                  >
                    {test.status}
                  </td>
                  <td className="border-b p-2 ">
                    {test.time_remaining.seconds > -1
                      ? formatTime(test.time_remaining.seconds)
                      : formatTime(300)}{" "}
                    mins
                  </td>
                  <td className="border-b p-2 ">
                    {test.status !== "Completed" && (
                      <i
                        className="ri-play-circle-fill cursor-pointer text-lg"
                        style={{ color: "#f88da7" }}
                        onClick={() => handleStartClick(test.testname)}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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

export default AvailableTest;
