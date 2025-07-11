import { Route, Routes } from "react-router-dom";

// Import your page components based on your folder structure
import AboutUsPage from "../pages/Viewer/Main/AboutUsPage";
import ContactPage from "../pages/Viewer/Main/ContactPage";
import DonatePage from "../pages/Viewer/Main/DonatePage";
import Homepage from "../pages/Viewer/Main/Homepage";
import ResourcesPage from "../pages/Viewer/Main/ResourcesPage";

// Admin routes
import AdminDashboard from "../pages/Admin/AdminDashboard";

// Teacher routes
import AuthPages from "../pages/Auth/AuthPages";
import TeacherDashboard from "../pages/Teacher/TeacherDashboard";
import FAQPage from "../pages/Viewer/Main/components/FAQPage";

// Optional: 404 Not Found component
const NotFound = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
    <div className="text-center">
      <h1 className="text-6xl font-bold text-gray-400 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Page Not Found
      </h2>
      <p className="text-gray-600 mb-8">
        The page you're looking for doesn't exist.
      </p>
      <button
        onClick={() => (window.location.href = "/")}
        className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
      >
        Go Home
      </button>
    </div>
  </div>
);

const AppRoutes = () => {
  return (
    <Routes>
      {/* Viewer/Public routes */}
      <Route path="/" element={<Homepage />} />
      <Route path="/home" element={<Homepage />} />
      <Route path="/about" element={<AboutUsPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/faq" element={<FAQPage />} />
      <Route path="/donate" element={<DonatePage />} />
      <Route path="/resources" element={<ResourcesPage />} />

      {/* Login and Registration portal */}
      <Route path="/auth" element={<AuthPages />} />

      {/* Admin routes */}
      <Route path="/admin" element={<AdminDashboard />} />

      {/* Teacher routes */}
      <Route path="/teacher" element={<TeacherDashboard />} />

      {/* Catch-all route for 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
