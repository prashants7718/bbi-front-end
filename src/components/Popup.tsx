import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface LoginProps {
  isLoginPopupOpen: boolean;
  setIsLoginPopupOpen: (value: boolean) => void;
  mode: "login" | "signup";
}

const Popup = ({ isLoginPopupOpen, setIsLoginPopupOpen, mode }: LoginProps) => {
  const [formData, setFormData] = useState<Record<string, string>>({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [isDisabled, setIsDisabled] = useState(true);

  const [isSignupSuccess, setIsSignupSuccess] = useState(false);
  const navigate = useNavigate();
  const validateField = (name: string, value: string) => {
    let error = "";
    switch (name) {
      case "email":
        if (!value) {
          error = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = "Please enter a valid email";
        }
        break;
      case "username":
        if (!value) {
          error = "Username is required";
        } else if (value.length < 3) {
          error = "Username must be at least 3 characters long";
        }
        break;
      case "password":
        if (!value) {
          error = "Password is required";
        } else if (mode === "signup") {
          if (value.length < 6) {
            error = "Password must be at least 6 characters";
          } else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])/.test(value)) {
            error = "Password must include letter, number, special character";
          }
        }
        break;
      case "confirmPassword":
        if (mode === "signup" && value !== formData.password) {
          error = "Passwords do not match";
        } else if (!value) {
          error = "Confirm password is required";
        }
        break;
      default:
        break;
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updatedFormData = { ...prev, [name]: value };
      validateForm(updatedFormData);
      validateField(name, value);
      return updatedFormData;
    });
  };

  const handleSubmit = () => {
    if (Object.values(errors).some((error) => error)) {
      return;
    }
    console.log({ mode });
    if (mode === "signup") {
      // setIsLoginPopupOpen(false);
      setIsSignupSuccess(true);
    }
    if (mode === "login") {
      navigate("/home");
    }
    console.log({ formData });
  };

  const validateForm = (data: Record<string, string>) => {
    const requiredFields =
      mode === "signup"
        ? ["email", "username", "password", "confirmPassword"]
        : ["username", "password"];
    const isFormValid = requiredFields.every(
      (field) => data[field]?.trim().length > 0
    );
    setIsDisabled(!isFormValid);
  };
  useEffect(() => {
    console.log({ isDisabled });
  }, [isDisabled]);
  return (
    <div>
      {isLoginPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-sm p-6 bg-white rounded shadow-lg">
            <h2 className="mb-4 text-2xl font-bold text-gray-800 capitalize flex justify-center">
              {mode}
            </h2>

            {mode === "signup" && (
              <div className="mb-4">
                <label className="block mb-1 text-sm font-semibold text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  
                  className={`w-full px-4 py-1 border ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  } rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email}</p>
                )}
              </div>
            )}

            <div className="mb-4">
              <label className="block mb-1 text-sm font-semibold text-gray-700">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username.trim()}
                onChange={handleChange}
                placeholder={
                  mode === "login" ? "Enter your username" : "Create a username"
                }
                 
                className={`w-full px-4 py-1 border ${
                  errors.username ? "border-red-500" : "border-gray-300"
                } rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.username && (
                <p className="text-sm text-red-500">{errors.username}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block mb-1 text-sm font-semibold text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password.trim()}
                onChange={handleChange}
                placeholder={
                  mode === "login" ? "Enter your password" : "Create a password"
                }
                className={`w-full px-4 py-1 border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            {mode === "signup" && (
              <div className="mb-4">
                <label className="block mb-1 text-sm font-semibold text-gray-700">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword.trim()}
                  onChange={handleChange}
                  placeholder="Re-enter your password"
                  className={`w-full px-4 py-1 border ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            )}

            <div className="flex items-center justify-end space-x-2">
              <button
                onClick={() => setIsLoginPopupOpen(false)}
                className="px-4 py-2 text-gray-700 bg-gray-300 hover:bg-primaryBlue hover:text-white rounded-full"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={isDisabled}
                className={`px-4 py-2 rounded-full ${
                  isDisabled
                    ? "bg-gray-300 text-gray-700 cursor-not-allowed"
                    : "bg-primaryBlue text-white hover:bg-primaryBlue"
                }`}
              >
                {mode === "login" ? "Login" : "Sign Up"}
              </button>
            </div>
          </div>
        </div>
      )}
      {isSignupSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-sm p-6 bg-white rounded shadow-lg">
            <h2 className="mb-4 text-2xl font-bold text-gray-800 text-center">
              Sign Up Successful!
            </h2>
            <p className="mb-4 text-gray-700 text-center">
              Please log in to continue.
            </p>
            <div className="flex items-center justify-end space-x-2">
              <button
                onClick={() => {
                  setIsSignupSuccess(false);
                  setIsLoginPopupOpen(false);
                }}
                className="px-4 py-2 text-gray-700 bg-gray-300 hover:bg-primaryBlue hover:text-white rounded-full"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Popup;
