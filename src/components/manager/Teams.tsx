import { Employees } from "../../constant/employees";
import Layout from "../layout/Layout";

const Teams = () => {
  const teamData = Array.from(
    Employees.reduce((acc, emp) => {
      if (!acc.has(emp.Team)) {
        acc.set(emp.Team, 0);
      }
      acc.set(emp.Team, acc.get(emp.Team) + 1);
      return acc;
    }, new Map())
  );
  return (
    <Layout>
      <div className="p-6">
        <h2 className="text-3xl font-bold text-primaryBlue mb-6">Teams</h2>
        {/* <div className="flex space-x-6">
          <div className="flex-1 bg-white p-6 shadow rounded-lg">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-primaryBlue">
                  <th className="border-b p-3">Team</th>
                  <th className="border-b p-3">Members</th>
                </tr>
              </thead>
              <tbody>
                {teamData.map(([team, count]) => (
                  <tr key={team}>
                    <td className="border-b p-3">{team}</td>
                    <td className="border-b p-3">{count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div> */}
      </div>
    </Layout>
  );
};

export default Teams;
