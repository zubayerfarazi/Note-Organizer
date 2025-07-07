const { Schema, model } = require("mongoose");

const NoteSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    title: { type: String, required: true },
    content: { type: String },
    image: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const Note = model("Note", NoteSchema);

module.exports = Note;
