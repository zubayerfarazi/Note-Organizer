import { useState } from "react";
import api from "../../../api/axios";
import InputField from "../../../component/input/InputField";
import { useAuth } from "../../../context/AuthContext";
import { toast } from "react-toastify";

const NewCategoryFrom = ({ onClose, refreshCategories }: { onClose: () => void }) => {
  const { user } = useAuth();
  console.log(user)
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
    e.preventDefault();
    try {
      if (!user?._id) {
        console.error("User ID not found");
        return;
      }

      const payload = {
        ...formData,
        user: user._id,
      };

      const response = await api.post("/categories", { name: formData.name, user: user._id });
      toast.success(response?.data.message);
      refreshCategories();
      onClose();
    } catch (err) {
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
        className="bg-blue-600 text-white px-4 py-2 rounded w-full cursor-pointer"
      >
        Create Category
      </button>
    </form>
  );
};

export default NewCategoryFrom;
