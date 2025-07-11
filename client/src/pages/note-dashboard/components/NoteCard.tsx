import { useState } from "react";
import NoteModal from "./NoteModal";

interface NoteCardProps {
  id: string;
  title: string;
  content: string;
  image: string;
  category: any;
  createdAt: string;
}

const NoteCard = ({
  id,
  image,
  title,
  content,
  category,
  createdAt,
  // @ts-ignore
  refreshNotes,
}: NoteCardProps) => {
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
        className="flex flex-col justify-between border border-gray-400 rounded-lg p-4 shadow-sm hover:shadow-md hover:bg-gray-50 cursor-pointer transition-shadow"
      >
        <div className="flex-1">
          <p className="text-2xl font-bold mb-2">{title}</p>

          {image && (
            <div>
              <img
                src={image}
                alt={title}
                className="w-48 mx-auto border border-gray-300 rounded-md hover:scale-110 transition-all ease-in-out duration-300"
              />
            </div>
          )}

          <div
            dangerouslySetInnerHTML={{ __html: content }}
            className="leading-relaxed whitespace-pre-wrap my-2 prose max-w-none"
          />
        </div>

        <div className="flex items-center justify-between mt-4">
          <span className="inline-block bg-blue-100 text-sm font-medium px-3 py-1 rounded-full">
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
        note={{ id, title, content, image, category, createdAt }}
        refreshNotes={refreshNotes}
      />
    </>
  );
};

export default NoteCard;
