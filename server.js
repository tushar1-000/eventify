const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const { checkForAuthCookie } = require("./middleware/auth.js");
const ejs = require("ejs");
dotenv.config();

const { Blog } = require("./models/blog.js");
const authRoute = require("./routes/authRoute");
const blogRoute = require("./routes/blogRoute.js");
const connectDB = require("./mongodb");
const cookieParser = require("cookie-parser");
const exp = require("constants");
const { log } = require("console");
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));

connectDB();

app.use("/user", authRoute);
app.get("/", checkForAuthCookie, async (req, res) => {
  const allBlogs = await Blog.find({}).populate("createdBy");
  console.log(allBlogs[0]);

  res.render("home", { user: req.user, blogs: allBlogs });
});

app.use(express.static(path.resolve("./public")));

app.use("/blog", checkForAuthCookie, blogRoute);
app.use((req, res, next) => {
  res.status(404).render("notfound", { url: req.originalUrl });
});

app.listen(PORT, () => console.log(`SERVER is running on port: ${PORT}`));
