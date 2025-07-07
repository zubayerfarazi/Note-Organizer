import {  useState } from "react";
import NoteModal from "./NoteModal";

const NoteCard = ({title, content, category, createdAt}: any) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        className="border rounded-lg p-4 shadow hover:bg-gray-100 cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
          <div>
            <h3 className="text-lg font-bold mb-1">{title}</h3>
            <p className="text-sm text-gray-600 truncate">{content}</p>
            <div className="text-xs mt-2 text-blue-700">
              {category.name}
            </div>
            <p className="text-xs text-gray-400">
              {new Date(createdAt).toLocaleDateString()}
            </p>
          </div>
      </div>

      <NoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        note={{ title, content, category, createdAt }}
      />
    </>
  );
};

export default NoteCard;
