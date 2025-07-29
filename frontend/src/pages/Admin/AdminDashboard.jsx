import axios from "axios";
import { motion } from "framer-motion";
import {
  DollarSign,
  Eye,
  FileText,
  Home,
  LogOut,
  Trash2,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const navigate = useNavigate();

  // --- REAL DATA STATE ---
  const [users, setUsers] = useState([]);
  const [allContent, setAllContent] = useState([]);
  const [donations, setDonations] = useState([]); // Still dummy data for now

  // --- Authentication & Data Fetching ---
  const getToken = () => localStorage.getItem("token");

  const showFeedback = (message) => {
    setFeedbackMessage(message);
    setTimeout(() => setFeedbackMessage(""), 3000);
  };

  const fetchData = async () => {
    const token = getToken();
    if (!token) {
      navigate("/auth");
      return;
    }

    try {
      // Fetch all data in parallel for efficiency
      const [usersRes, contentRes, donationsRes] = await Promise.all([
        axios.get("/api/admin/users", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("/api/admin/content", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("/api/admin/donations", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);
      console.log("RAW RESPONSE FROM /api/admin/content:", contentRes.data);

      setUsers(usersRes.data.data);
      setAllContent(contentRes.data.data);
      setDonations(donationsRes.data.data);
    } catch (error) {
      console.error("Failed to fetch admin data:", error);
      if (error.response?.status === 403) {
        showFeedback("Access Denied. You are not an admin.");
        setTimeout(() => navigate("/teacher"), 3000); // Redirect non-admins
      } else {
        showFeedback("Could not load admin data.");
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --- Derived State for UI ---
  const pendingContent = allContent.filter((item) => item.status === "Pending");
  const publishedContent = allContent.filter(
    (item) => item.status === "Published"
  );

  // const dashboardStats = [
  //   { title: "Total Users", value: "1", color: "bg-gray-50 text-gray-700" },
  //   {
  //     title: "Published Content",
  //     value: "9",
  //     color: "bg-gray-50 text-gray-700",
  //   },
  //   {
  //     title: "Pending Reviews",
  //     value: "2",
  //     color: "bg-gray-50 text-gray-700",
  //   },
  //   {
  //     title: "Total Donations",
  //     value: "Rs 900",
  //     color: "bg-gray-50 text-gray-700",
  //   },
  // ];

  const dashboardStats = [
    { title: "Total Users", value: users.length },
    { title: "Published Content", value: publishedContent.length },
    { title: "Pending Reviews", value: pendingContent.length },
    {
      title: "Total Donations",
      value: `Rs ${donations.reduce((sum, d) => sum + d.amount, 0)}`,
    }, // Dummy
  ];

  // --- Handlers for Admin Actions ---
  const handleApprove = async (contentId) => {
    const token = getToken();
    try {
      await axios.put(
        `/api/admin/content/${contentId}/status`,
        { status: "Published" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      showFeedback("Content has been approved and published!");
      fetchData(); // Refresh all data
    } catch (error) {
      showFeedback("Failed to approve content.");
    }
  };

  const handleReject = async (contentId) => {
    const token = getToken();
    try {
      await axios.put(
        `/api/admin/content/${contentId}/status`,
        { status: "Rejected" },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      showFeedback("Content has been rejected.");
      fetchData(); // Refresh all data
    } catch (error) {
      showFeedback("Failed to reject content.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth");
  };

  // const [users, setUsers] = useState([
  //   {
  //     name: "Namikaze Minato",
  //     email: "namikazeminato@gmail.com",
  //     role: "Teacher",
  //     status: "Active",
  //     joinDate: "2025-07-15",
  //   },
  //   {
  //     name: "Admin",
  //     email: "admin123@gmail.com",
  //     role: "Admin",
  //     status: "Active",
  //     joinDate: "2025-03-24 ",
  //   },
  // ]);

  // const [content, setContent] = useState([]);

  // const [reviewQueue, setReviewQueue] = useState([
  //   {
  //     title: "German For Beginners",
  //     author: "Namikaze Minato",
  //     category: "Language",
  //     type: "Video",
  //     uploadDate: "2025-07-15",
  //   },
  //   {
  //     title: "History of Japan",
  //     author: "Namikaze Minato",
  //     category: "Language",
  //     type: "Document",
  //     uploadDate: "2025-06-01",
  //   },
  // ]);

  // const [donations, setDonations] = useState([
  //   {
  //     donor: "Anonymous",
  //     amount: "Rs1500",
  //     date: "2025-07-29",
  //     content: "",
  //   },
  // ]);

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
  const handleDeleteContent = async (contentId, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }

    const token = getToken();
    try {
      await axios.delete(`/api/admin/content/${contentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      showFeedback("Content deleted successfully!");
      fetchData(); // <-- CRITICAL: Refresh the data from the server
    } catch (error) {
      console.error("Failed to delete content:", error);
      showFeedback("Error deleting content.");
    }
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
          {/* <button
            onClick={handleAddUser}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-700 transition-colors"
          >
            <Plus size={16} />
            <span>Add User</span>
          </button> */}
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
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {user.role}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={"Active"} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <ActionButton
                      icon={Trash2}
                      variant="delete"
                      onClick={() => alert("User deletion coming soon!")}
                    />
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
          {/* <div className="flex space-x-4">
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
          </div> */}
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
              {allContent.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
                    {item.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {item.teacher?.name || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {item.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <ActionButton
                      icon={Trash2}
                      variant="delete"
                      onClick={() => handleDeleteContent(item._id, item.title)}
                    />
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
      <h2 className="text-2xl font-bold">
        Review Queue ({pendingContent.length})
      </h2>
      <div className="space-y-4">
        {pendingContent.length === 0 ? (
          <p>No items pending review.</p>
        ) : (
          pendingContent.map((item) => (
            <div key={item._id} className="bg-white rounded-lg border p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm text-gray-600">
                    by {item.teacher.name} • {item.category}
                  </p>
                  <p className="text-xs text-gray-400">
                    Uploaded on {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleApprove(item._id)}
                    className="bg-teal-600 text-white px-3 py-1 rounded hover:bg-teal-700"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(item._id)}
                    className="bg-red-700 text-white px-3 py-1 rounded hover:bg-red-800"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
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
          {/* <button
            onClick={handleExportReport}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-gray-700 transition-colors"
          >
            <Download size={16} />
            <span>Export Report</span>
          </button> */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-50 text-gray-700 p-6 rounded-lg">
            <div className="text-3xl font-bold mb-2">
              Rs {donations.reduce((sum, d) => sum + d.amount, 0)}
            </div>
            <div className="text-sm font-medium">Total Donations</div>
          </div>
          <div className="bg-gray-50 text-gray-700 p-6 rounded-lg">
            <div className="text-3xl font-bold mb-2">{donations.length}</div>
            <div className="text-sm font-medium">Total Donations</div>
          </div>
          <div className="bg-gray-50 text-gray-700 p-6 rounded-lg">
            <div className="text-3xl font-bold mb-2">
              Rs{" "}
              {donations.length > 0
                ? (
                    donations.reduce((sum, d) => sum + d.amount, 0) /
                    donations.length
                  ).toFixed(2)
                : 0}
            </div>
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
              {donations.map((donation) => (
                <tr key={donation._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">
                    {donation.donorName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-600">
                    Rs {donation.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(donation.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {donation.purpose}
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

          <div className="flex justify-center space-x-2 mt-20 rounded-md hover:bg-red-50 transition duration-300 p-2">
            <LogOut size={16} />
            <button
              className="-mt-1 transition duration-300 hover:text-red-800"
              onClick={() => {
                handleLogout();
              }}
            >
              Logout
            </button>
          </div>
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
