// backend/controllers/contentController.js
const Content = require("../models/Content");

// @desc    Upload new content
// @route   POST /api/content/upload
exports.uploadContent = async (req, res) => {
  // Let's add our console.log spies here to see what arrives
  console.log("--- UPLOADCONTENT CONTROLLER IS RUNNING ---");
  console.log("USER ATTACHED BY PROTECT:", req.user ? req.user.id : "No user");
  console.log("BODY RECEIVED:", req.body);
  console.log("FILES RECEIVED BY MULTER:", req.files);

  try {
    const { title, description, category } = req.body;

    // Check if the user object was properly attached by the 'protect' middleware
    if (!req.user || !req.user.id) {
      return res.status(401).json({ msg: "User not found or not authorized." });
    }
    const teacherId = req.user.id;

    // Check if multer processed any files
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ msg: "Please upload at least one file." });
    }

    // Map the uploaded files data to match our schema
    const filesData = req.files.map((file) => ({
      filePath: file.path,
      fileName: file.originalname,
      fileType: file.mimetype,
      fileSize: file.size,
    }));

    const newContent = await Content.create({
      title,
      description,
      category,
      teacher: teacherId,
      files: filesData,
    });

    res.status(201).json({
      success: true,
      msg: "Content uploaded successfully and is pending review.",
      data: newContent,
    });
  } catch (error) {
    console.error("--- UPLOAD CONTENT ERROR ---:", error);
    res
      .status(500)
      .json({ msg: "Server Error occurred during content creation." });
  }
};

// @desc    Get all content for the logged-in teacher
// @route   GET /api/content/my-content
exports.getMyContent = async (req, res) => {
  try {
    const content = await Content.find({ teacher: req.user.id }).sort({
      createdAt: -1,
    });
    res
      .status(200)
      .json({ success: true, count: content.length, data: content });
  } catch (error) {
    console.error("GET MY CONTENT ERROR:", error);
    res.status(500).json({ msg: "Server Error" });
  }
};

// @desc    Delete a piece of content
// @route   DELETE /api/content/:id
exports.deleteContent = async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);

    if (!content) {
      return res.status(404).json({ msg: "Content not found" });
    }

    // Make sure user is the owner of the content
    if (content.teacher.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ msg: "Not authorized to delete this content" });
    }

    await content.deleteOne(); // Mongoose v6+ uses deleteOne() on the document

    // You should also delete the actual files from the './uploads' folder here for a complete solution
    // fs.unlinkSync(filePath) for each file in content.files

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    console.error("DELETE CONTENT ERROR:", error);
    res.status(500).json({ msg: "Server Error" });
  }
};

// @desc    Update a piece of content
// @route   PUT /api/content/:id
exports.updateContent = async (req, res) => {
  try {
    const { title, description, category } = req.body;
    let content = await Content.findById(req.params.id);

    if (!content) {
      return res.status(404).json({ msg: "Content not found" });
    }

    // Make sure the user is the owner of the content
    if (content.teacher.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ msg: "Not authorized to edit this content" });
    }

    // Note: This simple update doesn't handle file changes yet.
    // We'll focus on updating the text fields first.
    content.title = title || content.title;
    content.description = description || content.description;
    content.category = category || content.category;
    content.status = "Pending"; // Re-submit for review after any edit

    await content.save();

    res.status(200).json({ success: true, data: content });
  } catch (error) {
    console.error("UPDATE CONTENT ERROR:", error);
    res.status(500).json({ msg: "Server Error" });
  }
};
