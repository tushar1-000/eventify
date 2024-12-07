const jwt = require("jsonwebtoken");
const { secret } = require("../services/authentication");

function checkForAuthCookie(req, res, next) {
  const token = req.cookies["token"];

  if (!token) return res.redirect("/user/login");
  jwt.verify(token, secret, (err, user) => {
    if (err) return res.status(403).send("Invalid token");

    req.user = user;
    next();
  });
}

module.exports = { checkForAuthCookie };
