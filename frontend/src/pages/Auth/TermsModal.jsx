// Terms Modal Component
import { useState } from "react";
const TermsModal = ({ isOpen, onClose }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleContinue = () => {
    if (isChecked) {
      console.log("User accepted terms");
      onClose();
      // Add your continue logic here
    }
  };

  const handleCancel = () => {
    setIsChecked(false);
    onClose();
  };

  if (!isOpen) return null;

  const termsText = `Dunamis Donation Terms & Conditions

Thanks for supporting Dunamis! By donating, you agree to these terms:

1. Your Gift
Your donation is a voluntary gift to Dunamis. We can choose to accept or decline any donation.

2. How We Use Your Donation
Unless you specify otherwise (and we agree in writing), your donation will help fund Dunamis's general educational programs and mission.

We'll do our best to use your donation for any specific purpose you request. However, if that becomes impractical, we might use your donation for another area that best supports our educational goals.

3. Tax Deductibility
Please check with your tax advisor. Donations to Dunamis may or may not be tax-deductible depending on your location and our legal status. We'll provide a receipt, but we can't offer tax advice.

4. No Refunds (Generally)
Donations are usually not refundable. If there's a genuine mistake (like a duplicate donation), please contact us within 7 days. We'll review it.

5. Your Privacy
We value your privacy. We'll use your information only for your donation and to keep you updated on Dunamis's work. We won't sell or share your personal details with others, except as needed for processing or required by law. See our Privacy Policy on our website for more details.

6. Acknowledgment
We may acknowledge your donation publicly (e.g., on our website) unless you tell us you prefer to remain anonymous.

7. Questions?
If you have any questions, please contact us at [Your Email Address] or [Your Phone Number].

By donating, you confirm you've read and agree to these terms.`;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] flex flex-col">
        {/* Header with X button */}
        <div className="flex justify-end p-3">
          <button
            onClick={handleCancel}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <img
              src="src\assets\images\Cancel.svg"
              alt="cancel-img"
              className="w-10 h-10 text-gray-700"
            />
          </button>
        </div>

        {/* Scrollable Terms Content */}
        <div className="px-6 pb-4">
          <div className="border border-gray-300 rounded-md h-80 overflow-y-auto p-4 bg-gray-50">
            <div className="text-center text-lg font-bold mb-6 text-gray-800">
              Terms and Conditions
            </div>
            <div className="whitespace-pre-line text-sm text-gray-700 leading-relaxed">
              {termsText}
            </div>
          </div>
        </div>

        {/* Checkbox */}
        <div className="px-6 pb-4">
          <div className="flex items-center space-x-3">
            <div
              className={`w-5 h-5 border-2 rounded flex items-center justify-center cursor-pointer transition-colors ${
                isChecked ? "bg-green-600 border-green-600" : "border-gray-400"
              }`}
              onClick={() => setIsChecked(!isChecked)}
            >
              {isChecked && (
                <svg
                  className="w-3 h-3 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
            <label
              className="text-sm text-gray-800 cursor-pointer select-none"
              onClick={() => setIsChecked(!isChecked)}
            >
              I agree to all the terms and conditions
            </label>
          </div>
        </div>

        {/* Buttons */}
        <div className="px-6 pb-6">
          <div className="flex space-x-4">
            <button
              onClick={handleContinue}
              disabled={!isChecked}
              className={`px-8 py-2 rounded-md font-medium transition-colors ${
                isChecked
                  ? "bg-black text-white hover:bg-gray-800"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Continue
            </button>
            <button
              onClick={handleCancel}
              className="px-8 py-2 bg-white border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;
