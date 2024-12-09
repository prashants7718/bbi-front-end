import { Link } from "react-router-dom";
import "remixicon/fonts/remixicon.css";

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
      icon: <i className="ri-home-3-line text-lg" />,
    },
    {
      label: "Available Test",
      href: "/employee/available-tests",
      icon: <i className="ri-survey-line text-lg" />,
    },
    {
      label: "Archive",
      href: "/employee/archive",
      icon: <i className="ri-inbox-archive-line text-lg"/>
    },
  ],
  Manager: [
    {
      label: "Dashboard",
      href: "/manager/dashboard",
      icon: <i className="ri-home-3-line text-lg" />,
    },

    {
      label: "Teams",
      href: "/manager/teams",
      icon: <i className="ri-group-line text-lg" />,
    },
    {
      label: "User Management",
      href: "/manager/user-management",
      icon: <i className="ri-user-settings-line text-lg" />,
    },
  ],
};

const Sidebar: React.FC<{ role: string }> = ({ role }) => {
  const menuItems = menuConfig[role] || [];

  return (
    <div className="h-full text-primaryBlue shadow-lg flex flex-col">
      <div className="flex items-center border-b-blueBorder border-b max-h-[70px] h-full">
        <div className="px-5 py-3">
          <button className="focus:outline-none">
            <img src="/logo.png" alt="Logo" className="w-20" />
          </button>
        </div>
      </div>
      <nav className="mt-4 space-y-2 flex-1 overflow-y-auto px-5">
        {menuItems.map((item) => (
          <div key={item.href} className="pt-1 !m-0">
            <Link
              className={`px-4 py-2 text-sm text-white  rounded-md cursor-pointer flex items-center  ${
                location.pathname.includes(item.href)
                  ? "bg-secondaryPink text-textBlue font-normal"
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
