import { useState } from "react";
import Popup from "../components/layout/Popup";
import LoginForm from "../components/auth/LoginForm";
import SignupForm from "../components/auth/SignupForm";
import Layout from "../components/layout/Layout";

const Home = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMode, setPopupMode] = useState<"login" | "signup">("login");

  const handleOpenPopup = (mode: "login" | "signup") => {
    setPopupMode(mode);
    setIsPopupOpen(true);
  };

  return (
    <Layout isHomePage>
      <div className="flex flex-col items-center justify-center mt-20">
        <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg text-center">
          <h1 className="text-4xl font-normal text-textBlack mb-6">
            Welcome to BBI
          </h1>
          <div className="flex justify-center space-x-4">
            <button
              className="px-4 py-2 bg-secondaryPink text-textGray font-semibold rounded-full shadow cursor-pointer"
              onClick={() => handleOpenPopup("login")}
            >
              Login
            </button>
            <button
              className="px-4 py-2 bg-secondaryPink text-textGray font-semibold rounded-full shadow cursor-pointer"
              onClick={() => handleOpenPopup("signup")}
            >
              Sign Up
            </button>
          </div>
        </div>
        <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
          {popupMode === "login" ? (
            <LoginForm onClose={() => setIsPopupOpen(false)} />
          ) : (
            <SignupForm onClose={() => setIsPopupOpen(false)} />
          )}
        </Popup>
      </div>
    </Layout>
  );
};

export default Home;
