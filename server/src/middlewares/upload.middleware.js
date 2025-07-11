// const multer = require("multer");
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// const { cloudinary } = require("../config/cloudinary");

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: "noteOrganizer",
//     allowed_formats: ["jpg", "jpeg", "png", "webp"],
//   },
// });

// const upload = multer({ storage });

// module.exports = upload;

const multer = require("multer");
const path = require("path");
const fs = require("fs");

const fileFilter = (req, file, cb) => {
  const allowedFileType = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedFileType.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file type. Only JPEG, PNG, and JPG are allowed."),
      false
    );
  }
};

const noteRequestStorage = multer.diskStorage({
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const uploadNoteRequestImage = multer({
  storage: noteRequestStorage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter,
});

module.exports = { uploadNoteRequestImage };
