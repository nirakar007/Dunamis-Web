import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const FAQPage = () => {
  const [openFAQ, setOpenFAQ] = useState(null);
  const navigate = useNavigate();

  const handleBackButtonClick = (path) => {
    navigate(path);
  };

  const faqData = [
    {
      category: "General Questions",
      questions: [
        {
          q: "What is Dunamis?",
          a: "Dunamis is a donation-based online learning platform that provides free educational content to anyone, anywhere. It allows educators to upload resources and empowers learners to access materials without needing to log in.",
        },
        {
          q: "Who can use Dunamis?",
          a: "Anyone! Whether you're a student, self-learner, teacher, or someone curious to explore new knowledge, Dunamis is open to all.",
        },
        {
          q: "Is it really free?",
          a: "Yes! All educational content on Dunamis is freely accessible. Users can choose to support the platform through optional donations.",
        },
      ],
    },
    {
      category: "For Learners",
      questions: [
        {
          q: "Do I need to register to view the content?",
          a: "No registration is required to browse or view content. However, if you'd like to receive newsletters or donate, we ask for a few basic details.",
        },
        {
          q: "How do I find what I'm looking for?",
          a: "Use our search bar or filter by category, topic, or tags to find specific lessons, videos, or documents.",
        },
        {
          q: "Can I download the materials?",
          a: "Yes, most content is downloadable unless marked otherwise by the uploader.",
        },
      ],
    },
    {
      category: "Support & Donations",
      questions: [
        {
          q: "How can I support Dunamis?",
          a: "You can support us by donating through the donation page or by spreading the word about Dunamis to others who may benefit from it.",
        },
        {
          q: "Is my donation secure?",
          a: "Yes, all donations are handled through secure and trusted payment gateways. You will also receive a confirmation receipt via email.",
        },
        {
          q: "Who do I contact for help?",
          a: "You can reach our support team at support@dunamis.org or visit the Contact Us page.",
        },
      ],
    },
    {
      category: "For Educators",
      questions: [
        {
          q: "How can I upload my content?",
          a: "If you're an educator and want to share your knowledge, you can apply to become a verified uploader via our Upload Application Page.",
        },
        {
          q: "What type of content can I upload?",
          a: "You can upload videos, PDFs, slides, external links, and other learning materials. All content is reviewed to ensure it aligns with Dunamis' values.",
        },
        {
          q: "Will I get feedback on what I upload?",
          a: "Yes. Learners can provide feedback, and you'll be able to view engagement statistics through your uploader dashboard.",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-start mb-12">
            <div className="flex space-x-4 mb-2">
              <button
                onClick={() => {
                  handleBackButtonClick("/");
                }}
              >
                <img src="src\assets\images\back_btn.svg" alt="back-btn" />
              </button>
              <h1 className="text-3xl font-bold text-gray-800">
                Frequently Asked Questions
              </h1>
            </div>
            <p className="text-lg text-gray-600 px-8">
              Find answers to common questions about Dunamis
            </p>
          </div>

          <div className="space-y-8 max-h-screen overflow-y-auto pr-2">
            {faqData.map((category, categoryIndex) => (
              <div
                key={categoryIndex}
                className="bg-white rounded-xl overflow-hidden"
              >
                <div className="bg-custom-blue bg-opacity-10 border-b-4 border-custom-blue p-4">
                  <h2 className="text-xl font-bold text-gray-800 flex items-center">
                    {category.category === "General Questions" && "🔍"}
                    {category.category === "For Learners" && "🎓"}
                    {category.category === "Support & Donations" && "💬"}
                    {category.category === "For Educators" && "👨‍🏫"}
                    <span className="ml-2">{category.category}</span>
                  </h2>
                </div>

                <div className="p-6 space-y-4">
                  {category.questions.map((item, index) => {
                    const faqId = `${categoryIndex}-${index}`;
                    return (
                      <div
                        key={index}
                        className="border border-gray-200 rounded-lg overflow-hidden"
                      >
                        <button
                          onClick={() =>
                            setOpenFAQ(openFAQ === faqId ? null : faqId)
                          }
                          className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex justify-between items-center"
                        >
                          <span className="font-semibold text-gray-800">
                            {item.q}
                          </span>
                          {openFAQ === faqId ? (
                            <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0 ml-4" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0 ml-4" />
                          )}
                        </button>

                        {openFAQ === faqId && (
                          <div className="px-6 py-4 bg-white border-t border-gray-200 animate-slideDown">
                            <p className="text-gray-600 leading-relaxed">
                              {item.a}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center bg-white rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Still have questions?
            </h3>
            <p className="text-gray-600 mb-6">
              Can't find what you're looking for? We're here to help!
            </p>
            <button
              onClick={() => {
                handleBackButtonClick("/contact");
              }}
              className="bg-gray-900 text-white px-8 py-3 rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all duration-200 transform hover:scale-105"
            >
              Contact Support
            </button>
          </div>
        </div>

        <style jsx>{`
          @keyframes slideDown {
            from {
              opacity: 0;
              max-height: 0;
            }
            to {
              opacity: 1;
              max-height: 200px;
            }
          }
          .animate-slideDown {
            animation: slideDown 0.3s ease-out;
          }

          /* Custom scrollbar for FAQ section */
          .max-h-screen::-webkit-scrollbar {
            width: 8px;
          }

          .max-h-screen::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 4px;
          }

          .max-h-screen::-webkit-scrollbar-thumb {
            background: #c1c1c1;
            border-radius: 4px;
          }

          .max-h-screen::-webkit-scrollbar-thumb:hover {
            background: #a8a8a8;
          }
        `}</style>
      </motion.div>
    </div>
  );
};

export default FAQPage;
