import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Font Awesome component
import { faPlayCircle } from "@fortawesome/free-solid-svg-icons"; // Play Circle icon
import Layout from "../layout/Layout";
import { useNavigate } from "react-router-dom";
 export const testData = [
  { id: 1, name: "ADHD", status: "Not Started", timeRemaining: "5 mins" },
  { id: 2, name: "Autism", status: "Not Started", timeRemaining: "15 mins" },
  { id: 3, name: "Dyslexia", status: "Completed", timeRemaining: "4 mins" },
  { id: 4, name: "Dyscalculia", status: "In Progress", timeRemaining: "5 mins" },
];

const EmployeeDashboard = () => {
  const navigate=useNavigate()
  const statusCounts = {
    "Not Started": testData.filter((test) => test.status === "Not Started").length,
    "In Progress": testData.filter((test) => test.status === "In Progress").length,
    "Completed": testData.filter((test) => test.status === "Completed").length,
  };

  const chartData = {
    labels: ["Not Started", "In Progress", "Completed"],
    datasets: [
      {
        data: Object.values(statusCounts),
        backgroundColor: ["#ffc3e1", "#004c80", "#f88da7"],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
    },
  };

  const handleStartClick = (testName:string) => {
    alert(`Starting or continuing: ${testName}`);
    navigate(`/test/${testName}`)  };

  return (
    <Layout>
      <div className="flex">
        {/* Main Content */}
        <div className="flex-1 p-6">
          <h2 className="text-3xl font-bold text-primaryBlue mb-6">Dashboard</h2>

          {/* Table and Pie Chart Section */}
          <div className="flex space-x-6">
            {/* Table */}
            <div className="flex-1 bg-white p-4 shadow rounded-lg">
              <h3 className="text-xl font-bold text-primaryBlue mb-4">Test Overview</h3>
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
                  {testData.map((test) => (
                    <tr key={test.id} className="text-gray-700 hover:bg-grayBackground">
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

            {/* Pie Chart */}
            <div className="w-1/3 bg-white p-4 shadow rounded-lg">
              <h3 className="text-xl font-bold text-primaryBlue mb-4">Test Status Distribution</h3>
              <Pie data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EmployeeDashboard;
