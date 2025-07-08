import { useEffect, useState } from "react";
import Modal from "./Modal";
import NewCategoryFrom from "./NewCategoryFrom";
import api from "../../../api/axios";
import { toast } from "react-toastify";
import { FaBars, FaTimes } from "react-icons/fa";

const Sidebar = ({ onCategorySelect }) => {
  const [categories, setCategories] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // For mobile

  const getCategories = async () => {
    try {
      const response = await api.get("/categories");
      setCategories(response.data.payload.categories);
    } catch (error) {
      toast.error("Failed to fetch categories");
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSortOption(value);
    let sortedCategories = [...categories];

    if (value === "az") {
      sortedCategories.sort((a, b) => a.name.localeCompare(b.name));
    } else if (value === "za") {
      sortedCategories.sort((a, b) => b.name.localeCompare(a.name));
    }

    setCategories(sortedCategories);
  };

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white shadow-md flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 rounded bg-blue-600 text-white shadow hover:bg-blue-700 focus:outline-none"
          >
            <FaBars size={20} />
          </button>
          <p className="text-lg font-semibold text-gray-800">Categories</p>
        </div>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-[#000000b6] z-40 md:hidden"
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-full w-[260px] bg-white z-50 
          transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:relative md:translate-x-0 md:block
        `}
      >
        {/* Mobile Close */}
        <div className="flex items-center justify-between md:hidden p-4 border-b">
          <p className="text-lg font-semibold">Categories</p>
          <button onClick={() => setIsSidebarOpen(false)}>
            <FaTimes size={20} />
          </button>
        </div>

        {/* Sidebar Content */}
        <aside className="p-4 overflow-y-auto h-full mt-16 md:mt-0">
          {/* Desktop Header */}
          <div className="hidden md:flex items-center justify-between text-lg font-semibold mb-4">
            <p>Categories</p>
            <button
              className="text-sm bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700"
              onClick={() => setIsModalOpen(true)}
            >
              + Add
            </button>
          </div>

          {/* Mobile Add Button */}
          <div className="md:hidden mb-4 space-y-3">
            <button
              className="w-full bg-blue-600 text-white py-2 rounded text-sm font-medium hover:bg-blue-700"
              onClick={() => setIsModalOpen(true)}
            >
              + Add Category
            </button>
          </div>

          {/* Sort Dropdown */}
          <div className="w-full mb-4">
            <label className="block text-sm text-gray-600 mb-1">Sort By</label>
            <select
              name="sort"
              value={sortOption}
              onChange={handleSortChange}
              className="text-sm border rounded px-2 py-[6px] w-full focus:outline-none focus:ring focus:ring-blue-300"
            >
              <option value="">Recent</option>
              <option value="az">Name (A-Z)</option>
              <option value="za">Name (Z-A)</option>
            </select>
          </div>

          {/* Category List */}
          <ul className="space-y-2">
            <li
              key="all-notes"
              className="text-gray-700 hover:bg-blue-100 rounded-md px-2 py-1 cursor-pointer transition"
              onClick={() => {
                onCategorySelect(null);
                setIsSidebarOpen(false);
              }}
            >
              All Notes
            </li>

            {categories.map((cat) => (
              <li
                key={cat._id}
                className="text-gray-700 hover:bg-blue-100 rounded-md px-2 py-1 cursor-pointer transition"
                onClick={() => {
                  onCategorySelect(cat._id);
                  setIsSidebarOpen(false);
                }}
              >
                {cat.name}
              </li>
            ))}
          </ul>
        </aside>
      </div>

      {/* Category Modal */}
      <Modal
        title="Create New Category"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <NewCategoryFrom
          onClose={() => setIsModalOpen(false)}
          refreshCategories={getCategories}
        />
      </Modal>
    </>
  );
};

export default Sidebar;
