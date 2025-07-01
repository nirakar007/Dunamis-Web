import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };
  return (
    <nav className="flex justify-between items-center h-16 px-6 md:h-16 lg:h-20">
      <button
        onClick={() => handleNavigation("/")}
        className="font-semibold text-3xl hover:text-cyan-500 transition duration-200 ease-in-out"
      >
        Dunamis
      </button>

      <div className="flex justify-evenly space-x-8 mx-10">
        <button
          onClick={() => handleNavigation("/resources")}
          className="transition duration-300 ease-in-out hover:underline hover:underline-offset-4"
        >
          Resources
        </button>

        <button
          onClick={() => handleNavigation("/about")}
          className="transition duration-300 ease-in-out hover:underline hover:underline-offset-4"
        >
          About Us
        </button>

        <button
          onClick={() => handleNavigation("/contact")}
          className="transition duration-300 ease-in-out hover:underline hover:underline-offset-4"
        >
          Contact
        </button>

        <button
          onClick={() => handleNavigation("/faq")}
          className="transition duration-300 ease-in-out hover:underline hover:underline-offset-4"
        >
          FAQs
        </button>

        <button
          onClick={() => handleNavigation("/donate")}
          className="hover:text-green-600 transition duration-200 ease-in-out hover:underline hover:underline-offset-4"
        >
          Donate
        </button>

        <RoleDropdown />
      </div>
    </nav>
  );
}

export default Navbar;

function RoleDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="relative inline-block text-left">
      {/* Trigger Button (Circle Icon) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center focus:outline-none"
      >
        <div className="w-3 h-3 bg-white rounded-full"></div>
      </button>

      {/* Dropdown Box */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 p-1 bg-white border border-gray-300 rounded shadow-lg z-50">
          <div className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-t">
            Log in as
          </div>
          <button
            onClick={() => handleNavigation("/auth")}
            className="w-full text-left px-4 py-2 hover:bg-slate-200 font-medium rounded-b-lg transition duration-300 ease-in-out"
          >
            Teacher
          </button>
        </div>
      )}
    </div>
  );
}
