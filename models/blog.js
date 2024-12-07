const mongoose = require("mongoose");
const blogSchema = mongoose.Schema(
  {
    title: {
      required: true,
      type: String,
    },
    body: {
      required: true,
      type: String,
    },
    coverImageURL: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model("blog", blogSchema);
module.exports = { Blog };
