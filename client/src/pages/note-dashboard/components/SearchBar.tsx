
const SearchBar = ({ searchTerm, setSearchTerm }: any) => {
  return (
    <div>
      <input
        type="text"
        placeholder="Search notes..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
        className="border border-gray-400 px-4 py-2 w-full rounded"
      />
    </div>
  );
};

export default SearchBar;
