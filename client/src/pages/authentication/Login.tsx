import React, { useState, type ChangeEvent } from "react";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";
import { LuMail } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api/axios";

const initialFieldValues = {
  email: "",
  password: "",
};

const Login = () => {
  const [fieldValues, setFieldValues] = useState(initialFieldValues);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFieldValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLogin =async (e : React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();

    try {
      const response = await api.post(`/login`, fieldValues)
      if(response){
        toast.success(response.data.message);
        navigate("/");
      }
    } catch (error: any) {
      toast.error(error.response?.data.message)
    }
  }

  return (
    <div className="p-8 lg:p-12 flex h-screen w-screen items-center justify-center">
      <div className="w-2xl mx-auto space-y-8">
        <div className="">
          <Link to={"/"}>
            <p className="text-center text-2xl font-semibold mb-4">
              Note Organizer
            </p>
          </Link>
          <p className="text-3xl text-center font-bold text-[var(--color-black-primary)] mb-2">
            Login
          </p>
          <p className="text-[15px] text-center text-[var(--color-black-primary)]">
            Create New Account
          </p>
        </div>
        <form className="space-y-5" onSubmit={handleLogin}>
          <div className="space-y-4">
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
            Sign In
          </button>
          <p className="text-center text-[15px] text-black">
            Don't have an account?
            <Link
              to={"/register"}
              className="font-semibold hover:text-[var(--color-green-primary)] hover:border-b-2 border-[var(--color-green-primary)] transition-colors duration-200"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
