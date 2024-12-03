import {
  faArrowRightFromBracket,
  faGear,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

const ProfileMenu = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    window.sessionStorage.removeItem("accessToken");
    navigate("/");
  };
  const handleSettings = () => {
    navigate("/settings");
  };
  return (
    <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg  w-32 flex flex-col">
      <button
        className="w-full px-4 py-2 flex items-center justify-between border-b border-gray-200 text-primaryBlue"
        onClick={handleLogout}
      >
        <span>Logout</span>
        <FontAwesomeIcon icon={faArrowRightFromBracket} />
      </button>
      <button
        className="w-full px-4 py-2 flex items-center justify-between text-primaryBlue"
        onClick={handleSettings}
      >
        <span>Settings</span>
        <FontAwesomeIcon icon={faGear} />
      </button>
    </div>
  );
};

export default ProfileMenu;
