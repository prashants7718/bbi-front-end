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
    <Layout>
      <div className="flex flex-col items-center justify-center mt-20">
        <div className="w-full max-w-lg p-6 bg-grayBackground rounded-lg shadow-lg text-center">
          <h1 className="text-4xl font-bold text-primaryBlue mb-6">
            Welcome to BBI
          </h1>
          <div className="flex justify-center space-x-4">
            <button
              className="px-6 py-3 bg-secondaryPink text-white font-semibold rounded-full shadow hover:bg-pink-500"
              onClick={() => handleOpenPopup("login")}
            >
              Login
            </button>
            <button
              className="px-6 py-3 bg-primaryPink text-white font-semibold rounded-full shadow hover:bg-pink-400"
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
