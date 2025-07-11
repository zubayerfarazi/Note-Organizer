import { useState } from "react";
import api from "../../../api/axios";
import InputField from "../../../component/input/InputField";
import { useAuth } from "../../../context/AuthContext";
import { toast } from "react-toastify";

const NewCategoryFrom = ({ onClose, refreshCategories }: any) => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      if (!user?._id) {
        console.error("User ID not found");
        return;
      }

      const response = await api.post("/categories", {
        name: formData.name,
        user: user._id,
      });
      if (response) {
        toast.success(response?.data.message);
        refreshCategories();
        onClose();
        setIsLoading(false);
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <InputField
        label="Category Name"
        name="name"
        placeholder="Category Name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <button
        type="submit"
        className="px-4 py-2 rounded-full border w-full hover:bg-black hover:text-white transition-all ease-in-out duration-300 cursor-pointer"
      >
        {
          isLoading ? "Loading..." : "Create Category"
        }
      </button>
    </form>
  );
};

export default NewCategoryFrom;
