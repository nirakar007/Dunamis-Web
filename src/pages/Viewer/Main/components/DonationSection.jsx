// Donation Section Component
import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

function DonationSection() {
  const navigate = useNavigate();

  const handleDonationClick = (amount) => {
    navigate(`/donation?amount=${amount}`);
  };

  const handleCustomDonationClick = () => {
    navigate("/donate");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="bg-white border-2 border-blue-200 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Support <span className="text-cyan-500">Free Education</span>
        </h2>
        <p className="text-gray-600 mb-8">
          Help us keep quality education accessible to everyone around the world
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => handleDonationClick("Rs250")}
            className="bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            Donate Rs 250
          </button>
          <button
            onClick={() => handleDonationClick("Rs500")}
            className="bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
          >
            Donate Rs 500
          </button>
          <button
            onClick={() => handleDonationClick("Rs1500")}
            className="bg-cyan-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-cyan-600 transition-colors"
          >
            Donate Rs 1500
          </button>
          <button
            onClick={() => handleCustomDonationClick()}
            className="border border-gray-300 text-orange-500 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <Heart size={18} />
            Custom Amount
          </button>
        </div>
      </div>
    </div>
  );
}

export default DonationSection;
