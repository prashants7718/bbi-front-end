import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../service/authService";
import { Roles } from "../../constant/enum";
import { useUserContext } from "../../context/UserContext";
import { getUserDetailsFromToken } from "../../utils/getUserRole";
import { toast } from "react-toastify";

interface SignupFormProps {
  onClose?: () => void;
  invitationData?: {
    email: string;
    company: string;
    team: string;
    role: string;
  };
}

const SignupForm: React.FC<SignupFormProps> = ({ onClose, invitationData }) => {
  const navigate = useNavigate();
  const { userName, handleUser } = useUserContext();
  const [formData, setFormData] = useState({
    email: invitationData?.email ?? "",
    username: "",
    password: "",
    confirmPassword: "",
    company: invitationData?.company ?? "",
    jobTitle: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    jobTitle: "",
  });
  useEffect(() => {
    if (invitationData) {
      setFormData((prev) => ({
        ...prev,
        email: invitationData.email,
        company: invitationData.company,
      }));
    }
  }, [invitationData]);

  useEffect(() => {}, [userName]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleCancel = () => {
    if (location.pathname === "/") {
      onClose?.();
    } else {
      navigate("/");
    }
  };

  const validate = () => {
    const newErrors = {
      email: formData.email.includes("@") ? "" : "Valid email is required",
      username: formData.username ? "" : "Username is required",
      password:
        formData.password.length >= 6
          ? ""
          : "Password must be at least 6 characters",
      confirmPassword:
        formData.confirmPassword === formData.password
          ? ""
          : "Passwords do not match",
      // jobTitle: formData.jobTitle ? "" : "Job title is required",
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((err) => err);
  };

  const handleSubmit = async () => {
    if (validate()) {
      const userData = {
        email: formData.email,
        username: formData.username,
        password: formData.password,
        company: formData.company,
        jobTitle: formData.jobTitle,
      };
      try {
        const response = await signUp(userData);
        sessionStorage.setItem("accessToken", response.token);
        const user = getUserDetailsFromToken();
        handleUser();
        if (user.role === Roles.MANAGER) {
          navigate("/manager/dashboard");
        } else if (user.role === Roles.EMPLOYEE) {
          navigate("/employee/dashboard");
        }
        onClose?.();
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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-80 max-w-sm p-6 bg-white rounded shadow-lg pr ">
        <h2 className="text-3xl font-bold mb-6 text-center text-primaryBlue">
          Sign Up
        </h2>

        <div className="flex flex-col gap-6">
          <div>
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                readOnly={!!invitationData}
                className={`w-full px-4 py-1 h-9 border text-sm ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>
            {errors.email && (
              <div className="mt-1 text-xs font-medium text-red-500  ">
                {errors.email}
              </div>
            )}
          </div>

          <div>
            <input
              type="text"
              name="username"
              value={formData.username?.trim()}
              onChange={handleChange}
              placeholder={"Create a username"}
              className={`w-full px-4 py-1 h-9 border text-sm ${
                errors.username ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.username && (
              <p className="mt-1 text-xs text-red-500 ml-2">
                {errors.username}
              </p>
            )}
          </div>

          <div>
            <input
              type="password"
              name="password"
              value={formData.password?.trim()}
              onChange={handleChange}
              placeholder={"Create a password"}
              className={`w-full px-4 py-1 h-9 border text-sm ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-500 ml-2 w-full  ">
                {errors.password}
              </p>
            )}
          </div>
          <div>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword?.trim()}
              onChange={handleChange}
              placeholder="Re-enter your password"
              className={`w-full px-4 py-1 h-9 border text-sm ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-red-500 ml-2 w-full  ">
                {errors.confirmPassword}
              </p>
            )}
          </div>
          <div>
            <input
              type="text"
              name="company"
              value={formData.company?.trim()}
              onChange={handleChange}
              placeholder={"Enter your company name"}
              readOnly={!!invitationData}
              className={`w-full px-4 py-1 h-9 border text-sm ${
                errors.username ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>
          {invitationData && invitationData.role && (
            <div>
              <input
                type="text"
                name="jobTitle"
                value={formData.jobTitle.trim()}
                onChange={handleChange}
                placeholder={"Enter your Job Title"}
                className={`w-full px-4 py-1 h-9 border text-sm ${
                  errors.username ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>
          )}
        </div>
        <div className="flex justify-between gap-4 mt-6 ">
          <button
            onClick={handleSubmit}
            className="w-44 py-1 text-white bg-secondaryPink rounded-lg hover:bg-pink-600 transition"
          >
            Sign Up
          </button>
          <button
            onClick={handleCancel}
            className="w-44 py-1 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
