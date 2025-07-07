import { useEffect, useState } from "react";
import NoteCard from "./components/NoteCard";
import SearchBar from "./components/SearchBar";
import Sidebar from "./components/Sidebar";
import Modal from "./components/Modal";
import NewNoteModalForm from "./components/NewNoteForm";
import { toast } from "react-toastify";
import api from "../../api/axios";
import Pagination from "../../component/pagination/Pagination";

const NotesDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [noteData, setNoteData] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const getAllNotes = async () => {
      try {
        const endpoint = selectedCategory
          ? `/notes?category=${selectedCategory}&page=${page}&limit=${limit}`
          : "/notes";
        const response = await api.get(endpoint);
        setNoteData(response.data.payload.notes);
        setTotalPages(response.data.payload.totalPages);
      } catch (error) {
        toast.error(error?.message);
      }
    };
    getAllNotes();
  }, [selectedCategory]);

  const handlePagination = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar onCategorySelect={setSelectedCategory} />

      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-4">
          <SearchBar />
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer"
          >
            New Note
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {noteData.map((notes) => (
            <NoteCard
              key={notes._id}
              title={notes.title}
              content={notes.content}
              category={notes.category?.name}
              createdAt={notes.createdAt}
            />
          ))}
        </div>

        {totalPages > 1 && (
          <Pagination
            pageCount={totalPages}
            currentPageNumber={page}
            handlePagination={handlePagination}
          />
        )}

        <Modal
          title="Create New Note"
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          <NewNoteModalForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      </main>
    </div>
  );
};

export default NotesDashboard;
