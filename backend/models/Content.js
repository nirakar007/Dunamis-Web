// backend/models/Content.js
const mongoose = require("mongoose");

const ContentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a title"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
    },
    category: {
      type: String,
      required: [true, "Please add a category"],
    },
    // This links the content to the user who uploaded it
    teacher: {
      type: mongoose.Schema.ObjectId,
      ref: "User", // This creates a relationship with the User model
      required: true,
    },
    // This will store an array of file information
    files: [
      {
        filePath: String,
        fileName: String,
        fileType: String,
        fileSize: Number,
      },
    ],
    status: {
      type: String,
      enum: ["Pending", "Published"],
      default: "Pending",
    },
    views: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Content", ContentSchema);
