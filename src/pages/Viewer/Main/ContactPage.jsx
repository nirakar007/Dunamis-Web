import { motion } from "framer-motion";
import { Mail, MessageSquare, Phone, Send } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ContactPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    query: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (formData.email && formData.query) {
      alert("Thank you for your message! We'll get back to you soon.");
      setFormData({ email: "", phone: "", query: "" });
    } else {
      alert("Please fill in all required fields.");
    }
  };

  const handleBackButtonClick = (path) => {
    navigate(path);
  };

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
              <button
                onClick={() => {
                  handleBackButtonClick("/");
                }}
              >
                <img src="src\assets\images\back_btn.svg" alt="back-btn" />
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
                <MessageSquare className="w-6 h-6 mr-2 text-blue-500" />
                Send us a message
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="w-4 h-4 inline mr-1" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="w-4 h-4 inline mr-1" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="+977-123456789"
                  />
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
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full bg-gray-900 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2 transform hover:scale-105"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  📧 General Inquiries
                </h3>
                <p className="text-gray-600 mb-2">Email: hello@dunamis.org</p>
                <p className="text-gray-600">Phone: +977-123456789</p>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
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

              <div className="bg-white rounded-2xl p-6 shadow-lg">
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

              <div className="bg-white rounded-2xl p-6 shadow-lg">
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

              <div className="bg-white rounded-2xl p-6 shadow-lg">
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

              <div className="bg-white rounded-2xl p-6 shadow-lg">
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
