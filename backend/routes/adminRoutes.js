// backend/routes/adminRoutes.js
const express = require("express");
const router = express.Router();

const { protect, isAdmin } = require("../middleware/authMiddleware");
const {
  getAllUsers,
  getAllContent,
  updateContentStatus,
  deleteContent,
  getAllDonations,
} = require("../controllers/adminController");

// All routes in this file are protected and require admin access
router.use(protect, isAdmin);

router.get("/users", getAllUsers);
router.get("/content", getAllContent);
router.put("/content/:id/status", updateContentStatus);
router.delete("/content/:id", deleteContent);
router.get("/donations", getAllDonations);

module.exports = router;
