import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";
import { login } from "../../service/authService";
import { getUserDetailsFromToken } from "../../utils/getUserRole";
import { Roles } from "../../constant/enum";
import { toast } from "react-toastify";

interface LoginFormProps {
  onClose: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const { handleUser } = useUserContext();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({ username: "", password: "" });
  const [authError, setAuthError] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const validate = () => {
    const newErrors = {
      username: formData.username ? "" : "Username is required",
      password: formData.password ? "" : "Password is required",
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((err) => err);
  };

  const handleSubmit = async () => {
    if (validate()) {
      try {
        const { token } = await login(formData.username, formData.password);
        sessionStorage.setItem("accessToken", token);
        const user = getUserDetailsFromToken();
        handleUser();
        if (user.role === Roles.EMPLOYEE) {
          navigate("/employee/dashboard");
        } else if (user.role === Roles.MANAGER) {
          navigate("/manager/dashboard");
        }
        onClose();
      } catch (error) {
        const errorMessage =
          (error as any) ||
          (error instanceof Error
            ? error.message
            : "An unexpected error occurred");
        toast(errorMessage, {
          position: "top-center",
          autoClose: 3000,
          type: "error",
          theme: "colored",
        });
      }
    }
  };
  return (
    <div className="px-4 bg-white rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-primaryBlue">
        Login
      </h2>
      {authError && (
        <p className="text-center text-sm text-red-500 mb-4">{authError}</p>
      )}
      <div className="flex flex-col gap-4">
        <div>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder={"Enter your username"}
            className="w-full px-4 py-1 mt-1 border border-gray-300 rounded-lg focus:ring-primaryBlue focus:border-primaryBlue"
          />
          {errors.username && (
            <p className="mt-2 text-sm text-red-500">{errors.username}</p>
          )}
        </div>
        <div>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder={"Enter your password"}
            className="w-full px-4 py-1 mt-1 border border-gray-300 rounded-lg focus:ring-primaryBlue focus:border-primaryBlue"
          />
          {errors.password && (
            <p className="mt-2 text-sm text-red-500">{errors.password}</p>
          )}
        </div>
      </div>
      <div className="flex justify-between gap-4 mt-6">
        <button
          onClick={handleSubmit}
          className="w-full py-1 text-white bg-secondaryPink rounded-lg transition"
        >
          Login
        </button>
        <button
          onClick={onClose}
          className="w-full py-1 text-gray-700 bg-gray-100 rounded-lg transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
