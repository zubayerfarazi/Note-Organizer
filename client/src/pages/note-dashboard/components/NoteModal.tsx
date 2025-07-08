import { useEffect, useState } from "react";
import api from "../../../api/axios";
import Modal from "./Modal";
import InputField from "../../../component/input/InputField";
import TextAreaField from "../../../component/input/TextArea";
import { toast } from "react-toastify";

type NoteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  note: {
    id: string;
    title: string;
    content: string;
    category: string;
    createdAt: string;
  };
};

const NoteModal = ({ isOpen, onClose, note }: NoteModalProps) => {
  const [formData, setFormData] = useState({
    title: note.title,
    content: note.content,
    category: note.category,
  });
  const [categories, setCategories] = useState([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      await api.put(`/notes/${note.id}`, formData);
      toast.success("Note updated successfully!");
      onClose();
    } catch (error) {
      toast.error("Failed to update note");
      console.error("Failed to update note", error);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/notes/${note.id}`);
      toast.success("Note deleted successfully!");
      onClose();
    } catch (error) {
      toast.error("Failed to delete note");
      console.error("Failed to delete note", error);
    }
  };

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

  return (
    <Modal title="Edit Note" isOpen={isOpen} onClose={onClose}>
      <div className="space-y-6 p-4">
        {/* Category Selector */}
        <div>
          <label
            htmlFor="category"
            className="block mb-2 text-sm font-semibold text-gray-700"
          >
            Select Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            {categories.length === 0 && <option>Loading...</option>}
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Title Input */}
        <InputField
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter note title"
          className="w-full"
        />

        {/* Content TextArea */}
        <TextAreaField
          label="Content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          rows={5}
          placeholder="Enter note content"
          className="w-full"
        />

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
          <button
            onClick={handleDelete}
            type="button"
            className="rounded-md bg-red-600 px-5 py-2 text-white transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            Delete
          </button>
          <button
            onClick={handleUpdate}
            type="button"
            className="rounded-md bg-blue-600 px-5 py-2 text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Save Changes
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default NoteModal;
