// backend/controllers/adminController.js
const User = require("../models/User");
const Content = require("../models/Content");
const Donation = require("../models/Donation");

// @desc    Get all users
// @route   GET /api/admin/users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Exclude passwords
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
};

// @desc    Get all content (pending, published, etc.)
// @route   GET /api/admin/content
exports.getAllContent = async (req, res) => {
  try {
    // .populate() will fetch the teacher's name and email from the User model
    const content = await Content.find()
      .populate("teacher", "name email")
      .sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: content });
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
};

// @desc    Update content status (Approve/Reject)
// @route   PUT /api/admin/content/:id/status
exports.updateContentStatus = async (req, res) => {
  try {
    const { status } = req.body; // Expecting { "status": "Published" } or { "status": "Rejected" }

    if (!["Published", "Rejected"].includes(status)) {
      return res.status(400).json({ msg: "Invalid status provided." });
    }

    const content = await Content.findByIdAndUpdate(
      req.params.id,
      { status },
      {
        new: true, // Return the updated document
        runValidators: true,
      }
    );

    if (!content) {
      return res.status(404).json({ msg: "Content not found" });
    }

    res.status(200).json({ success: true, data: content });
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
};

// @desc    Admin deletes any content
// @route   DELETE /api/admin/content/:id
exports.deleteContent = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);
    if (!content) {
      return res.status(404).json({ msg: "Content not found" });
    }
    await content.deleteOne();
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ msg: "Server Error" });
  }
};

// @desc    Get all donations
// @route   GET /api/admin/donations
exports.getAllDonations = async (req, res) => {
  try {
    const donations = await Donation.find().sort({ createdAt: -1 }); // Get newest first
    res.status(200).json({ success: true, data: donations });
  } catch (error) {
    console.error("GET DONATIONS ERROR:", error);
    res.status(500).json({ msg: "Server Error" });
  }
};
