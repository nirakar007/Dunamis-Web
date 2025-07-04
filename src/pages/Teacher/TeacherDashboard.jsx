import { motion } from "framer-motion";
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
import { useState } from "react";
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
    delete: "bg-gray-800 hover:bg-gray-900 text-white text-xs px-2 py-1",
  };

  return (
    <button className={`${baseClasses} ${variants[variant]}`} onClick={onClick}>
      <Icon size={variant === "edit" || variant === "delete" ? 12 : 16} />
      {label}
    </button>
  );
};

export default function TeacherDashboard() {
  const [name, setName] = useState("Namikaze Minato");
  const [contentTitle, setContentTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [selectedYear, setSelectedYear] = useState("2016");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
  };

  const contentData = [
    {
      title: "Learn Japanese",
      status: "Published",
      views: 122,
      date: "March 24, 2025 - 15 days ago",
    },
    {
      title: "Your First Step into Japanese",
      status: "Published",
      views: 122,
      date: "March 27, 2025 - 12 days ago",
    },
    {
      title: "History of Japan",
      status: "Pending",
      views: 0,
      date: "June 1, 2025 - 3 days ago",
    },
  ];

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
  };

  const maxValue = 100;
  const years = Object.keys(chartData);

  // File upload handlers
  const handleFileUpload = (files) => {
    const newFiles = Array.from(files).map((file) => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type,
      file: file,
    }));
    setUploadedFiles((prev) => [...prev, ...newFiles]);
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
    handleFileUpload(files);
  };

  const handleFileInputChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      handleFileUpload(files);
    }
  };

  const removeFile = (fileId) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== fileId));
  };

  const getFileIcon = (fileName) => {
    const extension = fileName.split(".").pop().toLowerCase();
    if (extension === "pdf") return File;
    if (["mp3", "wav", "ogg"].includes(extension)) return Music;
    return FileText;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <header className="bg-white border-b border-gray-200 py-4">
          <div className="flex items-center justify-between p-1 mt-2">
            <h2 className="text-2xl text-gray-700 shadow-sm font-semibold mb-2 flex items-center gap-2 px-8">
              <BarChart3 size={20} />
              Teacher Dashboard
            </h2>
            <div className="flex items-center gap-6 px-20">
              <div className="flex items-center gap-2">
                <User size={16} />
                <span className="text-sm">{name}</span>
              </div>
              <div className="flex items-center gap-1 text-gray-800">
                <Star size={16} className="text-gray-500" fill="gray" />
                <span className="text-sm">Ratings: 5/10</span>
              </div>
              <button className="flex items-center gap-2">
                <Globe size={16} />
                <span className="text-sm">Go to website</span>
              </button>
              <button
                onClick={() => {
                  handleClick("/auth");
                }}
                className="flex items-center gap-2 text-gray-500 hover:text-gray-700"
              >
                <LogOut size={16} />
                <span className="text-sm hover:text-red-800">Log out</span>
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
                value="3"
                bgColor="bg-gray-100"
                textColor="text-gray-800"
              />
              <DashboardCard
                title="Pending Review"
                value="2"
                bgColor="bg-gray-200"
                textColor="text-gray-800"
              />
              <DashboardCard
                title="Total Views"
                value="376"
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 border-2 rounded-sm">
            {/* Upload Content */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h1 className="py-2 border-b-2 border-custom-blue text-2xl font-semibold">
                Upload New Content
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

                <button className="w-full bg-custom-blue hover:bg-blue-900 text-white py-3 rounded-md font-medium transition-all duration-200 transform shadow-lg hover:shadow-xl">
                  Upload & Submit for Review
                </button>
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
                  {contentData.map((item, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-4 gap-4 items-center py-2 hover:bg-gray-50 rounded"
                    >
                      <div className="text-sm text-gray-800">{item.title}</div>
                      <div>
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            item.status === "Published"
                              ? "bg-gray-300 text-gray-800"
                              : "bg-gray-200 text-gray-700"
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">{item.views}</div>
                      <div className="flex gap-1">
                        <ActionButton icon={Edit} label="" variant="edit" />
                        <ActionButton icon={Trash2} label="" variant="delete" />
                      </div>
                    </div>
                  ))}
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

              {/* Chart */}
              <div className="h-64 flex items-end justify-between gap-2 mb-4">
                {years.map((year) => {
                  const data = chartData[year];
                  const donationHeight = (data.donations / maxValue) * 100;
                  const contributionHeight =
                    (data.contributions / maxValue) * 100;
                  const otherHeight = (data.other / maxValue) * 100;

                  return (
                    <div
                      key={year}
                      className="flex flex-col items-center flex-1"
                    >
                      <div
                        className="flex flex-col-reverse items-center w-full"
                        style={{ height: "200px" }}
                      >
                        <div className="w-full flex gap-1 items-end">
                          <div
                            className="bg-gray-600 rounded-t transition-all duration-500 hover:bg-gray-700"
                            style={{
                              height: `${donationHeight}%`,
                              width: "30%",
                            }}
                            title={`Donations: ${data.donations}m`}
                          />
                          <div
                            className="bg-gray-500 rounded-t transition-all duration-500 hover:bg-gray-600"
                            style={{
                              height: `${contributionHeight}%`,
                              width: "30%",
                            }}
                            title={`Contributions: ${data.contributions}m`}
                          />
                          <div
                            className="bg-gray-800 rounded-t transition-all duration-500 hover:bg-gray-900"
                            style={{ height: `${otherHeight}%`, width: "30%" }}
                            title={`Other: ${data.other}m`}
                          />
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 mt-2">{year}</div>
                    </div>
                  );
                })}
              </div>

              {/* Y-axis labels */}
              <div className="flex justify-between text-xs text-gray-400 mb-2">
                <span>0</span>
                <span>NPRs20</span>
                <span>NPRs40</span>
                <span>NPRs60</span>
                <span>NPRs80</span>
                <span>NPRs100</span>
              </div>

              {/* Legend */}
              <div className="flex gap-4 text-xs mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-gray-600 rounded"></div>
                  <span>Donations, contributions & other income</span>
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
                    className={`p-3 rounded-lg ${
                      item.status === "Published"
                        ? "bg-gray-200"
                        : "bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">
                        "{item.title}"
                      </span>
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          item.status === "Published"
                            ? "bg-gray-300 text-gray-800"
                            : "bg-gray-200 text-gray-700"
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
      </motion.div>
    </div>
  );
}
