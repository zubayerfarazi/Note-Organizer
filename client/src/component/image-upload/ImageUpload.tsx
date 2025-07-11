import React, { useEffect, useId, useState } from "react";
import { IoCloseSharp, IoCloudUploadOutline } from "react-icons/io5";

interface ImageUploadProps {
  value: string | null;
  onChange: (file: File | null) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ value, onChange }) => {
  const id = useId();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(value);

  useEffect(() => {
    if (!selectedFile) {
      setPreview(value || null);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile, value]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(null);
      setPreview(null);
      onChange(null);
      return;
    }

    const file = e.target.files[0];
    setSelectedFile(file);
    onChange(file);
  };

  const removeImage = () => {
    setSelectedFile(null);
    setPreview(null);
    onChange(null);
  };

  const getImageSrc = (url: string | null) => {
    if (!url) return "";
    if (url.startsWith("blob:")) return url;
    if (url.startsWith("http") || url.startsWith("data:")) return url;
    return import.meta.env.VITE_API_IMAGE_URL + url;
  };

  return (
    <div className="flex flex-row items-start space-x-3">
      <label
        htmlFor={`${id}-image-upload`}
        className="w-[120px] h-[120px] flex items-center justify-center flex-col gap-2 border border-dashed border-gray-400 text-gray-600 text-sm rounded-md cursor-pointer hover:bg-gray-100 transition"
      >
        <IoCloudUploadOutline size={20} />
        <span className="text-xs text-center px-1">Upload Image</span>
      </label>

      <input
        id={`${id}-image-upload`}
        type="file"
        className="hidden"
        onChange={handleFileChange}
        accept="image/png, image/jpeg, image/jpg, image/webp"
      />

      {preview && (
        <div className="relative w-[120px] h-[120px]">
          <img
            src={getImageSrc(preview)}
            alt="Preview"
            className="w-full h-full object-cover rounded-md border border-gray-300"
            onError={() => setPreview(null)}
          />
          <button
            onClick={removeImage}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
            type="button"
            title="Remove Image"
          >
            <IoCloseSharp size={12} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
