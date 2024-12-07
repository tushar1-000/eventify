const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const { createToken } = require("../services/authentication");

async function register(req, res) {
  try {
    let { fullName, email, password } = req.body;
    //check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.render("register", { err: "User already exist" });
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    password = hashedPassword;
    //create and save the user

    const user = await User.create({ fullName, email, password });
    const token = createToken(user);
    return res.cookie("token", token).redirect("/");
  } catch (err) {
    return res.render("register", { err: "Server error" });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    //Find the user;
    const user = await User.findOne({ email });
    if (!user) {
      return res.render("login", { err: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = createToken(user);
      
      return res.cookie("token", token).redirect("/");
    } else return res.render("login", { err: "Invalid credentials" });
  } catch (err) {
    console.log("Err", err);
    return res.render("register", { err: "Server error" });
  }
}

function logout(req, res) {
  res.clearCookie("token").redirect("/user/login");
}

module.exports = { register, login, logout };
