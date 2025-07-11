import { useEffect, useState } from "react";
import NoteCard from "./components/NoteCard";
import Sidebar from "./components/Sidebar";
import Modal from "../../component/modal/Modal";
import NewNoteModalForm from "./components/NewNoteForm";
import { toast } from "react-toastify";
import api from "../../api/axios";
import Pagination from "../../component/pagination/Pagination";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";

const NotesDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [noteData, setNoteData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
      setTotalPages(response.data.payload.totalPage);
    } catch (error: any) {
      toast.error(error.message);
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
      <Sidebar
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      <main className="flex-1">
        <Header
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          searchTerm={searchTerm} setSearchTerm={setSearchTerm}
        />

        <div className="flex flex-wrap gap-4 items-center justify-between md:justify-end mt-2 px-4 bg-gray-50">
          <div className="md:hidden block">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-black text-white px-4 py-2 rounded-full font-semibold hover:text-black hover:bg-white hover:border transition-all ease-in-out duration-300 cursor-pointer"
          >
            Create New Note
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 px-4 bg-gray-50">
          {noteData.map((note: any) => (
            <NoteCard
              key={note._id}
              id={note._id}
              title={note.title}
              image={note.image}
              content={note.content}
              category={note.category}
              createdAt={note.createdAt}
              // @ts-ignore
              refreshNotes={fetchNotes}
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
