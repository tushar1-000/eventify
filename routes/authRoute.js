const { Router } = require("express");
const User = require("../models/user.js");
const { login, register , logout } = require("../controllers/auth.js");
const router = Router();

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/register", register);
router.post("/login", login);
router.get("/logout" , logout)

module.exports = router;
