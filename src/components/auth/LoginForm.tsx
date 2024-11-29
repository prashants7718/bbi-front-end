import React, { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { login } from "../../service/authService";

interface LoginFormProps {
  onClose: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({ username: "", password: "" });

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

  const handleSubmit = () => {
    if (validate()) {
      // const userData = {
      //   username: formData.username,
      // };
      // Cookies.set("user", JSON.stringify(userData), { expires: 7 });
      handleLogin();
      navigate("/dashboard");
      // alert("Logged in successfully!");
      onClose();
    }
  };
  const handleLogin = async () => {
    console.log("in Login handler");
    try {
      const { token } = await login(formData.username, formData.password);
      sessionStorage.setItem("accessToken", token);
      // window.location.href = "/dashboard";
      navigate("/dashboard");
    } catch (err: any) {
      console.log("error", err);
    }
  };
  return (
    <div className="px-4 bg-white rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-primaryBlue">
        Login
      </h2>
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
          className="w-full py-1 text-white bg-secondaryPink rounded-lg hover:bg-pink-600 transition"
        >
          Login
        </button>
        <button
          onClick={onClose}
          className="w-full py-1 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
