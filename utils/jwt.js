const jwt = require("jsonwebtoken");
require("dotenv").config();
const generateToken = async (_id, username, email) => {
  return jwt.sign(
    {
      _id,
      username,
      email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );
};

const verifyToken = async (token) => {
    return await jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = {
    generateToken, verifyToken
}