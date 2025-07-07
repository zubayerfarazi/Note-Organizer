import React, { useState, type ChangeEvent } from "react";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";
import { FiUser } from "react-icons/fi";
import { LuMail } from "react-icons/lu";
import { Link } from "react-router-dom";
import api from "../../api/axios";
import { toast } from "react-toastify";

const initialFieldValues = {
  name: "",
  email: "",
  password: "",
};

// const requiredFields = {
//   {key: "name", value: "name", label: text},
//   { key: "email", value: "email", label: "text" },
// 	{ key: "password", value: "password", label: "text" },
// }

const Register = () => {
  const [fieldValues, setFieldValues] = useState(initialFieldValues);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFieldValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await api.post(`process-register`, fieldValues);
      if (response) {
        toast.success(response.data.message);
        setIsLoading(false);
      }
    } catch (err: any) {
      toast.error(err.response?.data.message);
    }
  };

  return (
    <div className="p-8 lg:p-12 flex h-screen w-screen items-center justify-center">
      <div className="w-2xl mx-auto space-y-8">
        <div className="">
          <Link to={"/"}>
            <p className="text-center text-2xl font-semibold mb-4">
              Note Organizer
            </p>
          </Link>
          <h1 className="text-3xl text-center font-bold text-[var(--color-black-primary)] mb-2">
            Registration
          </h1>
          <p className="text-[15px] text-center text-[var(--color-black-primary)]">
            Create New Account
          </p>
        </div>
        <form className="space-y-5" onSubmit={handleRegister}>
          <div className="space-y-4">
            <div>
              <label className="block mb-1.5">
                <span className="text-[14px] font-bold text-[var(--color-green-primary)]">
                  Name
                </span>
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative group">
                <input
                  type="text"
                  name="name"
                  value={fieldValues.name}
                  onChange={handleChange}
                  className="w-full bg-white text-[#212b36] px-4 py-2 border border-black rounded-lg focus:outline-none focus:border-[var(--color-primary)] transition-all duration-200"
                  required
                />
                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none transition-colors duration-200">
                  <FiUser className="h-5 w-5" />
                </div>
              </div>
            </div>

            <div>
              <label className="block mb-1.5">
                <span className="text-[14px] font-bold text-[var(--color-green-primary)]">
                  Email
                </span>
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative group">
                <input
                  type="email"
                  name="email"
                  value={fieldValues.email}
                  onChange={handleChange}
                  className="w-full bg-white text-[#212b36] px-4 py-2 border border-black rounded-lg focus:outline-none focus:border-[var(--color-primary)] transition-all duration-200"
                  required
                />
                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none transition-colors duration-200">
                  <LuMail className="h-5 w-5" />
                </div>
              </div>
            </div>
            <div>
              <label className="block mb-1.5">
                <span className="text-[14px] font-bold text-[var(--color-green-primary)]">
                  Password
                </span>
                <span className="text-red-500 ml-1">*</span>
              </label>
              <div className="relative group">
                <input
                  name="password"
                  value={fieldValues.password}
                  onChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  className="w-full bg-white text-[#212b36] px-4 py-2 border border-black rounded-lg focus:outline-none focus:border-[#064490] transition-all duration-200"
                  required
                />
                <div
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer  transition-colors duration-200 border-l pl-2 border-gray-200"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <BiSolidShow className="h-5 w-5  hover:text-gray-700" />
                  ) : (
                    <BiSolidHide className="h-5 w-5  hover:text-gray-700" />
                  )}
                </div>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg font-bold cursor-pointer"
          >
            {isLoading ? "Loading": "Sign In"}
          </button>
          <p className="text-center text-[15px] text-black">
            Already have an account?
            <Link
              to={"/login"}
              className="font-semibold hover:text-[var(--color-green-primary)] hover:border-b-2 border-[var(--color-green-primary)] transition-colors duration-200"
            >
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
