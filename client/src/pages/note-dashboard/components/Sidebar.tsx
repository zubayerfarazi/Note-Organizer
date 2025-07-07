import { useEffect, useState } from "react";
import Modal from "./Modal";
import NewCategoryFrom from "./NewCategoryFrom";
import api from "../../../api/axios";
import { toast } from "react-toastify";

const Sidebar = ({onCategorySelect}) => {
  const [categories, setCategories] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await api.get("/categories");
        setCategories(response.data.payload.categories);
      } catch (error) {
        toast.error("Failed to fetch categories");
      }
    };

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

  const refreshCategories = async () => {
    try {
      const response = await api.get("/categories");
      setCategories(response.data.payload.categories);
    } catch (error) {
      toast.error("Failed to refresh categories");
    }
  };

  return (
    <aside className="w-[250px] border-r p-4 bg-gray-50">
      <div className="flex items-center justify-between text-lg font-semibold mb-4">
        <p>Categories</p>
        <button onClick={() => setIsModalOpen(true)}>Add Category</button>
      </div>

      <div className="w-full">
        <select
          name="sort"
          value={sortOption}
          onChange={handleSortChange}
          className="text-sm border rounded px-1 py-[2px]"
        >
          <option value="">Recent</option>
          <option value="az">Name (A-Z)</option>
          <option value="za">Name (Z-A)</option>
        </select>
      </div>

      <ul className="space-y-2">
        <li
          key="all-notes"
          className="flex justify-between text-gray-700 hover:bg-blue-100 rounded-md px-2 py-1 cursor-pointer"
          onClick={() => onCategorySelect(null)} 
        >
          <span>All Notes</span>
        </li>

        {categories.map((cat) => (
          <li
            key={cat._id}
            className="flex justify-between text-gray-700 hover:bg-blue-100 rounded-md px-2 py-1 cursor-pointer"
            onClick={() => onCategorySelect(cat._id)}
          >
            <span>{cat.name}</span>
          </li>
        ))}
      </ul>

      <Modal
        title="Create New Category"
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <NewCategoryFrom
          onClose={() => setIsModalOpen(false)}
          refreshCategories={refreshCategories}
        />
      </Modal>
    </aside>
  );
};

export default Sidebar;
