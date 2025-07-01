import { useState } from "react";

// Newsletter Section Component
function NewsletterSection() {
  const [email, setEmail] = useState("");

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
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none  focus:border-blue-400 focus:border-b-4"
            />
            <button className="bg-blue-400 text-white px-6 py-3 rounded-lg font-semibold hover:bg-cyan-500 transition-colors">
              Subscribe
            </button>
          </div>
          <p className="text-xs text-gray-500">
            Free Updates • No spam • Unsubscribe anytime
          </p>
        </div>
      </div>
    </div>
  );
}

export default NewsletterSection;
