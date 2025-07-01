// Footer Component
import { useNavigate } from "react-router-dom";
const Footer = () => {
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <footer className="bg-white border-t border-gray-200 py-12">
      <span className="flex justify-center text-gray-400 pb-10 text-sm">
        Teaching the Word • Awakening the Nations • Reaching the Unreached
      </span>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <button
              onClick={() => {
                handleClick("/donate");
              }}
              className="text-lg font-semibold text-gray-900 mb-4"
            >
              Give
            </button>
            <ul className="space-y-2 text-gray-600">
              <li>
                <button
                  onClick={() => handleClick("/auth")}
                  className="hover:text-cyan-500 hover:underline text-cyan-600"
                >
                  Become a Volunteer
                </button>
              </li>
            </ul>
          </div>
          <div>
            <button
              onClick={() => handleClick("/about")}
              className="text-lg font-semibold text-gray-600 mb-4 hover:text-gray-900"
            >
              About
            </button>
            <ul className="space-y-2 text-gray-600">
              <li>
                <button
                  onClick={() => handleClick("/contact")}
                  className="hover:text-gray-900"
                >
                  Contact
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleClick("/faq")}
                  className="hover:text-gray-900 font-semibold"
                >
                  FAQs
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-2 text-gray-600">
              <li>
                <button
                  onClick={() => handleClick()}
                  className="hover:text-gray-900"
                >
                  Terms
                </button>
              </li>
            </ul>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            Dunamis<span className="text-cyan-600">Online</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
