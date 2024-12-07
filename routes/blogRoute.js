const { Router } = require("express");
const path = require("path");
const multer = require("multer");
const { Blog } = require("../models/blog.js");
const { Comment } = require("../models/comment.js");
const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

router.get("/add-new", (req, res) => {
  return res.render("addBlog", {
    user: req.user,
  });
});

router.post("/", upload.single("coverImage"), async (req, res) => {
  const { title, body } = req.body;
  const blog = await Blog.create({
    title,
    body,
    createdBy: req.user._id,
    coverImageURL: "uploads/" + req.file.filename,
  });
  return res.redirect(`/blog/${blog._id}`);
});

router.get("/:blogid", async (req, res) => {
  const blog = await Blog.findById(req.params.blogid).populate("createdBy");
  const comments = await Comment.find({
    blogId: req.params.blogid,
  }).populate("createdBy");

  res.render("blog", {
    user: req.user,
    blog,
    comments,
  });
});

router.post("/comment/:blogid", async (req, res) => {
  const comment = await Comment.create({
    content: req.body.content,
    blogId: req.params.blogid,
    createdBy: req.user._id,
  });
  return res.redirect(`/blog/${req.params.blogid}`);
});

module.exports = router;
