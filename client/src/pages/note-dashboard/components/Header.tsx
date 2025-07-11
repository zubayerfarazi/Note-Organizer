import { useEffect, useRef, useState } from "react";
import SearchBar from "./SearchBar";
import { useNavigate } from "react-router-dom";
import { FaBars, FaUser } from "react-icons/fa";
import { RiArrowDropDownLine, RiLogoutCircleLine } from "react-icons/ri";
import { useAuth } from "../../../context/AuthContext";
import api from "../../../api/axios";
import { toast } from "react-toastify";

const Header = ({
  isSidebarOpen,
  setIsSidebarOpen,
}: {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
}) => {
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowUserDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      const response = await api.post(`/logout`);
      if (response) {
        toast.success(response.data.message);
        navigate("/login");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="px-4 py-[9px] border-b border-gray-300">
      <div className="hidden md:flex justify-between items-center">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <div>
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setShowUserDropdown(!showUserDropdown)}
          >
            <FaUser className="text-3xl border border-gray-300 rounded-full p-1" />
            <RiArrowDropDownLine className="text-xl" />
          </div>

          {showUserDropdown && (
            <div
              ref={dropdownRef}
              className="absolute top-15 right-1 bg-white shadow-xl border border-gray-400 p-2"
            >
              <div className="border-b border-gray-400 mb-2">
                <div className="flex items-center gap-1 bg-gray-100 mb-1">
                  <FaUser className="text-3xl border border-gray-300 rounded-full p-1" />
                  <p className="text-[15px] font-semibold text-gray-800">
                    {user?.name}
                  </p>
                </div>
              </div>
              <div
                className="flex items-center gap-2 hover:bg-gray-300 p-2 rounded cursor-pointer"
                onClick={handleLogout}
              >
                <RiLogoutCircleLine />
                <p className="font-semibold">LogOut</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex md:hidden justify-between items-center">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="cursor-pointer"
        >
          <FaBars size={20} />
        </button>

        <div>
          <p className="text-2xl font-bold text-gray-800">Note Organizer</p>
        </div>

        <div>
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setShowUserDropdown(!showUserDropdown)}
          >
            <FaUser className="text-3xl border border-gray-300 rounded-full p-1" />
            <RiArrowDropDownLine className="text-xl" />
          </div>

          {showUserDropdown && (
            <div
              ref={dropdownRef}
              className="absolute top-15 right-1 bg-white shadow-xl border border-gray-400 p-2"
            >
              <div className="border-b border-gray-400 mb-2">
                <div className="flex items-center gap-1 bg-gray-100 mb-1">
                  <FaUser className="text-3xl border border-gray-300 rounded-full p-1" />
                  <p className="text-[15px] font-semibold text-gray-800">
                    {user?.name}
                  </p>
                </div>
              </div>
              <div
                className="flex items-center gap-2 hover:bg-gray-300 p-2 rounded cursor-pointer"
                onClick={handleLogout}
              >
                <RiLogoutCircleLine />
                <p className="font-semibold">LogOut</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
