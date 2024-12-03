import { faCaretDown, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileMenu from "../../pages/ProfileMenu";
import { isAuthenticated } from "../../utils/authentication";
import { getUserDetailsFromToken } from "../../utils/getUserRole";
const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };
  const user = getUserDetailsFromToken();
  const handleNavigation = () => {
    if (user.role === "Employee") {
      navigate("/employee/dashboard");
    } else if (user.role === "Manager") {
      navigate("/manager/dashboard");
    }
  };
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="px-4 py-4 flex justify-between items-center ml-2 mr-8">
        <div className="flex items-center">
          <button onClick={handleNavigation} className="focus:outline-none">
            <img src="/logo.png" alt="Logo" className="w-20" />
          </button>
        </div>
        {isAuthenticated() && (
          <div className="relative">
            <button
              className="flex space-x-2 text-pink-300"
              onClick={toggleDropdown}
            >
              <FontAwesomeIcon icon={faUser} />
              <FontAwesomeIcon icon={faCaretDown} />
            </button>
            {isDropdownOpen && <ProfileMenu />}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
