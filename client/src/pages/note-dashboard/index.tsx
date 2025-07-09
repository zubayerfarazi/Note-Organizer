import { useEffect, useRef, useState } from "react";
import NoteCard from "./components/NoteCard";
import SearchBar from "./components/SearchBar";
import Sidebar from "./components/Sidebar";
import Modal from "./components/Modal";
import NewNoteModalForm from "./components/NewNoteForm";
import { toast } from "react-toastify";
import api from "../../api/axios";
import Pagination from "../../component/pagination/Pagination";
import { useAuth } from "../../context/AuthContext";
import { FaUser } from "react-icons/fa";
import { RiArrowDropDownLine, RiLogoutCircleLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const NotesDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [noteData, setNoteData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const { user } = useAuth();
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowUserDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

  const handleLogout = async() =>{
    try {
      const response = await api.post(`/logout`);
      if(response){
        toast.success(response.data.message)
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.message)
    }

  }

  return (
    <div className="flex min-h-screen">
      <Sidebar
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
      />

      <main className="flex-1 mt-12 md:mt-0">
        <div className="px-4 py-[9px] border-b border-gray-300">
          <div className="flex justify-between items-center">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

            <div>
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setShowUserDropdown(!showUserDropdown)}
              >
                <FaUser className="text-3xl border border-gray-300 rounded-full p-1" />
                <RiArrowDropDownLine className="text-xl" />
                {/* <div className="flex items-center gap-1">
                  <p>{user?.name}</p>
                </div> */}
              </div>

              {showUserDropdown && (
                <div
                  ref={dropdownRef}
                  className="absolute top-15 right-1 bg-white shadow-xl border border-gray-400 p-2"
                >
                  <div className="border-b border-gray-400 mb-2">
                    <div className="flex items-center gap-1 bg-gray-100 mb-1">
                      <FaUser className="text-3xl border border-gray-300 rounded-full p-1" />
                      <p className="text-[15px] font-semibold text-gray-800">
                        {user?.name}
                      </p>
                    </div>
                  </div>
                  {/* <MenuItem
                    icon={<RiLogoutCircleLine />}
                    text="Logout"
                    className="text-red-500 font-medium hover:bg-[#e68a2c]"
                    onClick={handleLogout}
                  /> */}
                  <div className="flex items-center gap-2 hover:bg-gray-300 p-2 rounded cursor-pointer" onClick={handleLogout}>
                    <RiLogoutCircleLine />
                    <p className="font-semibold">LogOut</p>
                  </div>
                </div>
              )}
            </div>
          </div>
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
