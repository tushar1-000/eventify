const mongoose = require("mongoose");
const commentScehmea = mongoose.Schema(
  {
    content: {
      required: true,
      type: String,
    },
    blogId:{
        type: mongoose.Schema.Types.ObjectId,
      ref: "blog",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("comment", commentScehmea);
module.exports = { Comment };
