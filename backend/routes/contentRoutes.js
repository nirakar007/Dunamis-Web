// backend/routes/contentRoutes.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

// --- THIS IS THE FIX ---
// The path must go up one directory from 'routes' to find the 'controllers' folder.
const {
  uploadContent,
  getMyContent,
  deleteContent,
  updateContent,
} = require("../controllers/contentController");
const { protect } = require("../middleware/authMiddleware");

// Multer storage configuration - THIS IS CORRECT
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Init upload variable - THIS IS CORRECT
const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 }, // Limit file size to 10MB
}).array("files", 10); // Expect an array of files from a field named 'files'

// Define the route - THIS IS CORRECT
router.post("/upload", protect, upload, uploadContent);
router.get("/my-content", protect, getMyContent);
router.delete("/:id", protect, deleteContent);
router.put("/:id", protect, updateContent);

module.exports = router;
