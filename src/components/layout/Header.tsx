import { faCaretDown, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { isAuthenticated } from "../../App";
import ProfileMenu from "../../pages/ProfileMenu";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="px-4 py-4 flex justify-between items-center ml-2 mr-8">
        <div className="flex items-center">
          <button
            onClick={() => navigate("/dashboard")}
            className="focus:outline-none"
          >
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
