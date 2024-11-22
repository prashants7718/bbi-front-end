import { faCirclePlay, faCircleStop } from "@fortawesome/free-solid-svg-icons";
import { faChartPie } from "@fortawesome/free-solid-svg-icons/faChartPie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EmployeeSidebar = () => {
  return (
    <div className="flex">
      <div className="fixed top-16 left-0 h-screen w-64 bg-secondaryPink text-primaryBlue shadow-lg">    
        <nav className="mt-4 space-y-2">
          <div className="p-1 mx-4">
            <a  className="block px-4 py-1 bg-lightPink hover:bg-lightPink rounded-md cursor-pointer">
            <FontAwesomeIcon icon={faChartPie} /> <span className="m-2"> Dashboard</span>
            </a>
          </div>
          <div className="p-1 mx-4">
            <a className="block px-4 py-1 bg-lightPink hover:bg-lightPink rounded-md cursor-pointer">
            <FontAwesomeIcon icon={faCirclePlay} /> <span className="m-2">Available Test</span>
            </a>
          </div>
          <div className="p-1 mx-4">
            <a className="block px-4 py-1 bg-lightPink hover:bg-lightPink rounded-md cursor-pointer">
            <FontAwesomeIcon icon={faCircleStop} />  <span className="m-2">Archive</span>
            </a>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default EmployeeSidebar;
