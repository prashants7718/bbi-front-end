import React, { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";


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
      const userData = {
        username: formData.username,
      };
      Cookies.set("user", JSON.stringify(userData), { expires: 7 });
      navigate('/dashboard');
      // alert("Logged in successfully!");
      onClose();
    }
  };

  return (
    <div className="px-4 bg-white rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-primaryBlue">Login</h2>
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700">Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-primaryBlue focus:border-primaryBlue"
        />
        {errors.username && <p className="mt-2 text-sm text-red-500">{errors.username}</p>}
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:ring-primaryBlue focus:border-primaryBlue"
        />
        {errors.password && <p className="mt-2 text-sm text-red-500">{errors.password}</p>}
      </div>
      <div className="flex justify-between">
        <button
          onClick={handleSubmit}
          className="w-[48%] py-3 text-white bg-secondaryPink rounded-lg hover:bg-pink-600 transition"
        >
          Login
        </button>
        <button
          onClick={onClose}
          className="w-[48%] py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
