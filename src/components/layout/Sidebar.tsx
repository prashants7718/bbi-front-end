import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartPie, faCirclePlay, faCircleStop, faCogs, faList, faUserCircle, faUsers } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Roles } from "../../constant/enum";

interface MenuItem {
  label: string;
  href: string;
  icon: JSX.Element;
}

const menuConfig: Record<Roles, MenuItem[]> = {
  employee: [
    { label: "Dashboard", href: "/dashboard", icon: <FontAwesomeIcon icon={faChartPie} /> },
    { label: "Available Test", href: "/available-tests", icon: <FontAwesomeIcon icon={faCirclePlay} /> },
    { label: "Archive", href: "/archive", icon: <FontAwesomeIcon icon={faCircleStop} /> },
  ],
  manager: [
    { label: "Dashboard", href: "/dashboard", icon: <FontAwesomeIcon icon={faChartPie} /> },
    { label: "General Settings", href: "/settings", icon: <FontAwesomeIcon icon={faCogs} /> },
    { label: "Teams", href: "/teams", icon: <FontAwesomeIcon icon={faUsers} /> },
    { label: "User Management", href: "/user-management", icon: <FontAwesomeIcon icon={faUserCircle} /> },
    { label: "Test Category", href: "/test-category", icon: <FontAwesomeIcon icon={faList} /> },
    { label: "Questions", href: "/questions", icon: <FontAwesomeIcon icon={faList} /> },
    { label: "Tests", href: "/tests", icon: <FontAwesomeIcon icon={faList} /> },
    { label: "Test Results", href: "/test-results", icon: <FontAwesomeIcon icon={faList} /> },
  ],
};

const Sidebar: React.FC<{ role: Roles }> = ({ role }) => {
  const menuItems = menuConfig[role] || [];

  return (
    <div className="h-full w-64 bg-secondaryPink text-primaryBlue shadow-lg flex flex-col">
      <nav className="mt-4 space-y-2 flex-1 overflow-y-auto px-2">
        {menuItems.map((item) => (
          <div key={item.href} className="p-1">
            <Link
              className={`px-4 py-2 bg-lightPink hover:bg-lightPink rounded-md cursor-pointer flex  ${
              location.pathname.includes(item.href) ? "bg-primaryBlue text-white font-semibold" : "text-primaryBlue"
            }`}
              to={item.href}
            >
              <span>{item.icon}</span>
              <span className="ml-2">{item.label}</span>
            </Link>
          </div>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
