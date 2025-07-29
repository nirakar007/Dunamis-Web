import axios from "axios";
import { motion } from "framer-motion";
import { jwtDecode } from "jwt-decode";
import { CheckCircle, Eye, EyeOff, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// --- Helper function to decode the token ---
const decodeToken = (token) => {
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

// TermsModal Component - Added to make the code self-contained
const TermsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-lg w-full m-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <XCircle size={24} />
        </button>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Terms and Conditions
        </h2>
        <div className="text-sm text-gray-700 max-h-96 overflow-y-auto pr-2">
          <p className="mb-2">
            Welcome to Dunamis! These terms and conditions outline the rules and
            regulations for the use of Dunamis's Website.
          </p>
          <p className="mb-2">
            By accessing this website we assume you accept these terms and
            conditions. Do not continue to use Dunamis if you do not agree to
            take all of the terms and conditions stated on this page.
          </p>
          <h3 className="font-semibold mt-4 mb-2">License</h3>
          <p className="mb-2">
            Unless otherwise stated, Dunamis and/or its licensors own the
            intellectual property rights for all material on Dunamis. All
            intellectual property rights are reserved. You may access this from
            Dunamis for your own personal use subjected to restrictions set in
            these terms and conditions.
          </p>
          <p className="mb-2">You must not:</p>
          <ul className="list-disc list-inside mb-2">
            <li>Republish material from Dunamis</li>
            <li>Sell, rent or sub-license material from Dunamis</li>
            <li>Reproduce, duplicate or copy material from Dunamis</li>
            <li>Redistribute content from Dunamis</li>
          </ul>
          <h3 className="font-semibold mt-4 mb-2">User Comments</h3>
          <ul className="list-disc list-inside mb-2">
            <li>This Agreement shall begin on the date hereof.</li>
            <li>
              Certain parts of this website offer the opportunity for users to
              post and exchange opinions and information in certain areas of the
              website. Dunamis does not filter, edit, publish or review Comments
              prior to their presence on the website. Comments do not reflect
              the views and opinions of Dunamis,its agents and/or affiliates.
              Comments reflect the views and opinions of the person who post
              their views and opinions. To the extent permitted by applicable
              laws, Dunamis shall not be liable for the Comments or for any
              liability, damages or expenses caused and/or suffered as a result
              of any use of and/or posting of and/or appearance of the Comments
              on this website.
            </li>
            <li>
              Dunamis reserves the right to monitor all Comments and to remove
              any Comments which can be considered inappropriate, offensive or
              causes breach of these Terms and Conditions.
            </li>
          </ul>
          <p className="mb-2">You warrant and represent that:</p>
          <ul className="list-disc list-inside mb-2">
            <li>
              You are entitled to post the Comments on our website and have all
              necessary licenses and consents to do so;
            </li>
            <li>
              The Comments do not invade any intellectual property right,
              including without limitation copyright, patent or trademark of any
              third party;
            </li>
            <li>
              The Comments do not contain any defamatory, libelous, offensive,
              indecent or otherwise unlawful material which is an invasion of
              privacy
            </li>
            <li>
              The Comments will not be used to solicit or promote business or
              custom or present commercial activities or unlawful activity.
            </li>
          </ul>
          <p>
            You hereby grant Dunamis a non-exclusive license to use, reproduce,
            edit and authorize others to use, reproduce and edit any of your
            Comments in any and all forms, formats or media.
          </p>
        </div>
        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="bg-custom-blue text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

// Password strength calculation function
const calculatePasswordStrength = (password) => {
  if (!password) return { strength: 0, label: "", color: "" };

  const hasCapital = /[A-Z]/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasNumeric = /[0-9]/.test(password);
  const hasMinLength = password.length >= 8;

  let score = 0;
  if (hasCapital) score++;
  if (hasSpecial) score++;
  if (hasNumeric) score++;
  if (hasMinLength) score++;

  if (score <= 1) {
    return { strength: 25, label: "Weak", color: "bg-red-500" };
  } else if (score === 2) {
    return { strength: 50, label: "Fair", color: "bg-yellow-500" };
  } else if (score === 3) {
    return { strength: 75, label: "Good", color: "bg-yellow-400" };
  } else {
    return { strength: 100, label: "Strong", color: "bg-green-500" };
  }
};

// Check if passwords match
const checkPasswordMatch = (password, confirmPassword) => {
  if (!confirmPassword) return { isMatch: null, color: "" };
  return {
    isMatch: password === confirmPassword,
    color: password === confirmPassword ? "bg-green-500" : "bg-red-500",
  };
};

// Role Dropdown Component
const RoleDropdown = ({
  selectedRole,
  onRoleSelect,
  showDropdown,
  setShowDropdown,
  roles,
}) => (
  <div className="relative">
    <button
      type="button"
      onClick={() => setShowDropdown(!showDropdown)}
      className="flex items-center gap-2 text-custom-blue hover:text-custom-blue transition-colors"
    >
      <div className="w-4 h-4 rounded-full flex items-center justify-center">
        <div className="w-4 h-4 bg-custom-blue rounded-full"></div>
      </div>
      <span className="text-sm font-medium">{selectedRole}</span>
      <svg
        className={`w-4 h-4 transition-transform ${
          showDropdown ? "rotate-180" : ""
        }`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>

    {showDropdown && (
      <>
        <div
          className="fixed inset-0 z-10"
          onClick={() => setShowDropdown(false)}
        />
        <div className="absolute top-full left-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
          {roles.map((role) => (
            <button
              key={role}
              type="button"
              onClick={() => onRoleSelect(role)}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                selectedRole === role
                  ? "bg-blue-50 text-custom-blue"
                  : "text-gray-700"
              }`}
            >
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-custom-blue rounded-full"></div>
                {role}
              </div>
            </button>
          ))}
        </div>
      </>
    )}
  </div>
);

// Forgot Password Page Component
const ForgotPasswordPage = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: "", text: "" });

  const handleResetPassword = () => {
    setSubmitMessage({ type: "", text: "" });
    if (!email || !email.includes("@") || !email.includes(".")) {
      setSubmitMessage({
        type: "error",
        text: "Please enter a valid email address.",
      });
      return;
    }

    setIsSubmitting(true);
    // Simulate API call for password reset
    setTimeout(() => {
      setIsSubmitting(false);
      if (Math.random() > 0.3) {
        // 70% chance of success
        setSubmitMessage({
          type: "success",
          text: "If an account with that email exists, a password reset link has been sent.",
        });
        setEmail(""); // Clear email on success
      } else {
        setSubmitMessage({
          type: "error",
          text: "Failed to send reset link. Please try again.",
        });
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center px-4 pt-16">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="text-start mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Forgot Password?
            </h1>
            <p className="text-gray-600 text-sm">
              Enter your email address below and we'll send you a link to reset
              your password.
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <label
                htmlFor="reset-email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="reset-email"
                name="email"
                placeholder="Enter your email..."
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setSubmitMessage({ type: "", text: "" });
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-custom-blue focus:border-transparent transition-all duration-200"
                disabled={isSubmitting}
              />
            </div>

            <button
              onClick={handleResetPassword}
              className={`w-full bg-gray-900 text-white py-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2
                ${
                  isSubmitting
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-700"
                }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                "Reset Password"
              )}
            </button>

            {submitMessage.text && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-3 flex items-center text-sm ${
                  submitMessage.type === "success"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {submitMessage.type === "success" ? (
                  <CheckCircle className="w-4 h-4 mr-2" />
                ) : (
                  <XCircle className="w-4 h-4 mr-2" />
                )}
                {submitMessage.text}
              </motion.div>
            )}

            <div className="text-center mt-6">
              <button
                type="button"
                onClick={() => setCurrentPage("login")}
                className="text-custom-blue hover:text-custom-blue hover:underline underline-offset-2 font-medium"
              >
                Back to Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Login Page Component
const LoginPage = ({
  formData,
  handleInputChange,
  handleRoleSelect,
  showPassword,
  setShowPassword,
  setCurrentPage,
  showRoleDropdown,
  setShowRoleDropdown,
  roles,
  registeredUsers, // Pass registeredUsers to LoginPage
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: "", text: "" });
  const navigate = useNavigate();

  const decodeToken = (token) => {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error("Failed to decode token:", error);
      return null;
    }
  };

  const handleLogin = async () => {
    // 1. Clear previous messages
    setSubmitMessage({ type: "", text: "" });

    // 2. Client-side validation for empty fields
    if (!formData.email || !formData.password) {
      setSubmitMessage({
        type: "error",
        text: "Please enter both email and password.",
      });
      return; // Stop the function here
    }

    // 3. Client-side validation for email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitMessage({
        type: "error",
        text: "Please enter a valid email address.",
      });
      return; // Stop the function here
    }

    // 4. Set loading state and make the API call
    setIsSubmitting(true);
    try {
      const response = await axios.post("/api/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      // 5. On SUCCESS: Handle the JWT
      const { token } = response.data;
      localStorage.setItem("token", token); // Store token in browser

      const decoded = decodeToken(token); // Decode it to get user info

      setSubmitMessage({
        type: "success",
        text: "Login successful! Redirecting...",
      });

      // 6. Redirect the user based on their role from the token
      // A small delay to allow the user to see the success message
      setTimeout(() => {
        if (decoded && decoded.user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/teacher");
        }
      }, 1000);
    } catch (error) {
      // 7. On FAILURE: Display the error message from the backend
      const errorMsg =
        error.response?.data?.msg ||
        "Login failed. Please check your credentials.";
      setSubmitMessage({ type: "error", text: errorMsg });
    } finally {
      // 8. Always turn off the loading state
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center px-4 pt-16">
      <div className="max-w-6xl w-full flex items-center justify-center gap-12">
        {/* Illustration Section */}
        <div className="hidden lg:flex flex-1 justify-center items-center">
          <div className="relative">
            <div className="w-80 h-80 bg-blue-200 rounded-full relative overflow-hidden">
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-32 bg-gray-800"></div>
              <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 w-1 h-16 bg-gray-800 rotate-45 origin-bottom"></div>
              <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 w-1 h-16 bg-gray-800 -rotate-45 origin-bottom"></div>

              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                <div className="w-8 h-8 bg-pink-300 rounded-full mx-auto mb-1"></div>
                <div className="w-12 h-16 bg-blue-400 rounded-lg mx-auto"></div>
                <div className="absolute top-8 -left-3 w-8 h-2 bg-pink-300 rounded-full rotate-45"></div>
                <div className="absolute top-8 -right-3 w-8 h-2 bg-pink-300 rounded-full -rotate-45"></div>
                <div className="flex justify-center gap-1 mt-1">
                  <div className="w-3 h-12 bg-gray-300 rounded-full"></div>
                  <div className="w-3 h-12 bg-gray-300 rounded-full"></div>
                </div>
              </div>

              <div className="absolute top-16 right-16 w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="absolute top-24 right-8 w-1 h-1 bg-blue-600 rounded-full"></div>
              <div className="absolute bottom-20 right-20 w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="absolute bottom-16 left-8 w-1 h-1 bg-blue-600 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Login Form Section */}
        <div className="flex-1 max-w-md">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="text-start mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-8">
                Welcome Back!
              </h1>
              <RoleDropdown
                selectedRole={formData.role}
                onRoleSelect={handleRoleSelect}
                showDropdown={showRoleDropdown}
                setShowDropdown={setShowRoleDropdown}
                roles={roles}
              />
            </div>

            <div className="space-y-6">
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email..."
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-0 py-3 border-0 border-b-2 border-gray-200 focus:border-custom-blue focus:outline-none placeholder-gray-400 bg-transparent"
                />
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter password..."
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-0 py-3 pr-10 border-0 border-b-2 border-gray-200 focus:border-custom-blue focus:outline-none placeholder-gray-400 bg-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <div className="flex items-center space-x-20">
                <button
                  type="button"
                  className={`w-1/2 bg-gray-900 text-white py-4 rounded-lg font-medium transition-colors
                    ${
                      isSubmitting
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-gray-700"
                    }`}
                  onClick={handleLogin}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Logging in...
                    </span>
                  ) : (
                    "Login"
                  )}
                </button>

                <div className="w-1/2">
                  <span className="text-gray-600">Not a user? </span>
                  <button
                    type="button"
                    onClick={() => setCurrentPage("signup")}
                    className="text-custom-blue hover:text-custom-blue hover:underline underline-offset-2 font-medium"
                  >
                    Sign up
                  </button>
                </div>
              </div>

              {/* Forgot password link */}
              <div className="text-start">
                <button
                  type="button"
                  onClick={() => setCurrentPage("forgotPassword")}
                  className="text-custom-blue hover:text-custom-blue hover:underline underline-offset-2 text-sm font-medium"
                >
                  Forgot password?
                </button>
              </div>

              {submitMessage.text && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-3 flex items-center justify-center text-sm ${
                    submitMessage.type === "success"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {submitMessage.type === "success" ? (
                    <CheckCircle className="w-4 h-4 mr-2" />
                  ) : (
                    <XCircle className="w-4 h-4 mr-2" />
                  )}
                  {submitMessage.text}
                </motion.div>
              )}

              <div className="flex flex-col items-start text-gray-600 text-sm">
                or Login with
                <div className="flex justify-center pt-2">
                  <button
                    type="button"
                    className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    {/* Placeholder for Google icon */}
                    <img
                      src="src\assets\images\google-icon.jpg"
                      alt="google-icon"
                      className="w-10 h-10"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Signup Page Component
const SignupPage = ({
  formData,
  handleInputChange,
  handleRoleSelect,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  showRoleDropdown,
  setShowRoleDropdown,
  setCurrentPage,
  roles,
  setRegisteredUsers, // New prop to update registered users
}) => {
  const passwordStrength = calculatePasswordStrength(formData.password);
  const passwordMatch = checkPasswordMatch(
    formData.password,
    formData.confirmPassword
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: "", text: "" });

  const handleSignup = async () => {
    // 1. Clear previous messages
    setSubmitMessage({ type: "", text: "" });

    // 2. Client-side validation: Check for all required fields
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setSubmitMessage({ type: "error", text: "All fields are required." });
      return;
    }

    // 3. Client-side validation: Check email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitMessage({
        type: "error",
        text: "Please enter a valid email address.",
      });
      return;
    }

    // 4. Client-side validation: Check password strength
    if (passwordStrength.strength < 75) {
      setSubmitMessage({
        type: "error",
        text: "Password is too weak. Please meet the strength requirements.",
      });
      return;
    }

    // 5. Client-side validation: Check if passwords match
    if (!passwordMatch.isMatch) {
      setSubmitMessage({ type: "error", text: "Passwords do not match." });
      return;
    }

    // 6. Set loading state and make the API call
    setIsSubmitting(true);
    try {
      await axios.post("/api/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        // Send the selected role, converted to lowercase to match the backend enum
        role: formData.role.toLowerCase(),
      });

      // 7. On SUCCESS: Display success message and prepare to redirect
      setSubmitMessage({
        type: "success",
        text: "Account created successfully! Redirecting to login...",
      });

      // 8. Automatically switch to the login page after a short delay
      setTimeout(() => {
        setCurrentPage("login");
      }, 2000); // 2-second delay to let the user read the message
    } catch (error) {
      // 9. On FAILURE: Display the specific error message from the backend
      const errorMsg =
        error.response?.data?.msg || "Signup failed. An error occurred.";
      setSubmitMessage({ type: "error", text: errorMsg });
    } finally {
      // 10. Always turn off the loading state
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-start justify-center px-4 pt-2">
      <div className="max-w-6xl w-full flex items-center justify-center gap-12">
        {/* Illustration Section */}
        <div className="hidden lg:flex flex-1 justify-center items-center">
          <div className="relative">
            <div className="w-80 h-64 bg-white rounded-lg shadow-lg p-6 border-l-4 border-custom-blue">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-3 bg-gray-300 rounded mb-2"></div>
                  <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="h-2 bg-gray-200 rounded"></div>
                <div className="h-2 bg-gray-200 rounded w-4/5"></div>
                <div className="h-2 bg-gray-200 rounded w-3/5"></div>
                <div className="h-2 bg-gray-200 rounded w-4/5"></div>
              </div>

              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">✓</span>
              </div>
            </div>

            <div className="absolute -top-4 -left-8 w-32 h-24 bg-white rounded shadow-md transform rotate-12 opacity-80">
              <div className="p-3">
                <div className="h-2 bg-gray-200 rounded mb-2"></div>
                <div className="h-1 bg-gray-100 rounded mb-1"></div>
                <div className="h-1 bg-gray-100 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Signup Form Section */}
        <div className="flex-1 max-w-md">
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="text-start mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-8">
                Get Started with Us!
              </h1>

              <div className="flex items-center justify-between">
                <label className="block text-left text-gray-600 text-2xl py-1">
                  Select role
                </label>
                <div className="flex justify-start">
                  <RoleDropdown
                    selectedRole={formData.role}
                    onRoleSelect={handleRoleSelect}
                    showDropdown={showRoleDropdown}
                    setShowDropdown={setShowRoleDropdown}
                    roles={roles}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <input
                  type="name"
                  name="name"
                  placeholder="Enter name..."
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-0 py-3 border-0 border-b-2 border-gray-200 focus:border-custom-blue focus:outline-none placeholder-gray-400 bg-transparent"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email..."
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-0 py-3 border-0 border-b-2 border-gray-200 focus:border-custom-blue focus:outline-none placeholder-gray-400 bg-transparent"
                  disabled={isSubmitting}
                />
              </div>

              <div className="relative space-y-1">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create password..."
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-0 py-3 pr-10 border-0 border-b-2 border-gray-200 focus:border-custom-blue focus:outline-none placeholder-gray-400 bg-transparent"
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-3 text-gray-400 hover:text-gray-600"
                  disabled={isSubmitting}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>

                {/* Password Strength Indicator */}
                {formData.password && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className={`text-xs font-medium ${
                          passwordStrength.color === "bg-red-500"
                            ? "text-red-600"
                            : passwordStrength.color === "bg-yellow-500" ||
                              passwordStrength.color === "bg-yellow-400"
                            ? "text-yellow-600"
                            : "text-green-600"
                        }`}
                      >
                        {passwordStrength.label}
                      </span>
                      <span className="text-xs text-gray-500">
                        {passwordStrength.strength}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${passwordStrength.color} transition-all duration-300 ease-out`}
                        style={{ width: `${passwordStrength.strength}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                <p className="text-xs text-gray-400 mt-2">
                  Password must contain at least: a capital letter, a special
                  symbol (!@#$%^&*), and numbers
                </p>
              </div>

              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm password..."
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-0 py-3 pr-10 border-0 border-b-2 border-gray-200 focus:border-custom-blue focus:outline-none placeholder-gray-400 bg-transparent"
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-0 top-3 text-gray-400 hover:text-gray-600"
                  disabled={isSubmitting}
                >
                  {showConfirmPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>

                {/* Password Match Indicator */}
                {formData.confirmPassword && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className={`text-xs font-medium ${
                          passwordMatch.isMatch
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {passwordMatch.isMatch
                          ? "Passwords match"
                          : "Passwords do not match"}
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${passwordMatch.color} transition-all duration-300 ease-out`}
                        style={{
                          width: passwordMatch.isMatch ? "100%" : "100%",
                        }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex space-x-1 text-xs text-gray-500">
                <p>By pressing "Sign up" I agree to all</p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="underline text-blue-900"
                >
                  the terms and conditions
                </button>
              </div>

              <TermsModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
              />

              <div className="flex items-center gap-4">
                <button
                  type="button"
                  className={`bg-gray-800 text-white py-3 px-8 rounded-lg font-medium transition-colors
                    ${
                      isSubmitting
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-gray-700"
                    }`}
                  onClick={handleSignup}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Signing up...
                    </span>
                  ) : (
                    "Sign Up"
                  )}
                </button>

                <div className="text-gray-600 text-sm">or Sign Up with</div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    {/* Placeholder for Google icon */}
                    <img
                      src="src\assets\images\google-icon.jpg"
                      alt="google-icon"
                      className="w-10 h-10"
                    />
                  </button>
                </div>
              </div>

              {submitMessage.text && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-3 flex items-center justify-center text-sm ${
                    submitMessage.type === "success"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {submitMessage.type === "success" ? (
                    <CheckCircle className="w-4 h-4 mr-2" />
                  ) : (
                    <XCircle className="w-4 h-4 mr-2" />
                  )}
                  {submitMessage.text}
                </motion.div>
              )}

              <div className="text-start">
                <span className="text-gray-600">Already a user? </span>
                <button
                  type="button"
                  onClick={() => setCurrentPage("login")}
                  className="text-custom-blue hover:text-custom-blue font-medium"
                >
                  Sign in
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main AuthPages Component
const AuthPages = () => {
  const navigate = useNavigate(); // Commented out as it causes errors in this isolated environment
  const [currentPage, setCurrentPage] = useState("login"); // Changed initial page to login
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Teacher",
  });
  const [registeredUsers, setRegisteredUsers] = useState([]); // State to store registered users

  const roles = ["Teacher", "Admin"];

  useEffect(() => {
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "Teacher",
    });
    setShowPassword(false);
    setShowConfirmPassword(false);
    setShowRoleDropdown(false);
  }, [currentPage]);

  const handleRoleSelect = (role) => {
    setFormData((prevData) => ({ ...prevData, role }));
    setShowRoleDropdown(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="fixed top-30 left-4 z-50 bg-white rounded-lg shadow-lg p-2">
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage("login")}
              className={`px-4 py-2 rounded ${
                currentPage === "login"
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              Login Page
            </button>
            <button
              onClick={() => setCurrentPage("signup")}
              className={`px-4 py-2 rounded ${
                currentPage === "signup"
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              Signup Page
            </button>
          </div>
        </div>

        {currentPage === "login" ? (
          <LoginPage
            formData={formData}
            handleInputChange={handleInputChange}
            handleRoleSelect={handleRoleSelect}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            showRoleDropdown={showRoleDropdown}
            setShowRoleDropdown={setShowRoleDropdown}
            setCurrentPage={setCurrentPage}
            roles={roles}
            registeredUsers={registeredUsers} // Pass registeredUsers
            navigate={navigate} // Pass navigate if it were functional
          />
        ) : currentPage === "signup" ? (
          <SignupPage
            formData={formData}
            handleInputChange={handleInputChange}
            handleRoleSelect={handleRoleSelect}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            showConfirmPassword={showConfirmPassword}
            setShowConfirmPassword={setShowConfirmPassword}
            showRoleDropdown={showRoleDropdown}
            setShowRoleDropdown={setShowRoleDropdown}
            setCurrentPage={setCurrentPage}
            roles={roles}
            setRegisteredUsers={setRegisteredUsers} // Pass setRegisteredUsers
            navigate={navigate} // Pass navigate if it were functional
          />
        ) : (
          <ForgotPasswordPage setCurrentPage={setCurrentPage} />
        )}
      </motion.div>
    </div>
  );
};

export default AuthPages;
