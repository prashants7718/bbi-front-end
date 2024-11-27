import { Employees } from "../../constant/employees";
import Layout from "../layout/Layout";

const ManagerDashboard = () => {
  const isTableView = Employees.every((emp) => emp.TestStatus === "Completed");
  return (
    <Layout>
      <div className="flex-1 p-6">
        <h2 className="text-3xl font-bold text-primaryBlue mb-6">Dashboard</h2>
        {!isTableView ? (
          <div className="flex space-x-6">
            <div className="flex-1 bg-white p-6 shadow rounded-lg">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-primaryBlue">
                    <th className="border-b p-3"></th>
                    <th className="border-b p-3">Name</th>
                    <th className="border-b p-3">Test Status</th>
                    <th className="border-b p-3">Role</th>
                    <th className="border-b p-3">Job Title</th>
                  </tr>
                </thead>
                <tbody>
                  {Employees.map((employee) => (
                    <tr key={employee.Name} className="hover:bg-gray-50">
                      <td className="border-b p-3">
                        <input
                          type="checkbox"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                        />
                      </td>
                      <td className="border-b p-3">{employee.Name}</td>
                      <td
                        className={`border-b p-3 ${
                          employee.TestStatus === "Completed"
                            ? "text-green-500"
                            : employee.TestStatus === "In Progress"
                            ? "text-yellow-500"
                            : "text-red-500"
                        }`}
                      >
                        {employee.TestStatus}
                      </td>
                      <td className="border-b p-3">{employee.Role}</td>
                      <td className="border-b p-3">{employee.JobTitle}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-gray-500 text-center text-lg mt-28 ">
            Table will be visible when all employees complete the test.
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ManagerDashboard;
