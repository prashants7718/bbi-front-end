import {
  faChartPie,
  faCirclePlay,
  faCircleStop,
  faUserCircle,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

interface MenuItem {
  label: string;
  href: string;
  icon: JSX.Element;
}

const menuConfig: Record<string, MenuItem[]> = {
  Employee: [
    {
      label: "Dashboard",
      href: "/employee/dashboard",
      icon: <FontAwesomeIcon icon={faChartPie} />,
    },
    {
      label: "Available Test",
      href: "/employee/available-tests",
      icon: <FontAwesomeIcon icon={faCirclePlay} />,
    },
    {
      label: "Archive",
      href: "/employee/archive",
      icon: <FontAwesomeIcon icon={faCircleStop} />,
    },
  ],
  Manager: [
    {
      label: "Dashboard",
      href: "/manager/dashboard",
      icon: <FontAwesomeIcon icon={faChartPie} />,
    },

    {
      label: "Teams",
      href: "/manager/teams",
      icon: <FontAwesomeIcon icon={faUsers} />,
    },
    {
      label: "User Management",
      href: "/manager/user-management",
      icon: <FontAwesomeIcon icon={faUserCircle} />,
    },
  ],
};

const Sidebar: React.FC<{ role: string }> = ({ role }) => {
  const menuItems = menuConfig[role] || [];

  return (
    <div className="h-full w-64 bg-secondaryPink text-primaryBlue shadow-lg flex flex-col">
      <nav className="mt-4 space-y-2 flex-1 overflow-y-auto px-2">
        {menuItems.map((item) => (
          <div key={item.href} className="p-1">
            <Link
              className={`px-4 py-2 bg-lightPink  rounded-md cursor-pointer flex  ${
                location.pathname.includes(item.href)
                  ? "bg-primaryBlue text-white font-semibold"
                  : "text-primaryBlue"
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
