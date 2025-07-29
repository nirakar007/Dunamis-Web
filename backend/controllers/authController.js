// backend/controllers/authController.js
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// @desc    Register a new user
// @route   POST /api/auth/register
exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    // Basic validation
    if (!name || !email || !password) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Create new user (password will be hashed by the model's 'pre' hook)
    user = await User.create({ name, email, password, role });

    res.status(201).json({ success: true, msg: "Registration successful" });
  } catch (err) {
    console.error("REGISTER ERROR:", err.message);
    res.status(500).json({ msg: "Server Error" });
  }
};

// @desc    Login user & get token
// @route   POST /api/auth/login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Basic validation
    if (!email || !password) {
      return res.status(400).json({ msg: "Please provide email and password" });
    }

    // Check for user and include the password for comparison
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    // Create JWT Payload
    const payload = {
      user: {
        id: user.id,
        role: user.role,
        name: user.name,
      },
    };

    // Sign the token and send it back to the client
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "5h" },
      (err, token) => {
        if (err) throw err;
        res.json({ success: true, token }); // <-- SENDING TOKEN HERE
      }
    );
  } catch (err) {
    console.error("LOGIN ERROR:", err.message);
    res.status(500).json({ msg: "Server Error" });
  }
};
