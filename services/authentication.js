const JWT = require("jsonwebtoken");

const secret = "$uperman@123";
function createToken(user) {
  const payload = {
    _id: user._id,
    email: user.email,
    profileImageURL: user.profileImageURL,
    role: user.role,
    fullName: user.fullName,
  };


  const token = JWT.sign(payload, secret);
  return token;
}

function validateToke(token) {
  const payload = JWT.verify(token, secret);
  return payload;
}

module.exports = { createToken, validateToke, secret };
