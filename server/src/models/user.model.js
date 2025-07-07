const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required!"],
      trim: true,
      minlength: [3, "Minimum length of name is 3 characters!"],
      maxlength: [31, "Maximum length of name is 31 characters!"],
    },

    email: {
      type: String,
      required: [true, "Email is required!"],  
      trim: true,
      unique: true,
      lowercase: true,                        
      validate: {
        validator: function (v) {
          return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
        },
        message: "Please enter a valid email!",
      },
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      trim: true,
      minlength: [6, "Minimum length of password is 6 characters."],
      set: (v) => bcrypt.hashSync(v, bcrypt.genSaltSync(10)),
    },
  },
  { timestamps: true }
);

const User = model("User", userSchema);

module.exports = User;
