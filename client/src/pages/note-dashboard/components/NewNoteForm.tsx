import { useState, useEffect } from "react";
import api from "../../../api/axios";
import InputField from "../../../component/input/InputField";
import TextAreaField from "../../../component/input/TextArea";
import { useAuth } from "../../../context/AuthContext";

const NewNoteModalForm = ({ onClose }: { onClose: () => void }) => {
  const {user} = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
  });
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/categories");
        setCategories(res.data.payload.categories || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategories();
  }, []);

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
      await api.post("/notes", formData);
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        required
        className="w-full border p-2 rounded"
      >
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat._id} value={cat.name}>
            {cat.name}
          </option>
        ))}
      </select>
      
      <InputField
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
        placeholder="Enter a title"
      />

      <TextAreaField
        label="Content"
        name="content"
        placeholder="Write your content..."
        value={formData.content}
        onChange={handleChange}
        required
        rows={4}
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded w-full cursor-pointer"
      >
        Create
      </button>
    </form>
  );
};

export default NewNoteModalForm;
