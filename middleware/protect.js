const { verifyToken } = require("../utils/jwt");

const checkAuth= async (req, res, next) => {

    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({"error":"Access denied. No token provided!"});
    }

  try {
    const decoded = await verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({"error":"Invalid Token!"})
  }
};

module.exports = checkAuth;