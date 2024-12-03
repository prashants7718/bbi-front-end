import { faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AssessmentStartDialog from "../../pages/AssessmentStartDialog";
import Layout from "../layout/Layout";
import Popup from "../layout/Popup";
import { getUserTests, updateUserTestStatus } from "../../service/usertestService";

const AvailableTest = ({username}) => {
  console.log(username)
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentTestName, setCurrentTestName] = useState("");
  const [testData, setTestData] = useState<Test[] | null>(null);
  const navigate = useNavigate();
  const handleStartClick = (testName: string) => {
    setCurrentTestName(testName);
    setIsPopupOpen(true);
  };

  const handleStartTest = async() => {
    const result = await updateUserTestStatus(username, currentTestName, "In progress")
    console.log(result)
    navigate(`/employee/test/${currentTestName}`);
    setIsPopupOpen(false);
  };
  const getUserTestData = async () => {
    try {
      const result = await getUserTests(username, "Not started");
      setTestData(result);
      console.log(result)
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
    getUserTestData()
  }, [] )
  return (
    <Layout>
      <div className="flex h-screen">
        <div className="flex-1 p-4">
          <div className="flex space-x-6">
            <div className="flex-1 bg-primaryPink p-5 shadow-xl rounded-lg">
              <h2 className="text-3xl font-bold text-secondaryPink mb-6">
                Available Tests
              </h2>
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
                {testData?.map((test: any) => (
                    <tr
                      key={test._id}
                      className="text-gray-700"
                    >
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
                      <td className="border-b p-2 ">{test.time_remaining.seconds > -1 ? formatTime(test.time_remaining.seconds) : formatTime(300)} mins</td>
                      <td className="border-b p-2 ">
                        {test.status !== "Completed" && (
                          <FontAwesomeIcon
                            icon={faPlayCircle}
                            onClick={() => handleStartClick(test.testname)}
                            className="cursor-pointer text-primaryBlue hover:text-primaryBlue"
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
