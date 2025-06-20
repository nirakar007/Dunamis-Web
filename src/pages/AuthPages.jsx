import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";

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
      className="flex items-center gap-2 text-cyan-500 hover:text-cyan-700 transition-colors"
    >
      <div className="w-4 h-4 rounded-full flex items-center justify-center">
        <div className="w-4 h-4 bg-cyan-500 rounded-full"></div>
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
                  ? "bg-blue-50 text-cyan-600"
                  : "text-gray-700"
              }`}
            >
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                {role}
              </div>
            </button>
          ))}
        </div>
      </>
    )}
  </div>
);

// Login Page Component
const LoginPage = ({
  formData,
  handleInputChange,
  handleRoleSelect,
  showPassword,
  setShowPassword,
  showRoleDropdown,
  setShowRoleDropdown,
  setCurrentPage,
  roles,
}) => (
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
                className="w-full px-0 py-3 border-0 border-b-2 border-gray-200 focus:border-cyan-500 focus:outline-none placeholder-gray-400 bg-transparent"
              />
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter password..."
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-0 py-3 pr-10 border-0 border-b-2 border-gray-200 focus:border-cyan-500 focus:outline-none placeholder-gray-400 bg-transparent"
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
                className="w-1/2 bg-gray-900 text-white py-4 rounded-lg font-medium hover:bg-gray-700 transition-colors"
              >
                Login
              </button>

              <div className="w-1/2">
                <span className="text-gray-600">Not a user? </span>
                <button
                  type="button"
                  onClick={() => setCurrentPage("signup")}
                  className="text-cyan-600 hover:text-cyan-500 hover:underline underline-offset-2 font-medium"
                >
                  Sign up
                </button>
              </div>
            </div>

            <div className="flex flex-col items-start text-gray-600 text-sm">
              or Login with
              <div className="flex justify-center pt-2">
                <button
                  type="button"
                  className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <div className="w-5 h-5 bg-red-500 rounded flex items-center justify-center text-white text-xs font-bold">
                    G
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

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
}) => {
  const passwordStrength = calculatePasswordStrength(formData.password);
  const passwordMatch = checkPasswordMatch(
    formData.password,
    formData.confirmPassword
  );

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-6xl w-full flex items-center justify-center gap-12">
        {/* Illustration Section */}
        <div className="hidden lg:flex flex-1 justify-center items-center">
          <div className="relative">
            <div className="w-80 h-64 bg-white rounded-lg shadow-lg p-6 border-l-4 border-cyan-500">
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
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Get Started with Us!
              </h1>

              <div className="mb-6">
                <label className="block text-left text-gray-600 text-sm mb-2">
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

            <div className="space-y-6">
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email..."
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-0 py-3 border-0 border-b-2 border-gray-200 focus:border-cyan-500 focus:outline-none placeholder-gray-400 bg-transparent"
                />
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create password..."
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-0 py-3 pr-10 border-0 border-b-2 border-gray-200 focus:border-cyan-500 focus:outline-none placeholder-gray-400 bg-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
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

                <p className="text-xs text-gray-500 mt-2">
                  The password must contain at least a capital letter, a special
                  symbol and numerics
                </p>
              </div>

              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm password..."
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-0 py-3 pr-10 border-0 border-b-2 border-gray-200 focus:border-cyan-500 focus:outline-none placeholder-gray-400 bg-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
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

              <div className="text-xs text-gray-500">
                By pressing "Sign up" I agree to all the terms and conditions
              </div>

              <div className="flex items-center gap-4">
                <button
                  type="button"
                  className="bg-gray-800 text-white py-3 px-8 rounded-lg font-medium hover:bg-gray-700 transition-colors"
                >
                  Sign Up
                </button>

                <div className="text-gray-600 text-sm">or Sign Up with</div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    <div className="w-5 h-5 bg-red-500 rounded flex items-center justify-center text-white text-xs font-bold">
                      G
                    </div>
                  </button>
                  <button
                    type="button"
                    className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                      f
                    </div>
                  </button>
                  <button
                    type="button"
                    className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                  >
                    <div className="w-5 h-5 bg-black rounded flex items-center justify-center text-white text-xs">
                      🍎
                    </div>
                  </button>
                </div>
              </div>

              <div className="text-center">
                <span className="text-gray-600">Already a user? </span>
                <button
                  type="button"
                  onClick={() => setCurrentPage("login")}
                  className="text-blue-600 hover:text-blue-700 font-medium"
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
  const [currentPage, setCurrentPage] = useState("signup");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    role: "Teacher",
  });

  const roles = ["Teacher", "Admin"];

  useEffect(() => {
    setFormData({
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
      <div className="fixed top-4 left-4 z-50 bg-white rounded-lg shadow-lg p-2">
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage("login")}
            className={`px-4 py-2 rounded ${
              currentPage === "login"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            Login Page
          </button>
          <button
            onClick={() => setCurrentPage("signup")}
            className={`px-4 py-2 rounded ${
              currentPage === "signup"
                ? "bg-blue-600 text-white"
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
        />
      ) : (
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
        />
      )}
    </div>
  );
};

export default AuthPages;
