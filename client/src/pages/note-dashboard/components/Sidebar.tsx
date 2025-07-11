import { useEffect, useState } from "react";
import Modal from "../../../component/modal/Modal";
import NewCategoryFrom from "./NewCategoryFrom";
import api from "../../../api/axios";
import { toast } from "react-toastify";

const Sidebar = ({
  onCategorySelect,
  selectedCategory,
  isSidebarOpen,
  setIsSidebarOpen,
}: any) => {
  const [categories, setCategories] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const getCategories = async () => {
    try {
      const response = await api.get("/categories");
      setCategories(response.data.payload.categories);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSortOption(value);
    // @ts-ignore
    let sortedCategories = [...categories];

    if (value === "az") {
      // @ts-ignore
      sortedCategories.sort((a, b) => a.name.localeCompare(b.name));
    } else if (value === "za") {
      // @ts-ignore
      sortedCategories.sort((a, b) => b.name.localeCompare(a.name));
    }

    setCategories(sortedCategories);
  };

  return (
    <>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-[#000000b6] bg-opacity-30 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      <div className={`fixed md:static z-50 md:z-0 w-[260px] min-h-screen bg-white border-r border-gray-300 shadow-md transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>
        <div className="border-b border-gray-300 p-1">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-800">Note Organizer</p>
            <p className="text-sm text-gray-500">For Headless Limited</p>
          </div>
        </div>

        <div className="overflow-y-auto px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <p className="text-lg font-semibold text-gray-700">Categories</p>
            <button
              title="Add Category"
              className="text-xs font-medium border border-gray-800 px-3 py-1 rounded-md hover:bg-gray-800 hover:text-white transition cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            >
              Add
            </button>
          </div>

          <div className="mb-4">
            <select
              name="sort"
              value={sortOption}
              onChange={handleSortChange}
              className="text-sm border border-gray-400 rounded-md px-3 py-2 w-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              <option value="">Sort by Recent</option>
              <option value="az">Name (A-Z)</option>
              <option value="za">Name (Z-A)</option>
            </select>
          </div>

          <ul className="space-y-2">
            <li
              key="all-notes"
              className={`text-sm font-medium flex items-center justify-between px-3 py-2 rounded-md cursor-pointer transition-all duration-200 list-none ${
                selectedCategory === null
                  ? "bg-gray-300 text-gray-900"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
              onClick={() => {
                onCategorySelect(null);
                setIsSidebarOpen(false);
              }}
            >
              <span>All Categories</span>
              <span className="text-xs bg-gray-200 px-2 py-0.5 rounded-full">
                {categories.length}
              </span>
            </li>

            {categories.map((cat: any) => (
              <li
                key={cat._id}
                className={`text-sm font-medium px-3 py-2 rounded-md cursor-pointer transition-all duration-200 capitalize list-none ${
                  selectedCategory === cat._id
                    ? "bg-gray-300 text-gray-900"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
                onClick={() => {
                  onCategorySelect(cat._id);
                  setIsSidebarOpen(false);
                }}
              >
                {cat.name}
              </li>
            ))}
          </ul>
        </div>
      </div>

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
