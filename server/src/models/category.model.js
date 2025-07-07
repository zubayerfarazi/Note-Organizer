const { Schema, model } = require("mongoose");
const User = require("./user.model");

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "category is required!"],
      unique: true,
      trim: true,
      minlength: [3, "Minimum length of category is 3 characters!"],
      maxlength: [31, "Maximum length of category is 31 characters!"],
    },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const Category = model("Category", categorySchema);

module.exports = Category;
