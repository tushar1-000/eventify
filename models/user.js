const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImageURL: {
      type: String,
      default: "/images/user.png",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      //   required: true,
    },
  },
  { timestamps: true }
);

let User = mongoose.model("User", userSchema);
module.exports = { User };
