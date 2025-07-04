import { motion } from "framer-motion";
import { ChevronDown, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const DonatePage = () => {
  const navigate = useNavigate();
  const [donationAmount, setDonationAmount] = useState("");
  const [searchParams] = useSearchParams();
  const [customAmount, setCustomAmount] = useState("");
  const [donationPurpose, setDonationPurpose] = useState("General Fund");
  const [otherPurpose, setOtherPurpose] = useState("");
  const [showPurposeDropdown, setShowPurposeDropdown] = useState(false);
  const [personalDetails, setPersonalDetails] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [showQRCode, setShowQRCode] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [remainAnonymous, setRemainAnonymous] = useState(false);

  const donationAmounts = [
    { value: "Rs250", label: "Rs250" },
    { value: "Rs500", label: "Rs500" },
    { value: "Rs1500", label: "Rs1500" },
  ];

  const purposeOptions = ["General Fund", "Scholarship Program", "Other"];

  const paymentMethods = [
    {
      id: "fonepay",
      name: "FonePay",
      logo: "src/assets/images/fonepay.svg",
      qr: "9861683302\nDunamis",
    },
    {
      id: "khalti",
      name: "Khalti",
      logo: "src/assets/images/khalti.svg",
      qr: "9861683302\nDunamis",
    },
    {
      id: "esewa",
      name: "eSewa",
      logo: "src/assets/images/esewa.svg",
      qr: "9861683302\nDunamis",
    },
    {
      id: "bankpay",
      name: "Bank Pay",
      logo: "src/assets/images/bankpay.svg",
      qr: "9861683302\nDunamis",
    },
  ];

  const getCurrentAmount = () => {
    if (donationAmount === "custom") {
      return customAmount;
    }
    return donationAmount.replace("Rs", "");
  };

  const handlePersonalDetailsChange = (field, value) => {
    setPersonalDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePaymentMethodSelect = (methodId) => {
    setSelectedPaymentMethod(methodId);
    setShowQRCode(true);
  };

  const handleSubmit = () => {
    if (!agreeToTerms) {
      alert("Please agree to the terms and conditions");
      return;
    }

    const amount = getCurrentAmount();
    if (!amount || amount <= 0) {
      alert("Please enter a valid donation amount");
      return;
    }

    if (!selectedPaymentMethod) {
      alert("Please select a payment method");
      return;
    }

    alert(
      `Thank you for your donation of Rs ${amount}! Please complete the payment using the QR code.`
    );
  };

  const generateQRCode = (method) => {
    // Simple QR code representation
    return (
      <div className="w-32 h-32 bg-white border-2 border-gray-300 flex items-center justify-center">
        <div className="text-xs text-center">
          <div
            className="w-24 h-24 bg-black mb-2"
            style={{
              background: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='white'/%3E%3Crect x='10' y='10' width='80' height='80' fill='black'/%3E%3Crect x='20' y='20' width='60' height='60' fill='white'/%3E%3Crect x='30' y='30' width='40' height='40' fill='black'/%3E%3C/svg%3E")`,
              backgroundSize: "cover",
            }}
          ></div>
          <div className="text-xs font-medium">{method.qr}</div>
        </div>
      </div>
    );
  };

  const handleBackButtonClick = (path) => {
    navigate(path);
  };

  useEffect(() => {
    const amountFromUrl = searchParams.get("amount");
    if (amountFromUrl) {
      setDonationAmount(amountFromUrl);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {" "}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center mb-6 space-x-4">
            <button
              onClick={() => {
                handleBackButtonClick("/");
              }}
            >
              <img src="src\assets\images\back_btn.svg" alt="back-btn" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Donation Form</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
            {/* Left Column - Form */}
            <div className="lg:col-span-2 space-y-6 border-2 rounded-md">
              {/* I. Donation Details */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold mb-4">
                  I. Donation Details
                </h2>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Donation Amount
                  </label>
                  <div className="flex flex-wrap gap-3 mb-3">
                    {donationAmounts.map((amount) => (
                      <label key={amount.value} className="flex items-center">
                        <input
                          type="radio"
                          name="donationAmount"
                          value={amount.value}
                          checked={donationAmount === amount.value}
                          onChange={(e) => setDonationAmount(e.target.value)}
                          className="mr-2"
                        />
                        <span className="text-sm">{amount.label}</span>
                      </label>
                    ))}
                  </div>

                  <div className="flex items-center gap-3">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="donationAmount"
                        value="custom"
                        checked={donationAmount === "custom"}
                        onChange={(e) => setDonationAmount(e.target.value)}
                        className="mr-2"
                      />
                      <span className="text-sm">NPRs</span>
                    </label>
                    <input
                      type="number"
                      placeholder="Custom Amount"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-custom-blue"
                    />
                    <button className="px-4 py-2 bg-custom-blue text-white rounded-md hover:bg-blue-800">
                      Done
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Donation Purpose
                  </label>
                  <div className="flex flex-wrap gap-4 mb-3">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="purpose"
                        value="General Fund"
                        checked={donationPurpose === "General Fund"}
                        onChange={(e) => setDonationPurpose(e.target.value)}
                        className="mr-2"
                      />
                      <span className="text-sm">General Fund</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="purpose"
                        value="Scholarship Program"
                        checked={donationPurpose === "Scholarship Program"}
                        onChange={(e) => setDonationPurpose(e.target.value)}
                        className="mr-2"
                      />
                      <span className="text-sm">Scholarship Program</span>
                    </label>
                  </div>

                  <div className="relative">
                    <button
                      onClick={() =>
                        setShowPurposeDropdown(!showPurposeDropdown)
                      }
                      className="w-full px-3 py-2 text-left border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-custom-blue flex items-center justify-between"
                    >
                      <span className="text-gray-500">Options</span>
                      <ChevronDown className="w-4 h-4" />
                    </button>
                    {showPurposeDropdown && (
                      <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                        {purposeOptions.map((option) => (
                          <button
                            key={option}
                            onClick={() => {
                              setDonationPurpose(option);
                              setShowPurposeDropdown(false);
                            }}
                            className="w-full px-3 py-2 text-left hover:bg-gray-50"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {donationPurpose === "Other" && (
                    <input
                      type="text"
                      placeholder="Please specify other purpose"
                      value={otherPurpose}
                      onChange={(e) => setOtherPurpose(e.target.value)}
                      className="w-full mt-2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-custom-blue"
                    />
                  )}
                </div>
              </div>

              {/* II. Donor Information */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold mb-4">
                  II. Donor Information
                </h2>

                <h3 className="font-medium mb-3">Personal Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={personalDetails.fullName}
                    onChange={(e) =>
                      handlePersonalDetailsChange("fullName", e.target.value)
                    }
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-custom-blue"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={personalDetails.email}
                    onChange={(e) =>
                      handlePersonalDetailsChange("email", e.target.value)
                    }
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-custom-blue"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={personalDetails.phone}
                    onChange={(e) =>
                      handlePersonalDetailsChange("phone", e.target.value)
                    }
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-custom-blue md:col-span-2"
                  />
                </div>

                <h3 className="font-medium mb-3">Address</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Street Address"
                    value={personalDetails.address}
                    onChange={(e) =>
                      handlePersonalDetailsChange("address", e.target.value)
                    }
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-custom-blue md:col-span-2"
                  />
                  <input
                    type="text"
                    placeholder="City"
                    value={personalDetails.city}
                    onChange={(e) =>
                      handlePersonalDetailsChange("city", e.target.value)
                    }
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-custom-blue"
                  />
                  <input
                    type="text"
                    placeholder="Province/State"
                    value={personalDetails.state}
                    onChange={(e) =>
                      handlePersonalDetailsChange("state", e.target.value)
                    }
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-custom-blue"
                  />
                  <input
                    type="text"
                    placeholder="Postal Code"
                    value={personalDetails.postalCode}
                    onChange={(e) =>
                      handlePersonalDetailsChange("postalCode", e.target.value)
                    }
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-custom-blue"
                  />
                  <input
                    type="text"
                    placeholder="Country"
                    value={personalDetails.country}
                    onChange={(e) =>
                      handlePersonalDetailsChange("country", e.target.value)
                    }
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-custom-blue"
                  />
                </div>
              </div>

              {/* III. Payment Information */}
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold mb-4">
                  III. Payment Information
                </h2>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount donated:
                  </label>
                  <div className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-md">
                    Rs {getCurrentAmount() || "1500"}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Payment Method
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {paymentMethods.map((method) => (
                      <button
                        key={method.id}
                        onClick={() => handlePaymentMethodSelect(method.id)}
                        className={`p-3 border-2 rounded-lg flex flex-col items-center justify-center hover:bg-gray-50 transition-colors ${
                          selectedPaymentMethod === method.id
                            ? "border-custom-blue bg-cyan-50"
                            : "border-gray-300"
                        }`}
                      >
                        <div className="w-12 h-12 mb-2 flex items-center justify-center">
                          <img
                            src={method.logo}
                            alt={method.name}
                            className="max-w-full max-h-full object-contain"
                            onError={(e) => {
                              // Fallback to text if image fails to load
                              e.target.style.display = "none";
                              e.target.nextSibling.style.display = "block";
                            }}
                          />
                          <div
                            className="text-xs font-bold text-gray-600 hidden"
                            style={{ display: "none" }}
                          >
                            {method.name}
                          </div>
                        </div>
                        <div className="text-xs font-medium">{method.name}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* QR Code Display */}
                {showQRCode && selectedPaymentMethod && (
                  <div className="mb-6 p-4 bg-cyan-50 border border-green-200 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium text-cyan-800">
                        Scan QR Code to Pay with{" "}
                        {
                          paymentMethods.find(
                            (m) => m.id === selectedPaymentMethod
                          )?.name
                        }
                      </h3>
                      <button
                        onClick={() => setShowQRCode(false)}
                        className="text-green-600 hover:text-green-800"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                    <div className="flex justify-center">
                      {generateQRCode(
                        paymentMethods.find(
                          (m) => m.id === selectedPaymentMethod
                        )
                      )}
                    </div>
                  </div>
                )}

                {/* Payment Method Icons */}
                <div className="flex justify-center space-x-8 pt-4 border-t border-gray-200">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className="w-8 h-8 opacity-80 flex items-center justify-center"
                    >
                      <img
                        src={method.logo}
                        alt={method.name}
                        className="max-w-full max-h-full object-contain"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.nextSibling.style.display = "block";
                        }}
                      />
                      <div
                        className="text-xs font-bold text-gray-400 hidden"
                        style={{ display: "none" }}
                      >
                        {method.name.charAt(0)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Terms */}
            <div className="lg:col-span-1 border-2 rounded-md">
              <div className="bg-white rounded-lg shadow p-6 sticky top-6">
                <h2 className="text-lg font-semibold">Dunamis Donation</h2>
                <h2 className="text-lg font-semibold mb-4 border-b-2 border-gray-300">
                  Terms & Conditions
                </h2>

                <div className="text-sm text-neutral-500 space-y-3 mb-6 max-h-96 overflow-y-auto">
                  <p>
                    Thanks for supporting Dunamis! By donating, you agree to
                    these terms:
                  </p>

                  <div>
                    <strong>1. Your Gift</strong>
                    <p>
                      Your donation is a voluntary gift to Dunamis. We can
                      choose to accept or decline any donation.
                    </p>
                  </div>

                  <div>
                    <strong>2. How We Use Your Donation</strong>
                    <p>
                      Unless you specify otherwise (and we agree in writing),
                      your donation will help fund Dunamis's general educational
                      programmes and mission.
                    </p>
                    <p>
                      We'll do our best to use your donation for any specific
                      purpose you request. However, if that becomes impractical,
                      we might use your donation for another area that best
                      supports our educational goals.
                    </p>
                  </div>

                  <div>
                    <strong>3. Tax Deductibility</strong>
                    <p>
                      Please check with your tax advisor. Donations to Dunamis
                      may or may not be tax-deductible depending on your
                      location and our legal status. We'll provide a receipt,
                      but we can't offer tax advice.
                    </p>
                  </div>

                  <div>
                    <strong>4. No Refunds (Generally)</strong>
                    <p>
                      Donations are usually not refundable. If there's a genuine
                      mistake (like a duplicate donation), please contact us
                      within 7 days. We'll review it.
                    </p>
                  </div>

                  <div>
                    <strong>5. Your Privacy</strong>
                    <p>
                      We value your privacy. We'll use your information only for
                      our operations and to keep you updated on Dunamis's work.
                      We won't sell or share your personal details with others,
                      except as needed for processing or required by law. See
                      our Privacy Policy on our website for more details.
                    </p>
                  </div>

                  <div>
                    <strong>6. Acknowledgment</strong>
                    <p>
                      We may acknowledge your donation publicly (e.g., on our
                      website) unless you tell us you prefer to remain
                      anonymous.
                    </p>
                  </div>

                  <div>
                    <strong>7. Questions?</strong>
                    <p>
                      If you have any questions, please contact us at [Your
                      Email Address] or [Your Phone Number].
                    </p>
                  </div>

                  <p>
                    By donating, you confirm you've read and agree to these
                    terms.
                  </p>
                </div>

                <div className="space-y-3 mb-6">
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      checked={agreeToTerms}
                      onChange={(e) => setAgreeToTerms(e.target.checked)}
                      className="mt-1 mr-3"
                    />
                    <span className="text-sm">
                      I agree to the terms and conditions
                    </span>
                  </label>

                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      checked={remainAnonymous}
                      onChange={(e) => setRemainAnonymous(e.target.checked)}
                      className="mt-1 mr-3"
                    />
                    <span className="text-sm">I wish to remain anonymous</span>
                  </label>
                </div>

                <div className="flex justify-center mb-6">
                  <div className="text-6xl">🤝</div>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={handleSubmit}
                    disabled={!agreeToTerms}
                    className={`flex-1 px-4 py-3 rounded-md font-medium transition-colors ${
                      agreeToTerms
                        ? "bg-custom-blue text-white hover:bg-green-600"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    Accept & DONATE
                  </button>
                  <button className="flex-1 bg-red-500 text-white px-4 py-3 rounded-md hover:bg-red-600 font-medium">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DonatePage;
