import { motion } from "framer-motion"; // Import motion for animations
import { CheckCircle, XCircle } from "lucide-react"; // Import icons for feedback messages
import { useState } from "react";

// Newsletter Section Component
function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: "", text: "" }); // {type: 'success'|'error', text: 'message'}

  const handleSubscribe = () => {
    setSubmitMessage({ type: "", text: "" }); // Clear previous messages

    if (!email || !email.includes("@") || !email.includes(".")) {
      setSubmitMessage({
        type: "error",
        text: "Please enter a valid email address.",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call to a backend email service
    setTimeout(() => {
      setIsSubmitting(false);
      // Simulate success or failure
      if (Math.random() > 0.2) {
        // 80% chance of success
        setSubmitMessage({
          type: "success",
          text: "Successfully subscribed! Check your inbox for confirmation.",
        });
        setEmail(""); // Clear email on success
      } else {
        setSubmitMessage({
          type: "error",
          text: "Failed to subscribe. Please try again.",
        });
      }
    }, 1500); // Simulate network delay
  };

  return (
    <div className="bg-blue-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Stay in <span className="text-cyan-500">the LOOP!</span>
        </h2>
        <p className="text-gray-600 mb-8">
          Get weekly updates on new courses, featured content, and learning tips
        </p>

        <div className="max-w-md mx-auto">
          <div className="flex gap-2 mb-4">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setSubmitMessage({ type: "", text: "" }); // Clear message on input change
              }}
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400 focus:border-b-4"
              disabled={isSubmitting}
            />
            <button
              onClick={handleSubscribe}
              className={`bg-blue-400 text-white px-6 py-3 rounded-lg font-semibold transition-colors
                ${
                  isSubmitting
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-cyan-500"
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
                  Subscribing...
                </span>
              ) : (
                "Subscribe"
              )}
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
          <p className="text-xs text-gray-500 mt-5">
            Free Updates • No spam • Unsubscribe anytime
          </p>
        </div>
      </div>
    </div>
  );
}

export default NewsletterSection;
