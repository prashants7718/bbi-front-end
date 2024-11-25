import {
  faArrowRightFromBracket,
  faCaretDown,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../../App";
const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };
  const handleLogout = () => {
    Cookies.remove("user"); // Remove the user cookie
    navigate("/");
  };
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-3 px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <img src="/logo.png" alt="Logo" className="w-20" />
        </div>
        {isAuthenticated() && (
          <div className="relative">
            <div
              className="flex space-x-2 cursor-pointer text-pink-300"
              onClick={toggleDropdown}
            >
              <FontAwesomeIcon icon={faUser} />
              <FontAwesomeIcon icon={faCaretDown} />
            </div>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded shadow-lg w-32">
                <button
                  className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  Logout{" "}
                  <FontAwesomeIcon
                    icon={faArrowRightFromBracket}
                    className="ml-2"
                  />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
