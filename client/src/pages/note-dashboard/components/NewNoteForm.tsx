import { useState, useEffect } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

import api from "../../../api/axios";
import InputField from "../../../component/input/InputField";
import ImageUpload from "../../../component/image-upload/ImageUpload";
import { toast } from "react-toastify";

const NewNoteModalForm = ({ onClose }: { onClose: () => void }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
  });
  const [categories, setCategories] = useState<string[]>([]);
  const [image, setImage] = useState();

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
    setIsLoading(true);
    try {
      const payload = new FormData();
      payload.append("title", formData.title);
      payload.append("content", formData.content);
      payload.append("category", formData.category);
      if (image) {
        payload.append("image", image);
      }

      const response = await api.post("/notes", payload);
      if(response){
        toast.success(response.data.payload.message);
        onClose();
        setIsLoading(false);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* @ts-ignore */}
      <ImageUpload value={null} onChange={(file) => setImage(file)} />

      <div>
        <label htmlFor="category" className="block mb-2 text-sm font-semibold">
          Select Category
        </label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 cursor-pointer"
        >
          <option value="">Select Category</option>
          {categories.map((cat: any) => (
            <option key={cat._id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <InputField
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
        placeholder="Enter a title"
      />

      <ReactQuill
        theme="snow"
        value={formData.content}
        onChange={(value) =>
          setFormData((prev) => ({ ...prev, content: value }))
        }
      />

      <button
        type="submit"
        className="rounded-md w-full bg-white border text-black px-5 py-2 hover:text-white transition-all ease-in-out duration-300 font-semibold hover:bg-black hover:border cursor-pointer"
      >
        {isLoading ? "Loading..." : "Create"}
      </button>
    </form>
  );
};

export default NewNoteModalForm;
