import { useState } from "react";
import NoteModal from "./NoteModal";

interface NoteCardProps  {
  id: string;
  title: string;
  content: string;
  category: {
    name: string;
  }
  createdAt: string;
}

const NoteCard = ({ id, title, content, category, createdAt }: NoteCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        onClick={() => setIsModalOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") setIsModalOpen(true);
        }}
        className="border border-gray-200 rounded-lg p-5 shadow-sm transition-shadow hover:shadow-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
      >
        <p className="text-2xl font-bold mb-2">{title}</p>
        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap mb-2">{content}</p>
        <div className="flex items-center justify-between">
          <span className="inline-block bg-blue-100  text-sm font-medium px-3 py-1 rounded-full">
            {category.name}
          </span>
          <time
            dateTime={createdAt}
            className="text-gray-500 text-sm"
            title={new Date(createdAt).toLocaleString()}
          >
            {new Date(createdAt).toLocaleDateString()}
          </time>
        </div>
      </div>

      <NoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        note={{ id, title, content, category, createdAt }}
      />
    </>
  );
};

export default NoteCard;
