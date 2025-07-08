import { useEffect, useState } from "react";
import NoteCard from "./components/NoteCard";
import SearchBar from "./components/SearchBar";
import Sidebar from "./components/Sidebar";
import Modal from "./components/Modal";
import NewNoteModalForm from "./components/NewNoteForm";
import { toast } from "react-toastify";
import api from "../../api/axios";
import Pagination from "../../component/pagination/Pagination";
import { useAuth } from "../../context/AuthContext";

const NotesDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [noteData, setNoteData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const { user } = useAuth();

  const fetchNotes = async () => {
    try {
      const params: any = {
        page,
        limit,
      };

      if (selectedCategory) params.category = selectedCategory;
      if (searchTerm) params.search = searchTerm;

      const response = await api.get("/notes", { params });

      setNoteData(response.data.payload.notes);
      setTotalPages(response.data.payload.totalPage); // ✅ Adjust this if your backend uses totalPages
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Error fetching notes.");
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [selectedCategory, page, searchTerm]);

  const handlePagination = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar onCategorySelect={setSelectedCategory} />

      <main className="flex-1 p-6 mt-12 md:mt-0">
        <div className="flex justify-between items-center mb-4 gap-4">
          <div>
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </div>
          <div>{user?.name ?? "Log in"}</div>
        </div>

        <div className="flex items-center justify-end mb-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer"
          >
            Create New Note
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {noteData.map((note) => (
            <NoteCard
              key={note._id}
              id={note._id}
              title={note.title}
              content={note.content}
              category={note.category}
              createdAt={note.createdAt}
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
