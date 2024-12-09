import { useState } from "react";
import { useLocation } from "react-router-dom";
import ProfileMenu from "../../pages/ProfileMenu";
import { isAuthenticated } from "../../utils/authentication";

interface HeaderProps {
  showLogo?: boolean; // Optional prop to show the logo
}

const Header: React.FC<HeaderProps> = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <header className="bg-white shadow-bbiHeaderShadow sticky top-0 z-50 max-h-[70px] h-full flex items-center py-4 px-6">
      {location.pathname === "/" && (
        <button className="focus:outline-none">
          <img src="/logo.png" alt="Logo" className="w-20" />
        </button>
      )}
      <div className="flex justify-end items-center ml-auto">
        {isAuthenticated() && (
          <div className="relative">
            <button
              className="flex space-x-1 text-secondaryPink"
              onClick={toggleDropdown}
            >
              <i className="ri-user-line" style={{ fontSize: "20px" }}></i>

              <i
                className="ri-arrow-down-s-fill"
                style={{ fontSize: "20px" }}
              ></i>
            </button>
            {isDropdownOpen && <ProfileMenu />}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
