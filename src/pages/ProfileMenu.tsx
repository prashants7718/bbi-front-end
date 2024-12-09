import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

const ProfileMenu = () => {
  const navigate = useNavigate();
  const { setUserDetails } = useUserContext();
  const handleLogout = async () => {
    async function logOut(): Promise<string> {
      return new Promise((myResolve) => {
        window.sessionStorage.removeItem("accessToken");
        setUserDetails(null, null);
        myResolve("ok");
      });
    }
    await logOut();
    navigate("/");
  };
  const handleSettings = () => {
    navigate("/settings");
  };
  return (
    <div className="absolute right-0 mt-5 bg-white border border-gray-200 rounded-xl shadow-lg  w-48 flex flex-col">
      <button
        className="w-full px-4 py-3 text-sm flex items-center border-b gap-2 border-gray-200 text-primaryBlue"
        onClick={handleSettings}
      >
        <i className="ri-settings-line" />
        <span>Settings</span>
      </button>
      <button
        className="w-full px-4 py-3 text-sm flex items-center gap-2 text-primaryBlue"
        onClick={handleLogout}
      >
        <i className="ri-logout-circle-r-line" />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default ProfileMenu;
