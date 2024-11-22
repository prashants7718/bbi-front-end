import { useState } from "react";
import Popup from "../components/Popup";

const Home = () => {
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [mode, setMode] = useState<"login" | "signup">("login");

  const handleLogin = () => {
    setMode("login")
    setIsLoginPopupOpen(true);
  };
const  handleSignup=()=>{
  setMode('signup')
  setIsLoginPopupOpen(true)
}

  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-lg ">
        <h1 className="text-4xl font-bold text-[#004c80] text-center mb-6">
          Welcome to BBI
        </h1>
        <div className="flex justify-center space-x-6">
          <button
            className="px-6 py-3 text-white bg-[#f88da7] hover:bg-[#ff647f] font-semibold rounded-full shadow transition duration-300"
            onClick={handleLogin}
          >
            Login
          </button>
          <button className="px-6 py-3 text-white bg-[#ffc3e1] hover:bg-[#ff94c2] font-semibold rounded-full shadow transition duration-300" onClick={ handleSignup}>
            Sign Up
          </button>
        </div>
      </div>
      {isLoginPopupOpen && (
        <Popup
          isLoginPopupOpen={isLoginPopupOpen}
          setIsLoginPopupOpen={setIsLoginPopupOpen}
          mode={mode}
        />
      )}
    </div>
  );
};

export default Home;
