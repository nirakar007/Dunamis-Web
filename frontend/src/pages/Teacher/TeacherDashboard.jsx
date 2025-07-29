import axios from "axios";
import { jwtDecode } from "jwt-decode";
import {
  BarChart3,
  Clock,
  Edit,
  File,
  FileText,
  Globe,
  LogOut,
  Music,
  Star,
  Trash2,
  Upload,
  User,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DashboardCard = ({ title, value, bgColor, textColor }) => (
  <div className={`${bgColor} p-6 rounded-lg shadow-sm`}>
    <div className={`text-2xl font-bold ${textColor}`}>{value}</div>
    <div className="text-sm text-gray-600 mt-1">{title}</div>
  </div>
);

const ActionButton = ({ icon: Icon, label, variant = "primary", onClick }) => {
  const baseClasses =
    "flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all duration-200 transform hover:scale-105";
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white shadow-lg",
    secondary:
      "bg-gray-700 hover:bg-gray-800 text-white shadow-lg hover:shadow-xl",
    edit: "bg-gray-600 hover:bg-gray-700 text-white text-xs px-2 py-1",
    delete: "bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-1",
  };

  return (
    <button className={`${baseClasses} ${variants[variant]}`} onClick={onClick}>
      <Icon size={variant === "edit" || variant === "delete" ? 12 : 16} />
      {label}
    </button>
  );
};

