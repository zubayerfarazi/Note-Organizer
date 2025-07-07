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
    _id: string;
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

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      await api.patch(`/notes/${note._id}`, formData);
      onClose();
    } catch (error) {
      console.error("Failed to update note", error);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/notes/${note._id}`);
      onClose();
    } catch (error) {
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
    <Modal title="Note" isOpen={isOpen} onClose={onClose}>
      <div className="space-y-5">
        <div className="w-full">
        <p>Select Category</p>
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
      </div>

      <InputField
        label="Title"
        name="title"
        value={note.title}
        onChange={handleChange}
        placeholder="Title"
      />
      <TextAreaField
        label="Content"
        name="content"
        value={formData.content}
        onChange={handleChange}
        rows={4}
        placeholder="Content"
      />

      <div className="flex justify-between">
        <button
          onClick={handleUpdate}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Save Changes
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Delete
        </button>
      </div>
      </div>
    </Modal>
  );
};

export default NoteModal;
