// import { useEffect, useState } from "react";
// import api from "../../../api/axios";
// import Modal from "../../../component/modal/Modal";
// import InputField from "../../../component/input/InputField";
// import TextAreaField from "../../../component/input/TextArea";
// import { toast } from "react-toastify";
// import ImageUpload from "../../../component/image-upload/ImageUpload";
// import ReactQuill from "react-quill-new";
// import "react-quill-new/dist/quill.snow.css";

// type NoteModalProps = {
//   isOpen: boolean;
//   onClose: () => void;
//   note: {
//     id: string;
//     title: string;
//     content: string;
//     image: string;
//     category: string;
//     createdAt: string;
//   };
// };

// const NoteModal = ({ isOpen, onClose, note, refreshNotes }: NoteModalProps) => {
//   const [formData, setFormData] = useState({
//     title: note.title,
//     content: note.content,
//     category: note.category,
//     image: note.image,
//   });
//   const [categories, setCategories] = useState([]);

//   const handleChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//     >
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

// const handleUpdate = async () => {
//   try {
//     const payload = new FormData();
//     payload.append("title", formData.title);
//     payload.append("content", formData.content);
//     payload.append("category", formData.category);

//     if (formData.image) {
//       payload.append("image", formData.image);
//     }

//     await api.put(`/notes/${note.id}`, payload);

//     toast.success("Note updated successfully!");
//     refreshNotes();
//     onClose();
//   } catch (error) {
//     toast.error("Failed to update note");
//     console.error("Failed to update note", error);
//   }
// };

//   const handleDelete = async () => {
//     try {
//       await api.delete(`/notes/${note.id}`);
//       toast.success("Note deleted successfully!");
//       refreshNotes();
//       onClose();
//     } catch (error) {
//       toast.error("Failed to delete note");
//       console.error("Failed to delete note", error);
//     }
//   };

//   useEffect(() => {
//     const getCategories = async () => {
//       try {
//         const response = await api.get("/categories");
//         setCategories(response.data.payload.categories);
//       } catch (error: any) {
//         toast.error(error.message);
//       }
//     };

//     getCategories();
//   }, []);

//   const handleImageUpload = (file: File | null) => {
//     if (file) {
//       setFormData((prevState) => ({ ...prevState, image: file }));
//     }
//   };

//   return (
//     <Modal title="Edit Note" isOpen={isOpen} onClose={onClose}>
//       <div className="space-y-6">
//         <div>
//           <p>Image:</p>
//           <ImageUpload value={formData.image} onChange={handleImageUpload} />
//         </div>

//         <div>
//           <label
//             htmlFor="category"
//             className="block mb-2 text-sm font-semibold"
//           >
//             Select Category
//           </label>
//           <select
//             id="category"
//             name="category"
//             value={formData.category}
//             onChange={handleChange}
//             className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 cursor-pointer"
//           >
//             {categories.length === 0 && <option>Loading...</option>}
//             {categories.map((cat) => (
//               <option key={cat._id} value={cat._id}>
//                 {cat.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         <InputField
//           label="Title"
//           name="title"
//           value={formData.title}
//           onChange={handleChange}
//           placeholder="Enter note title"
//         />

//         {/* <TextAreaField
//           label="Content"
//           name="content"
//           value={formData.content}
//           onChange={handleChange}
//           rows={5}
//           placeholder="Enter note content"
//         /> */}

//         <ReactQuill
//           theme="snow"
//           value={formData.content}
//           onChange={(value) =>
//             setFormData((prev) => ({ ...prev, content: value }))
//           }
//         />

//         <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
//           <button
//             onClick={handleDelete}
//             type="button"
//             className="rounded-md bg-red-600 px-5 py-2 text-white transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 cursor-pointer font-semibold"
//           >
//             Delete
//           </button>
//           <button
//             onClick={handleUpdate}
//             type="button"
//             className="rounded-md bg-black px-5 py-2 text-white transition-all ease-in-out duration-300 font-semibold hover:bg-white hover:text-black hover:border cursor-pointer"
//           >
//             Save
//           </button>
//         </div>
//       </div>
//     </Modal>
//   );
// };

// export default NoteModal;

import { useEffect, useState } from "react";
import api from "../../../api/axios";
import Modal from "../../../component/modal/Modal";
import InputField from "../../../component/input/InputField";
import { toast } from "react-toastify";
import ImageUpload from "../../../component/image-upload/ImageUpload";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

type NoteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  note: {
    id: string;
    title: string;
    content: string;
    image: string;
    category: string;
    createdAt: string;
  };
  refreshNotes: () => void;
};

const NoteModal = ({ isOpen, onClose, note, refreshNotes }: NoteModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: note.title,
    content: note.content,
    category: note.category,
    image: note.image,
  });
  const [categories, setCategories] = useState([]);
  const [image, setImage] = useState();

  useEffect(() => {
    setFormData({
      title: note.title,
      content: note.content,
      image: note.image,
      category:
      // @ts-ignore
        typeof note.category === "object" ? note.category._id : note.category,
    });
  }, [note]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    try {
      const payload = new FormData();
      payload.append("title", formData.title);
      payload.append("content", formData.content);
      payload.append(
        "category",
        typeof formData.category === "object"
          ? // @ts-ignore
            formData.category._id
          : formData.category
      );
      if (image) {
        payload.append("image", image);
      }

      console.log("Payload:", {
        title: formData.title,
        content: formData.content,
        category: formData.category,
      });
      const response = await api.put(`/notes/${note.id}`, payload);
      if (response) {
        toast.success("Note updated successfully!");
        refreshNotes();
        onClose();
        setIsLoading(false);
      }
    } catch (error: any) {
      toast.error(error.message);
      console.error("Failed to update note", error);
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const response = await api.delete(`/notes/${note.id}`);
      if (response) {
        toast.success("Note deleted successfully!");
        refreshNotes();
        onClose();
        setIsLoading(false);
      }
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
      } catch (error: any) {
        toast.error(error.message);
      }
    };

    getCategories();
  }, []);

  return (
    <Modal title="Edit Note" isOpen={isOpen} onClose={onClose}>
      <div className="space-y-6">
        <div>
          <p>Image:</p>
          <ImageUpload
            value={formData.image}
            // @ts-ignore
            onChange={(file) => setImage(file)}
          />
        </div>

        <div>
          <label
            htmlFor="category"
            className="block mb-2 text-sm font-semibold"
          >
            Select Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 cursor-pointer"
          >
            {categories.length === 0 && <option>Loading...</option>}
            {categories.map((cat: any) => (
              <option key={cat._id} value={cat._id}>
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
          placeholder="Enter note title"
        />

        <ReactQuill
          theme="snow"
          value={formData.content}
          onChange={(value) =>
            setFormData((prev) => ({ ...prev, content: value }))
          }
        />

        <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
          <button
            onClick={handleDelete}
            type="button"
            className="rounded-md bg-red-600 px-5 py-2 text-white transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 cursor-pointer font-semibold"
          >
            Delete
          </button>
          <button
            onClick={handleUpdate}
            type="button"
            className="rounded-md bg-black px-5 py-2 text-white transition-all ease-in-out duration-300 font-semibold hover:bg-white hover:text-black hover:border cursor-pointer"
          >
            {isLoading ? "Loading..." : "Save"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default NoteModal;
