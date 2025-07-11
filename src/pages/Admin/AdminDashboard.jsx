import { motion } from "framer-motion";
import {
  Check,
  DollarSign,
  Download,
  Edit,
  Eye,
  FileText,
  Home,
  Plus,
  Trash2,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const dashboardStats = [
    { title: "Total Users", value: "156", color: "bg-gray-50 text-gray-700" },
    {
      title: "Published Content",
      value: "89",
      color: "bg-gray-50 text-gray-700",
    },
    {
      title: "Pending Reviews",
      value: "12",
      color: "bg-gray-50 text-gray-700",
    },
    {
      title: "Total Donations",
      value: "$2341",
      color: "bg-gray-50 text-gray-700",
    },
  ];

  const [users, setUsers] = useState([
    {
      name: "John Smith",
      email: "john@example.com",
      role: "Teacher",
      status: "Active",
      joinDate: "2024-01-15",
    },
    {
      name: "Sarah Johnson",
      email: "sarah@example.com",
      role: "Teacher",
      status: "Active",
      joinDate: "2024-02-10",
    },
    {
      name: "Mike Wilson",
      email: "mike@example.com",
      role: "Teacher",
      status: "Inactive",
      joinDate: "2024-01-20",
    },
  ]);

  const [content, setContent] = useState([
    {
      title: "Introduction to Mathematics",
      author: "John Smith",
      category: "Mathematics",
      status: "Published",
      uploadDate: "2024-05-15",
    },
    {
      title: "Basic English Grammar",
      author: "Sarah Johnson",
      category: "English",
      status: "Published",
      uploadDate: "2024-05-12",
    },
    {
      title: "Science Fundamentals",
      author: "Mike Wilson",
      category: "Science",
      status: "Pending",
      uploadDate: "2024-05-20",
    },
  ]);

  const [reviewQueue, setReviewQueue] = useState([
    {
      title: "Science Fundamentals",
      author: "Mike Wilson",
      category: "Science",
      type: "Video",
      uploadDate: "2024-05-20",
    },
    {
      title: "History Basics",
      author: "Emma Davis",
      category: "History",
      type: "Document",
      uploadDate: "2024-05-18",
    },
  ]);

  const [donations, setDonations] = useState([
    {
      donor: "Anonymous",
      amount: "$25",
      date: "2024-05-20",
      content: "Introduction to Mathematics",
    },
    {
      donor: "Jane Doe",
      amount: "$50",
      date: "2024-05-19",
      content: "Basic English Grammar",
    },
    {
      donor: "Anonymous",
      amount: "$15",
      date: "2024-05-18",
      content: "Science Fundamentals",
    },
  ]);

  const showFeedback = (message) => {
    setFeedbackMessage(message);
    setTimeout(() => {
      setFeedbackMessage("");
    }, 3000); // Clear message after 3 seconds
  };

  // User Management Handlers
  const handleAddUser = () => {
    const newUser = {
      name: "New User",
      email: "newuser@example.com",
      role: "Student",
      status: "Active",
      joinDate: new Date().toISOString().slice(0, 10),
    };
    setUsers([...users, newUser]);
    showFeedback("New user added successfully!");
  };

  const handleDeleteUser = (email) => {
    setUsers(users.filter((user) => user.email !== email));
    showFeedback("User deleted successfully!");
  };

  const handleEditUser = (email) => {
    showFeedback(`Edit user: ${email} (functionality not implemented)`);
  };

  // Content Management Handlers
  const handleDeleteContent = (title) => {
    setContent(content.filter((item) => item.title !== title));
    showFeedback("Content deleted successfully!");
  };

  const handleViewContent = (title) => {
    showFeedback(`Viewing content: ${title} (preview not available)`);
  };

  const handleEditContent = (title) => {
    showFeedback(`Edit content: ${title} (functionality not implemented)`);
  };

  // Review Queue Handlers
  const handleApproveReview = (title) => {
    setReviewQueue(reviewQueue.filter((item) => item.title !== title));
    const approvedContent = reviewQueue.find((item) => item.title === title);
    if (approvedContent) {
      // Optionally add to published content, for this example we just remove from review queue
      setContent([...content, { ...approvedContent, status: "Published" }]);
    }
    showFeedback(`The content "${title}" has been approved.`);
  };

  const handleRequestChanges = (title) => {
    setReviewQueue(reviewQueue.filter((item) => item.title !== title));
    showFeedback(`Changes requested for "${title}".`);
  };

  const handleRejectReview = (title) => {
    setReviewQueue(reviewQueue.filter((item) => item.title !== title));
    showFeedback(`The content "${title}" has been rejected.`);
  };

  // Donation Management Handlers
  const handleExportReport = () => {
    showFeedback("Donation report exported successfully!");
  };

  const NavButton = ({ icon: Icon, label, isActive, onClick }) => (
    <button
      onClick={onClick}
      className={`flex items-center space-x-3 px-6 py-3 rounded-md transition-colors w-full text-left ${
        isActive
          ? "bg-gray-800 text-gray-50 font-medium"
          : "text-gray-600 hover:bg-gray-200"
      }`}
    >
      <Icon size={20} />
      <span>{label}</span>
    </button>
  );

  const StatCard = ({ title, value, color }) => (
    <div className={`${color} p-6 rounded-lg`}>
      <div className="text-3xl font-bold mb-2">{value}</div>
      <div className="text-sm font-medium">{title}</div>
    </div>
  );

  const StatusBadge = ({ status }) => {
    const statusColors = {
      Active: "bg-green-100 text-green-800",
      Inactive: "bg-red-100 text-red-800",
      Published: "bg-green-100 text-green-800",
      Pending: "bg-yellow-100 text-yellow-800",
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium ${
          statusColors[status] || "bg-gray-100 text-gray-800"
        }`}
      >
        {status}
      </span>
    );
  };

  const ActionButton = ({ icon: Icon, onClick, variant = "default" }) => {
    const variants = {
      default: "text-gray-600 hover:text-gray-600",
      delete: "text-gray-600 hover:text-red-600",
    };

    return (
      <button
        onClick={onClick}
        className={`p-2 rounded transition-colors ${variants[variant]}`}
      >
        <Icon size={16} />
      </button>
    );
  };

  const renderDashboard = () => (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 border-2">
          {dashboardStats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>
      </motion.div>
    </div>
  );

  const renderUserManagement = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-black">User Management</h2>
          <button
            onClick={handleAddUser}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-700 transition-colors"
          >
            <Plus size={16} />
            <span>Add User</span>
          </button>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b-2">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Join Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs font-medium">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={user.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {user.joinDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <div className="flex space-x-2">
                      <ActionButton
                        icon={Edit}
                        onClick={() => handleEditUser(user.email)}
                      />
                      <ActionButton
                        icon={Trash2}
                        onClick={() => handleDeleteUser(user.email)}
                        variant="delete"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );

  const renderContentManagement = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-cente mb-4">
          <h2 className="text-2xl font-bold text-black">Content Management</h2>
          <div className="flex space-x-4">
            <select className="border border-gray-300 rounded-lg px-4 py-2 text-sm">
              <option>All Categories</option>
              <option>Mathematics</option>
              <option>English</option>
              <option>Science</option>
            </select>
            <select className="border border-gray-300 rounded-lg px-4 py-2 text-sm">
              <option>All Status</option>
              <option>Published</option>
              <option>Pending</option>
            </select>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Author
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Upload Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {content.map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
                    {item.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {item.author}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {item.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {item.uploadDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <div className="flex space-x-2">
                      <ActionButton
                        icon={Eye}
                        onClick={() => handleViewContent(item.title)}
                      />
                      <ActionButton
                        icon={Edit}
                        onClick={() => handleEditContent(item.title)}
                      />
                      <ActionButton
                        icon={Trash2}
                        onClick={() => handleDeleteContent(item.title)}
                        variant="delete"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );

  const renderReviewQueue = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-black">Review Queue</h2>
          <span className="text-gray-600">
            {reviewQueue.length} items pending review
          </span>
        </div>

        <div className="space-y-6">
          {reviewQueue.length === 0 ? (
            <div className="bg-white rounded-lg border border-gray-200 p-6 text-center text-gray-500">
              No items in the review queue.
            </div>
          ) : (
            reviewQueue.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg border border-gray-200 p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-black">
                      {item.title}
                    </h3>
                    <p className="text-gray-600">
                      by {item.author} • {item.category} • {item.type}
                    </p>
                    <p className="text-sm text-gray-500">
                      Uploaded on {item.uploadDate}
                    </p>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => handleApproveReview(item.title)}
                      className="bg-teal-600 text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-teal-700 transition-colors"
                    >
                      <Check size={16} />
                      <span>Approve</span>
                    </button>
                    <button
                      onClick={() => handleRequestChanges(item.title)}
                      className="bg-yellow-600 text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-yellow-700 transition-colors"
                    >
                      <Edit size={16} />
                      <span>Request Changes</span>
                    </button>
                    <button
                      onClick={() => handleRejectReview(item.title)}
                      className="bg-red-700 text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-red-800 transition-colors"
                    >
                      <X size={16} />
                      <span>Reject</span>
                    </button>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-gray-600 text-sm">
                  Content preview would appear here...
                </div>
              </div>
            ))
          )}
        </div>
      </motion.div>
    </div>
  );

  const renderDonations = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-black">Donation Management</h2>
          <button
            onClick={handleExportReport}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-700 transition-colors"
          >
            <Download size={16} />
            <span>Export Report</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-50 text-gray-700 p-6 rounded-lg">
            <div className="text-3xl font-bold mb-2">$2,341</div>
            <div className="text-sm font-medium">Total Donations</div>
          </div>
          <div className="bg-gray-50 text-gray-700 p-6 rounded-lg">
            <div className="text-3xl font-bold mb-2">47</div>
            <div className="text-sm font-medium">Total Donors</div>
          </div>
          <div className="bg-gray-50 text-gray-700 p-6 rounded-lg">
            <div className="text-3xl font-bold mb-2">$49.81</div>
            <div className="text-sm font-medium">Average Donation</div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Donor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Content
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {donations.map((donation, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
                    {donation.donor}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                    {donation.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {donation.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {donation.content}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "users":
        return renderUserManagement();
      case "content":
        return renderContentManagement();
      case "review":
        return renderReviewQueue();
      case "donations":
        return renderDonations();
      default:
        return renderDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-80 bg-white shadow-sm border-r border-gray-200 min-h-screen">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-600 rounded-lg flex items-center justify-center">
                <Home className="text-white" size={20} />
              </div>
              <h1 className="text-xl font-bold text-black">Admin Dashboard</h1>
            </div>
          </div>

          <nav className="p-4 space-y-2">
            <NavButton
              icon={Home}
              label="Dashboard"
              isActive={activeTab === "dashboard"}
              onClick={() => setActiveTab("dashboard")}
            />
            <NavButton
              icon={Users}
              label="User Management"
              isActive={activeTab === "users"}
              onClick={() => setActiveTab("users")}
            />
            <NavButton
              icon={FileText}
              label="Content Management"
              isActive={activeTab === "content"}
              onClick={() => setActiveTab("content")}
            />
            <NavButton
              icon={Eye}
              label="Review Queue"
              isActive={activeTab === "review"}
              onClick={() => setActiveTab("review")}
            />
            <NavButton
              icon={DollarSign}
              label="Donations"
              isActive={activeTab === "donations"}
              onClick={() => setActiveTab("donations")}
            />
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {feedbackMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-cyan-50 bg-opacity-16 border border-blue-400 text-cyan-900 px-4 py-3 rounded relative mb-6"
              role="alert"
            >
              <span className="block sm:inline">{feedbackMessage}</span>
            </motion.div>
          )}
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