// Notification Component
const Notification = ({ message, type, onClose }) => {
  const bgColor = type === "success" ? "bg-custom-blue" : "bg-red-600";

  return (
    <div
      className={`fixed top-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-pulse`}
    >
      <div className="flex items-center gap-2">
        <span>{message}</span>
        <button
          onClick={onClose}
          className="ml-2 hover:bg-white/20 rounded p-1"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

// Delete Confirmation Modal
const DeleteModal = ({ isOpen, onClose, onConfirm, itemTitle }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl transform transition-all duration-300 scale-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Confirm Delete
        </h3>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete "{itemTitle}"? This action cannot be
          undone.
        </p>
        <div className="flex gap-4 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default function TeacherDashboard({ setCurrentPage }) {
  // Added setCurrentPage prop
  const [name, setName] = useState("");
  const [contentTitle, setContentTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [selectedYear, setSelectedYear] = useState("2025");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [notification, setNotification] = useState(null);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    itemToDelete: null,
  });
  const [editingContent, setEditingContent] = useState(null);
  const navigate = useNavigate();

  // 5. CREATE A PROPER LOGOUT FUNCTION
  const handleLogout = () => {
    // Crucial step: Remove the token from storage
    localStorage.removeItem("token");
    showNotification("Logged out successfully!", "success");
    // Navigate to the login page
    setTimeout(() => {
      navigate("/auth");
    }, 1000);
  };

  // 4. GET USER DATA ON COMPONENT LOAD
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("DECODED TOKEN PAYLOAD:", decoded);
        // Set the name from the token's payload
        setName(decoded.user.name);
        fetchContent();
      } catch (error) {
        console.error("Invalid token:", error);
        // If token is invalid, force logout
        handleLogout();
      }
    } else {
      // If there's no token, redirect to login page
      navigate("/auth");
    }
  }, [navigate]);

  const [contentData, setContentData] = useState([]);
  // {
  //     title: "Learn Japanese",
  //     status: "Published",
  //     views: 122,
  //     date: "March 24, 2025 - 15 days ago",
  //   },
  //   {
  //     title: "Your First Step into Japanese",
  //     status: "Published",
  //     views: 122,
  //     date: "March 27, 2025 - 12 days ago",
  //   },
  //   {
  //     title: "History of Japan",
  //     status: "Pending",
  //     views: 0,
  //     date: "June 1, 2025 - 3 days ago",
  //   },

  const chartData = {
    2007: { donations: 5, contributions: 3, other: 2 },
    2008: { donations: 8, contributions: 5, other: 3 },
    2009: { donations: 12, contributions: 8, other: 4 },
    2010: { donations: 18, contributions: 12, other: 8 },
    2011: { donations: 25, contributions: 18, other: 12 },
    2012: { donations: 35, contributions: 25, other: 18 },
    2013: { donations: 45, contributions: 32, other: 22 },
    2014: { donations: 52, contributions: 38, other: 28 },
    2015: { donations: 68, contributions: 48, other: 35 },
    2016: { donations: 85, contributions: 62, other: 45 },
    2017: { donations: 90, contributions: 65, other: 48 },
    2018: { donations: 95, contributions: 70, other: 50 },
    2019: { donations: 100, contributions: 75, other: 55 },
    2020: { donations: 105, contributions: 80, other: 60 },
    2021: { donations: 110, contributions: 85, other: 65 },
    2022: { donations: 115, contributions: 90, other: 70 },
    2023: { donations: 120, contributions: 95, other: 75 },
    2024: { donations: 125, contributions: 100, other: 80 },
    2025: { donations: 130, contributions: 105, other: 85 },
  };

  const maxValue = 150; // Adjusted max value for chart scaling
  const years = Object.keys(chartData);

  // Show notification
  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Handle delete confirmation
  const handleDeleteClick = (contentItem) => {
    setDeleteModal({ isOpen: true, itemToDelete: contentItem });
  };

  const handleDeleteConfirm = async () => {
    const { itemToDelete } = deleteModal;
    if (!itemToDelete) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/content/${itemToDelete._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      showNotification(
        `"${itemToDelete.title}" deleted successfully.`,
        "success"
      );
      setDeleteModal({ isOpen: false, itemToDelete: null });
      fetchContent(); // <-- ADD THIS LINE TO REFRESH THE LIST
    } catch (error) {
      showNotification("Failed to delete content.", "error");
      setDeleteModal({ isOpen: false, itemToDelete: null });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteModal({ isOpen: false, itemIndex: null, itemTitle: "" });
  };

  // Handle edit action
  const handleEditClick = (contentItem) => {
    // Set the component into "Edit Mode"
    setEditingContent(contentItem);

    // Populate the form fields with the existing data
    setContentTitle(contentItem.title);
    setDescription(contentItem.description);
    setCategory(contentItem.category);

    // We will also show the existing files. We map them to the format our frontend expects.
    const existingFiles = contentItem.files.map((file) => ({
      id: file._id, // Use the database ID
      name: file.fileName,
      // We don't have the fileObject here, but that's okay for display.
    }));
    setUploadedFiles(existingFiles);

    showNotification(`Now editing: "${contentItem.title}"`, "success");

    // Optional: Scroll to the top of the page to see the form
    window.scrollTo(0, 0);
  };

  // Handle form submission (Add or Update)
  const handleSubmit = async () => {
    // Basic validation
    if (!contentTitle.trim() || !description.trim() || !category) {
      showNotification(
        "Title, description, and category are required.",
        "error"
      );
      return;
    }

    // If we are in "Edit Mode"
    if (editingContent) {
      handleUpdateContent();
    } else {
      // Otherwise, we are in "Create Mode"
      handleCreateContent();
    }
  };

  const handleCreateContent = async () => {
    // This is your original upload logic
    if (uploadedFiles.length === 0) {
      showNotification("Please upload at least one file.", "error");
      return;
    }
    const formData = new FormData();
    formData.append("title", contentTitle);
    formData.append("description", description);
    formData.append("category", category);
    uploadedFiles.forEach((file) => formData.append("files", file.fileObject));

    try {
      const token = localStorage.getItem("token");
      await axios.post("/api/content/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      showNotification("Content uploaded successfully!", "success");
      handleCancelEdit(); // Clear form and exit edit mode
      fetchContent();
    } catch (error) {
      showNotification(error.response?.data?.msg || "Upload failed.", "error");
    }
  };

  const handleUpdateContent = async () => {
    // This is our new update logic
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `/api/content/${editingContent._id}`,
        { title: contentTitle, description: description, category: category },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      showNotification("Content updated successfully!", "success");
      handleCancelEdit(); // Clear form and exit edit mode
      fetchContent();
    } catch (error) {
      showNotification(error.response?.data?.msg || "Update failed.", "error");
    }
  };

  const handleCancelEdit = () => {
    setEditingContent(null); // Exit edit mode
    // Clear all form fields
    setContentTitle("");
    setDescription("");
    setCategory("");
    setUploadedFiles([]);
    showNotification("Edit cancelled.", "success");
  };

  // File upload handlers
  const handleFileUpload = (files) => {
    const newFiles = Array.from(files).map((file) => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type,
      fileObject: file, // <-- Store the actual File object
    }));
    setUploadedFiles((prev) => [...prev, ...newFiles]);
    showNotification(`${newFiles.length} file(s) added.`, "success");
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files);
    }
  };

  const handleFileInputChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      handleFileUpload(files);
    }
  };

  const removeFile = (fileId) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== fileId));
    showNotification("File removed.", "success");
  };

  const getFileIcon = (fileName) => {
    const extension = fileName.split(".").pop().toLowerCase();
    if (extension === "pdf") return File;
    if (["mp3", "wav", "ogg"].includes(extension)) return Music;
    return FileText;
  };

  // Add this function inside your TeacherDashboard component
  const fetchContent = async () => {
    console.log("Fetching content from the backend...");
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        handleLogout(); // Log out if token is missing
        return;
      }
      const response = await axios.get("/api/content/my-content", {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Put the real data from the database into our state
      setContentData(response.data.data);
      console.log("Content successfully loaded!");
    } catch (error) {
      console.error("Failed to fetch content:", error);
      showNotification("Could not load your uploaded content.", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Notification */}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        itemTitle={deleteModal.itemTitle}
      />

      <div className="animate-fadeIn">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 py-4">
          <div className="flex items-center justify-between p-1 mt-2">
            <h2 className="text-2xl text-gray-700 shadow-sm font-semibold mb-2 flex items-center gap-2 px-8">
              <BarChart3 size={20} />
              Teacher Dashboard
            </h2>
            <div className="flex items-center gap-2 px-20">
              <div className="flex items-center gap-2 border-2 rounded-md p-2 bg-blue-100">
                <User size={16} />
                <span className="text-sm">{name}</span>
              </div>
              <div className="flex items-center gap-1 text-gray-800 border-2 rounded-md p-2">
                <Star size={16} className="text-amber-500" fill="yellow" />
                <span className="text-sm">Ratings: 5/10</span>
              </div>
              <button
                className="flex items-center gap-2 border-2 rounded-md p-2"
                onClick={() =>
                  showNotification(
                    "Simulating navigation to external website.",
                    "success"
                  )
                }
              >
                <Globe size={16} />
                <span className="text-sm">Go to website</span>
              </button>
              <button
                onClick={() => {
                  setCurrentPage("login"); // Simulate logout by returning to login page
                  showNotification("Logged out successfully!", "success");
                }}
                className="flex items-center gap-2 text-gray-500 hover:text-gray-700 border-2 rounded-md p-2"
              >
                <LogOut size={16} />
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-gray-600 hover:text-red-500"
                >
                  <LogOut size={16} />
                  <span className="text-sm">Log out</span>
                </button>
              </button>
            </div>
          </div>
        </header>

        <div className="px-6">
          {/* Dashboard Stats */}
          <div className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 border-2 rounded-sm">
              <DashboardCard
                title="Published Content"
                value={
                  contentData.filter((item) => item.status === "Published")
                    .length
                }
                bgColor="bg-gray-100"
                textColor="text-gray-800"
              />
              <DashboardCard
                title="Pending Review"
                value={
                  contentData.filter((item) => item.status === "Pending").length
                }
                bgColor="bg-gray-200"
                textColor="text-gray-800"
              />
              <DashboardCard
                title="Total Views"
                value={contentData.reduce((sum, item) => sum + item.views, 0)}
                bgColor="bg-gray-100"
                textColor="text-gray-700"
              />
              <DashboardCard
                title="Donations Received"
                value="Rs 1500"
                bgColor="bg-gray-200"
                textColor="text-gray-800"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 border-2 rounded-sm">
            {/* Upload Content */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h1 className="py-2 border-b-2 border-custom-blue text-2xl font-semibold">
                {editingContent !== null
                  ? "Edit Content"
                  : "Upload New Content"}
              </h1>

              <div className="mt-6 space-y-4">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <FileText size={16} />
                    Content Title
                  </label>
                  <input
                    type="text"
                    value={contentTitle}
                    onChange={(e) => setContentTitle(e.target.value)}
                    placeholder="Enter content title..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    <FileText size={16} />
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter content description..."
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-transparent resize-none"
                  />
                </div>

                {/* File Upload Area */}
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors relative ${
                    isDragOver
                      ? "border-gray-500 bg-gray-100"
                      : "border-gray-300 hover:border-gray-500"
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.ppt,.pptx,.mp3,.wav"
                    onChange={handleFileInputChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <Upload size={48} className="mx-auto text-gray-400 mb-4" />
                  <p className="text-gray-600 mb-2">Drag & drop files here</p>
                  <p className="text-sm text-gray-500 mb-4">
                    or Click to Browse
                  </p>
                  <p className="text-xs text-gray-400">
                    Supported formats: PowerPoint (.PPTX), Documents (.DOCX,
                    .DOC/PDF), Audio (.MP3, .WAV)
                  </p>
                </div>

                {/* Uploaded Files Display */}
                {uploadedFiles.length > 0 && (
                  <div className="border-2 border-dashed border-gray-400 rounded-lg p-4 bg-gray-100">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">
                      Uploaded Files:
                    </h4>
                    <div className="space-y-2">
                      {uploadedFiles.map((file) => {
                        const FileIcon = getFileIcon(file.name);
                        return (
                          <div
                            key={file.id}
                            className="flex items-center justify-between bg-white p-3 rounded-lg border"
                          >
                            <div className="flex items-center gap-3">
                              <div className="p-2 bg-gray-200 rounded">
                                <FileIcon size={16} className="text-gray-700" />
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-800">
                                  {file.name}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {(file.size / 1024 / 1024).toFixed(2)} MB
                                </div>
                              </div>
                            </div>
                            <button
                              onClick={() => removeFile(file.id)}
                              className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                            >
                              <X size={16} className="text-gray-600" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                    Category & Tags
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-600 focus:ring-1 focus:border-transparent"
                  >
                    <option value="">Select</option>
                    <option value="language">Language</option>
                    <option value="history">History</option>
                    <option value="culture">Culture</option>
                  </select>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={handleSubmit}
                    className="flex-1 bg-custom-blue hover:bg-blue-500 text-white py-3 rounded-md font-medium transition-all duration-200 transform shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    {editingContent !== null
                      ? "Update Content"
                      : "Upload & Submit for Review"}
                  </button>
                  {editingContent !== null && (
                    <button
                      onClick={handleCancelEdit}
                      className="flex-1 bg-gray-400 hover:bg-gray-500 text-white py-3 rounded-md font-medium transition-all duration-200 transform shadow-lg hover:shadow-xl hover:scale-105"
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Content Manager */}
            <div className="bg-white shadow-sm p-6 border-2 rounded-sm">
              <h1 className="py-2 border-b-2 border-gray-600 text-2xl font-semibold">
                Content Manager
              </h1>

              <div className="mt-6">
                <div className="grid grid-cols-4 gap-4 text-sm font-medium text-gray-600 border-b pb-2 mb-4">
                  <div>Content</div>
                  <div>Status</div>
                  <div>Views</div>
                  <div>Actions</div>
                </div>

                <div className="space-y-3">
                  {contentData.length > 0 ? (
                    contentData.map((item) => (
                      <div
                        key={item._id}
                        className="grid grid-cols-4 gap-4 items-center py-2 hover:bg-gray-50 rounded"
                      >
                        <div className="text-sm text-gray-800">
                          {item.title}
                        </div>
                        <div>
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              item.status === "Published"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {item.status}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {item.views}
                        </div>
                        <div className="flex gap-1">
                          <ActionButton
                            icon={Edit}
                            label=""
                            variant="edit"
                            onClick={() => handleEditClick(item)}
                          />
                          <ActionButton
                            icon={Trash2}
                            label=""
                            variant="delete"
                            onClick={() => handleDeleteClick(item)}
                          />
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 mt-4">
                      You have not uploaded any content yet.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mt-2">
            {/* Upload Analytics */}
            <div className="bg-white shadow-sm p-6 border-2 rounded-sm">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <BarChart3 size={20} />
                Upload Analytics
              </h3>

              <h4 className="text-sm font-medium text-gray-700 mb-4">
                Donations Received via courses
              </h4>

              {/* Year Selector */}
              <div className="mb-4">
                <label
                  htmlFor="year-select"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Select Year:
                </label>
                <select
                  id="year-select"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-transparent"
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>

              {/* Chart */}
              <div className="h-64 flex items-end justify-between gap-2 mb-4">
                {chartData[selectedYear] && (
                  <div className="flex flex-col items-center flex-1">
                    <div
                      className="flex flex-col-reverse items-center w-full"
                      style={{ height: "200px" }}
                    >
                      <div className="w-full flex gap-1 items-end">
                        <div
                          className="bg-gray-600 rounded-t transition-all duration-500 hover:bg-gray-700 cursor-pointer"
                          style={{
                            height: `${
                              (chartData[selectedYear].donations / maxValue) *
                              100
                            }%`,
                            width: "30%",
                          }}
                          title={`Donations: ${chartData[selectedYear].donations}m`}
                        />
                        <div
                          className="bg-gray-500 rounded-t transition-all duration-500 hover:bg-gray-600 cursor-pointer"
                          style={{
                            height: `${
                              (chartData[selectedYear].contributions /
                                maxValue) *
                              100
                            }%`,
                            width: "30%",
                          }}
                          title={`Contributions: ${chartData[selectedYear].contributions}m`}
                        />
                        <div
                          className="bg-gray-800 rounded-t transition-all duration-500 hover:bg-gray-900 cursor-pointer"
                          style={{
                            height: `${
                              (chartData[selectedYear].other / maxValue) * 100
                            }%`,
                            width: "30%",
                          }}
                          title={`Other: ${chartData[selectedYear].other}m`}
                        />
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 mt-2">
                      {selectedYear}
                    </div>
                  </div>
                )}
              </div>

              {/* Y-axis labels */}
              <div className="flex justify-between text-xs text-gray-400 mb-2">
                <span>0</span>
                <span>NPRs20</span>
                <span>NPRs40</span>
                <span>NPRs60</span>
                <span>NPRs80</span>
                <span>NPRs100</span>
                <span>NPRs120</span>
                <span>NPRs140</span>
              </div>

              {/* Legend */}
              <div className="flex gap-4 text-xs mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gray-600 rounded"></div>
                  <span>Donations</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gray-500 rounded"></div>
                  <span>Contributions</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gray-800 rounded"></div>
                  <span>Other Income</span>
                </div>
              </div>
            </div>

            {/* Upload Log */}
            <div className="bg-white shadow-sm p-6 border-2 rounded-sm">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800">
                <Clock size={20} />
                Upload Log
              </h3>

              <div className="space-y-3">
                {contentData.map((item, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg transition-colors ${
                      item.status === "Published"
                        ? "bg-green-50 border border-green-200"
                        : "bg-yellow-50 border border-yellow-200"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">
                        "{item.title}"
                      </span>
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          item.status === "Published"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {item.status.toLowerCase()}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {item.date}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
