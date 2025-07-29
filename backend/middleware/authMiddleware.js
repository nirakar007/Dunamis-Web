// backend/middleware/authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.protect = async (req, res, next) => {
  console.log("--- PROTECT MIDDLEWARE RUNNING ---");
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ msg: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Attach the user's ID to the request object for later use
    req.user = await User.findById(decoded.user.id);
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Not authorized, token failed" });
  }
};

exports.isAdmin = (req, res, next) => {
  // 'req.user' is attached by the 'protect' middleware which should run before this
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ msg: "Forbidden: Admin access required." });
  }
};
