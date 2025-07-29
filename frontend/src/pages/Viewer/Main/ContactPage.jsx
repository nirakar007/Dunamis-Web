import axios from "axios";
import { motion } from "framer-motion";
import { CheckCircle, MessageSquare, Send, XCircle } from "lucide-react"; // Removed ArrowLeft from here
import { useState } from "react";

const ContactPage = () => {
  // const navigate = useNavigate(); // This hook is not available in this environment
  const [formData, setFormData] = useState({
    email: "",
    countryCode: "+977",
    localPhone: "",
    query: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: "", text: "" }); // {type: 'success'|'error', text: 'message'}

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setSubmitMessage({ type: "", text: "" }); // Clear message on input change
  };

  // Replace your entire handleSubmit function with this one
  const handleSubmit = async () => {
    setSubmitMessage({ type: "", text: "" });

    if (!formData.email || !formData.query) {
      setSubmitMessage({
        type: "error",
        text: "Email address and query are required.",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitMessage({
        type: "error",
        text: "Please enter a valid email address.",
      });
      return;
    }

    // --- NEW DYNAMIC PHONE VALIDATION ---
    // Only validate if a phone number has been entered.
    if (formData.localPhone) {
      const selectedCountry = countryOptions.find(
        (c) => c.code === formData.countryCode
      );
      const phoneDigitsOnly = formData.localPhone.replace(/\D/g, ""); // Remove non-digits

      if (phoneDigitsOnly.length !== selectedCountry.digits) {
        setSubmitMessage({
          type: "error",
          text: `Please enter a valid ${selectedCountry.digits}-digit phone number for ${selectedCountry.name}.`,
        });
        return;
      }
    }
    // --- END OF VALIDATION ---

    setIsSubmitting(true);

    try {
      // Combine the country code and local phone number for the backend
      const fullPhoneNumber = formData.localPhone
        ? `${formData.countryCode}${formData.localPhone}`
        : "";

      await axios.post("/api/contact/send", {
        email: formData.email,
        phone: fullPhoneNumber, // Send the combined number
        query: formData.query,
      });

      setSubmitMessage({
        type: "success",
        text: "Thank you for your message! We'll get back to you soon.",
      });
      setFormData({
        email: "",
        countryCode: "+977",
        localPhone: "",
        query: "",
      }); // Clear form
    } catch (error) {
      const errorMsg =
        error.response?.data?.msg ||
        "Failed to send message. Please try again.";
      setSubmitMessage({ type: "error", text: errorMsg });
    } finally {
      setIsSubmitting(false);
    }
  };

  // The handleBackButtonClick function is kept for structural completeness,
  // but `useNavigate` is not functional in this isolated component environment.
  // In a full React app with react-router-dom, this would work as intended.
  const handleBackButtonClick = (path) => {
    // navigate(path); // This line would work in a full React app with routing
    console.log(`Navigating to: ${path} (simulated)`);
    // For this isolated component, we'll just clear selected content if it was part of a larger app.
    // If this component is rendered directly, this button won't 'go back' in the browser history.
  };

  // Add this array inside your ContactPage component
  const countryOptions = [
    { name: "Nepal", code: "+977", digits: 10 },
    { name: "India", code: "+91", digits: 10 },
    { name: "China", code: "+86", digits: 11 },
    { name: "Bangladesh", code: "+880", digits: 10 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-gray-50 py-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-start mx-10 mb-12">
            <div className="flex space-x-3 items-center mb-4">
              {/* Back button - Reverted to original image path */}
              <button
                onClick={() => {
                  handleBackButtonClick("/");
                }}
              >
                <img src="src/assets/images/back_btn.svg" alt="back-btn" />
              </button>
              <h1 className="text-2xl font-bold text-gray-800">Contact Us</h1>
            </div>

            <p className="text-xl text-gray-600 mb-2">
              We'd love to hear from you!
            </p>
            <p className="text-gray-400">
              Whether you have a question, feedback, or just want to say hello!
              <br />
              We're here to connect, Dunamis community, and your voice helps us
              grow and improve.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Contact Form Card */}
            <div className="bg-white rounded-2xl p-8 border-b-2">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <MessageSquare className="w-6 h-6 mr-2 text-custom-blue" />
                Send us a message
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="your.email@example.com"
                    disabled={isSubmitting}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number (Optional)
                  </label>
                  <div className="flex">
                    <select
                      name="countryCode"
                      value={formData.countryCode}
                      onChange={handleInputChange}
                      className="px-3 py-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50"
                      disabled={isSubmitting}
                    >
                      {countryOptions.map((country) => (
                        <option key={country.name} value={country.code}>
                          {country.name} ({country.code})
                        </option>
                      ))}
                    </select>
                    <input
                      type="tel"
                      name="localPhone"
                      value={formData.localPhone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-t border-b border-r border-gray-300 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="e.g., 9812345678"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Query Description
                  </label>
                  <textarea
                    name="query"
                    value={formData.query}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                    placeholder="Tell us how we can help you..."
                    disabled={isSubmitting}
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  className={`w-full bg-gray-900 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center space-x-2 transform
                    ${
                      isSubmitting
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:scale-105 hover:bg-gray-800"
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
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
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
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 border border-custom-blue">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  📧 General Inquiries
                </h3>
                <p className="text-gray-600 mb-2">Email: hello@dunamis.org</p>
                <p className="text-600">Phone: +977-123456789</p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-custom-blue">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  💡 Suggestions or Feedback
                </h3>
                <p className="text-gray-600 mb-2">
                  Have ideas to improve Dunamis?
                </p>
                <p className="text-gray-600">
                  We welcome your input to make the platform better for
                  everyone.
                </p>
                <button className="mt-3 text-blue-500 hover:text-blue-700 font-medium">
                  👉 HERE
                </button>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-custom-blue">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  🎓 Uploaders & Educators
                </h3>
                <p className="text-gray-600 mb-2">
                  Interested in contributing your content?
                </p>
                <p className="text-gray-600">
                  Reach out to our support team or apply to be a verified
                  uploader.
                </p>
                <button className="mt-3 text-blue-500 hover:text-blue-700 font-medium">
                  👉 HERE
                </button>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-custom-blue">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  🤝 Partnerships or Donations
                </h3>
                <p className="text-gray-600 mb-2">
                  Want to collaborate, support, or sponsor Dunamis' mission?
                </p>
                <p className="text-gray-600">
                  Email us at partners@dunamis.org
                </p>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-custom-blue">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  📱 Follow Us
                </h3>
                <p className="text-gray-600 mb-4">
                  Stay updated with announcements, new resources, and more:
                </p>
                <div className="flex space-x-4">
                  <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                    <span className="text-white text-sm font-bold">f</span>
                  </div>
                  <div className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center">
                    <span className="text-white text-sm font-bold">X</span>
                  </div>
                  <div className="w-8 h-8 bg-blue-700 rounded flex items-center justify-center">
                    <span className="text-white text-sm font-bold">in</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-custom-blue">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  📍 Visit Us
                </h3>
                <p className="text-gray-700 font-medium">Dunamis HQ</p>
                <p className="text-gray-600">Kathmandu, Nepal</p>
                <p className="text-gray-600 mt-2">
                  <strong>Office Hours:</strong> Sunday – Friday, 9 AM to 5 PM
                  (NPT)
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactPage;
