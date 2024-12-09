import { useEffect, useState } from "react";
import { useUserContext } from "../../context/UserContext";
import { getUserTests } from "../../service/userTestService";
import Layout from "../layout/Layout";
import { UserTest } from "../../types/userTest";

const Archive = () => {
  const { userName } = useUserContext();
  const [testData, setTestData] = useState<UserTest[] | null>(null);

  const getUserTestData = async () => {
    try {
      const result = await getUserTests(userName, "Completed");
      setTestData(result);
    } catch (error) {
      console.error("Error fetching user tests:", error);
      setTestData([]);
    }
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
              Archived Tests
            </h2>
          </div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-secondaryPink bg-white">
                <th className="border-b p-2">Test Name</th>
                <th className="border-b p-2">Status</th>
                <th className="border-b p-2">Score</th>
              </tr>
            </thead>
            <tbody>
              {testData && testData.length > 0 ? (
                testData.map((test) => (
                  <tr key={test._id} className="text-gray-700">
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
                    <td className="border-b p-2">{test.score}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="border-b p-2 text-center text-gray-500">
                    No Records Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Archive;
