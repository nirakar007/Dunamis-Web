import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { motion } from "framer-motion";
import { Copy, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const DonatePage = () => {
  // const [searchParams] = useSearchParams(); // This hook is not available in this environment

  const [donationAmount, setDonationAmount] = useState("");
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
  const [isSubmitting, setIsSubmitting] = useState(false); // New state for submission loading
  const [submitMessage, setSubmitMessage] = useState({ type: "", text: "" }); // New state for submission feedback
  const navigate = useNavigate();

  const stripePromise = loadStripe(
    "pk_test_51RqHrpKPThj0E6HF7w6Zwb62rMM8DPa2x3SjbUosM7nQsPTLbMNlSxCwQbS346ZLY1wvwX0mT3sBN4K5f5DAqalu00269pBT8Z"
  );

  const donationAmounts = [
    { value: "250", label: "Rs250" }, // Changed value to number for easier calculation
    { value: "500", label: "Rs500" },
    { value: "1500", label: "Rs1500" },
  ];

  const purposeOptions = ["General Fund", "Scholarship Program", "Other"];

  const paymentMethods = [
    {
      id: "fonepay",
      name: "FonePay",
      // Reverted to original local image paths
      logo: "src/assets/images/fonepay.svg",
      qrData: "FonePay:Dunamis:9861683302", // Data for QR code
    },
    {
      id: "khalti",
      name: "Khalti",
      logo: "src/assets/images/khalti.svg",
      qrData: "Khalti:Dunamis:9861683302",
    },
    {
      id: "esewa",
      name: "eSewa",
      logo: "src/assets/images/esewa.svg",
      qrData: "eSewa:Dunamis:9861683302",
    },
    {
      id: "bankpay",
      name: "Bank Pay",
      logo: "src/assets/images/bankpay.svg",
      qrData: "BankPay:Dunamis:9861683302",
    },
  ];

  const getCurrentAmount = () => {
    return donationAmount === "custom" ? customAmount : donationAmount;
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
    setSubmitMessage({ type: "", text: "" }); // Clear messages when selecting new method
  };

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   setIsSubmitting(true);
  //   setSubmitMessage({ type: "", text: "" });

  //   const amount = parseFloat(getCurrentAmount());
  //   if (isNaN(amount) || amount <= 0) {
  //     setSubmitMessage({
  //       type: "error",
  //       text: "Please enter a valid donation amount.",
  //     });
  //     setIsSubmitting(false);
  //     return;
  //   }

  //   try {
  //     console.log("Creating checkout session...");
  //     // 1. Send donation details to YOUR backend
  //     const response = await axios.post(
  //       "/api/payment/create-checkout-session",
  //       {
  //         amount: amount,
  //         purpose: donationPurpose,
  //         donorName: remainAnonymous ? "Anonymous" : personalDetails.fullName,
  //         donorEmail: remainAnonymous ? null : personalDetails.email,
  //       }
  //     );

  //     const { id: sessionId } = response.data;

  //     // 2. Redirect to Stripe's hosted checkout page
  //     const stripe = await stripePromise;
  //     const { error } = await stripe.redirectToCheckout({ sessionId });

  //     if (error) {
  //       console.error("Stripe Redirect Error:", error);
  //       setSubmitMessage({ type: "error", text: error.message });
  //     }
  //   } catch (error) {
  //     console.error("API Error:", error);
  //     setSubmitMessage({
  //       type: "error",
  //       text: "Could not initiate donation. Please try again.",
  //     });
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  // REPLACE your existing handleSubmit function with this one

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage({ type: "", text: "" });

    const amount = parseFloat(getCurrentAmount());
    if (isNaN(amount) || amount <= 0) {
      setSubmitMessage({
        type: "error",
        text: "Please enter a valid donation amount.",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // 1. Send donation details to our NEW manual endpoint
      const response = await axios.post("/api/payment/manual-donation", {
        amount: amount,
        purpose: donationPurpose,
        donorName: remainAnonymous ? "Anonymous" : personalDetails.fullName,
        donorEmail: remainAnonymous ? null : personalDetails.email,
      });

      // 2. No more Stripe! Just show the success message.
      setSubmitMessage({
        type: "success",
        text: "Thank you! Your donation has been recorded.",
      });

      // 3. (Optional) Redirect to a success page after a short delay
      setTimeout(() => {
        navigate("/donation-success"); // Or wherever you want to go
      }, 2000);
    } catch (error) {
      console.error("API Error:", error);
      setSubmitMessage({
        type: "error",
        text: "Could not record donation. Please try again.",
      });
    } finally {
      // We leave the submitting state on during the redirect delay
      // setIsSubmitting(false);
    }
  };

  // Function to generate a simple SVG that looks like a QR code
  // This is a visual simulation, not a real QR code generator.
  const generateSimpleQRCodeSVG = (data) => {
    const size = 128; // SVG size
    const moduleSize = size / 16; // Divide into a grid for pattern
    let svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">`;
    svgContent += `<rect width="${size}" height="${size}" fill="white"/>`; // White background

    // Simple pattern to resemble QR code modules
    for (let i = 0; i < 16; i++) {
      for (let j = 0; j < 16; j++) {
        // Create a pseudo-random pattern based on index and data hash
        const charIndex = (i * 16 + j) % data.length;
        const charCode = data.charCodeAt(charIndex);
        if ((charCode + i + j) % 3 === 0) {
          // Simple hash to create a pattern
          svgContent += `<rect x="${i * moduleSize}" y="${
            j * moduleSize
          }" width="${moduleSize}" height="${moduleSize}" fill="black"/>`;
        }
      }
    }
    // Add some text overlay for clarity, as it's not a scannable QR
    svgContent += `<text x="50%" y="50%" font-family="Arial" font-size="10" fill="red" text-anchor="middle" dominant-baseline="middle">${data.substring(
      0,
      15
    )}...</text>`;
    svgContent += `</svg>`;
    return `data:image/svg+xml;base64,${btoa(svgContent)}`;
  };

  const copyToClipboard = (text) => {
    if (document.execCommand) {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand("copy");
        setSubmitMessage({
          type: "success",
          text: "QR data copied to clipboard!",
        });
      } catch (err) {
        setSubmitMessage({ type: "error", text: "Failed to copy QR data." });
      }
      document.body.removeChild(textarea);
    } else {
      setSubmitMessage({
        type: "error",
        text: "Clipboard API not supported in this browser.",
      });
    }
  };

  const handleBackButtonClick = (path) => {
    navigate(path);
    // In a full React app with react-router-dom, this would navigate
    // navigate(path);
    console.log(`Navigating to: ${path} (simulated)`);
    // For this isolated component, we'll simulate resetting the page state
    // if it were part of a larger application's routing context.
    // As this is a standalone component, it will just log.
  };

  useEffect(() => {
    // This effect would handle initial amount from URL if useSearchParams was active
    // const amountFromUrl = searchParams.get("amount");
    // if (amountFromUrl) {
    //   setDonationAmount(amountFromUrl);
    // }
  }, []); // [searchParams]

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
              className="p-2 rounded-full hover:bg-gray-200 transition-colors"
            >
              {/* Reverted to original image path for back button */}
              <img src="src/assets/images/back_btn.svg" alt="back-btn" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Donation Form</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {" "}
            {/* Increased gap for better spacing */}
            {/* Left Column - Form */}
            <div className="lg:col-span-2 space-y-6 border-2 rounded-md">
              {" "}
              {/* Reverted to original border styling */}
              {/* I. Donation Details */}
              <div className="bg-white rounded-lg shadow p-6">
                {" "}
                {/* Reverted to original inner div styling */}
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
                          onChange={(e) => {
                            setDonationAmount(e.target.value);
                            setCustomAmount(""); // Clear custom amount if a preset is selected
                          }}
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
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                        setDonationAmount("custom"); // Ensure custom radio is selected
                      }}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-custom-blue"
                    />
                    <button
                      onClick={() => {
                        if (customAmount && parseFloat(customAmount) > 0) {
                          setDonationAmount("custom");
                        } else {
                          setCustomAmount(""); // Clear if invalid
                        }
                      }}
                      className="px-4 py-2 bg-custom-blue text-white rounded-md hover:bg-blue-800"
                    >
                      Done
                    </button>
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Donation Purpose
                  </label>
                  <div className="flex flex-wrap gap-4 mb-3">
                    {purposeOptions.map((option) => (
                      <label key={option} className="flex items-center">
                        <input
                          type="radio"
                          name="purpose"
                          value={option}
                          checked={donationPurpose === option}
                          onChange={(e) => {
                            setDonationPurpose(e.target.value);
                            if (e.target.value !== "Other") {
                              setOtherPurpose(""); // Clear other purpose if not 'Other'
                            }
                          }}
                          className="mr-2"
                        />
                        <span className="text-sm">{option}</span>
                      </label>
                    ))}
                  </div>

                  {/* Removed the dropdown button and just show the 'Other' input if selected */}
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
                {" "}
                {/* Reverted to original inner div styling */}
                <h2 className="text-lg font-semibold mb-4">
                  II. Donor Information
                </h2>
                <label className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    checked={remainAnonymous}
                    onChange={(e) => setRemainAnonymous(e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">
                    I wish to remain anonymous
                  </span>
                </label>
                {!remainAnonymous && (
                  <>
                    <h3 className="font-medium mb-3">Personal Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <input
                        type="text"
                        placeholder="Full Name"
                        value={personalDetails.fullName}
                        onChange={(e) =>
                          handlePersonalDetailsChange(
                            "fullName",
                            e.target.value
                          )
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
                        placeholder="Phone Number (Optional)"
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
                        placeholder="Province/State (Optional)"
                        value={personalDetails.state}
                        onChange={(e) =>
                          handlePersonalDetailsChange("state", e.target.value)
                        }
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-custom-blue"
                      />
                      <input
                        type="text"
                        placeholder="Postal Code (Optional)"
                        value={personalDetails.postalCode}
                        onChange={(e) =>
                          handlePersonalDetailsChange(
                            "postalCode",
                            e.target.value
                          )
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
                  </>
                )}
              </div>
              {/* III. Payment Information */}
              <div className="bg-white rounded-lg shadow p-6">
                {" "}
                {/* Reverted to original inner div styling */}
                <h2 className="text-lg font-semibold mb-4">
                  III. Payment Information
                </h2>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount to be donated:
                  </label>
                  <div className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-md font-semibold text-gray-800">
                    Rs {getCurrentAmount() || "0"}
                  </div>
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Select Payment Method
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
                          {/* Reverted to original image path for payment method logos */}
                          <img
                            src={method.logo}
                            alt={method.name}
                            className="max-w-full max-h-full object-contain"
                            onError={(e) => {
                              // Fallback to text if image fails to load
                              e.target.style.display = "none";
                              if (e.target.nextSibling)
                                e.target.nextSibling.style.display = "block";
                            }}
                          />
                          <div
                            className="text-xs font-bold text-gray-600"
                            style={{ display: "none" }} // Hidden by default, shown on error
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
                  <div className="mb-6 p-4 bg-cyan-50 border border-green-200 rounded-lg text-center">
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
                    <div className="flex flex-col items-center justify-center">
                      {/* Display the simulated QR code */}
                      <img
                        src="src\assets\qr\qr-code.jpg"
                        alt="QR Code"
                        className="w-32 h-32 border border-gray-300 mb-2"
                      />
                      <p className="text-sm text-gray-700 font-semibold mb-2">
                        {
                          paymentMethods.find(
                            (m) => m.id === selectedPaymentMethod
                          )?.qrData
                        }
                      </p>
                      <button
                        onClick={() =>
                          copyToClipboard(
                            paymentMethods.find(
                              (m) => m.id === selectedPaymentMethod
                            )?.qrData
                          )
                        }
                        className="flex items-center text-custom-blue hover:text-blue-600 text-sm font-medium"
                      >
                        <Copy className="w-4 h-4 mr-1" /> Copy QR Data
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* Right Column - Terms */}
            <div className="lg:col-span-1 border-2 rounded-md">
              {" "}
              {/* Reverted to original border styling */}
              <div className="bg-white rounded-lg shadow p-6 sticky top-6">
                {" "}
                {/* Reverted to original inner div styling */}
                <h2 className="text-lg font-semibold">Dunamis Donation</h2>
                <h2 className="text-lg font-semibold mb-4 border-b-2 border-gray-300">
                  Terms & Conditions
                </h2>
                <div className="text-sm text-neutral-500 space-y-3 mb-6 max-h-96 overflow-y-auto pr-2">
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
                <div className="space-y-3 mb-6 pt-4 border-t border-gray-200">
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      checked={agreeToTerms}
                      onChange={(e) => setAgreeToTerms(e.target.checked)}
                      className="mt-1 mr-3"
                    />
                    <span className="text-sm text-gray-700">
                      I agree to the terms and conditions
                    </span>
                  </label>
                </div>
                <div className="flex justify-center mb-6">
                  <div className="text-6xl">🤝</div>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={handleSubmit}
                    disabled={!agreeToTerms || isSubmitting}
                    className={`flex-1 px-4 py-3 rounded-md font-medium transition-colors flex items-center justify-center
                      ${
                        agreeToTerms && !isSubmitting
                          ? "bg-custom-blue text-white hover:bg-green-600"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
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
                        Processing...
                      </span>
                    ) : (
                      "Accept & DONATE"
                    )}
                  </button>
                  <button
                    onClick={() => {
                      // Reset form or navigate back
                      setDonationAmount("");
                      setCustomAmount("");
                      setDonationPurpose("General Fund");
                      setOtherPurpose("");
                      setPersonalDetails({
                        fullName: "",
                        email: "",
                        phone: "",
                        address: "",
                        city: "",
                        state: "",
                        postalCode: "",
                        country: "",
                      });
                      setSelectedPaymentMethod("");
                      setShowQRCode(false);
                      setAgreeToTerms(false);
                      setRemainAnonymous(false);
                      setSubmitMessage({ type: "", text: "" });
                      // handleBackButtonClick("/"); // If navigation is enabled
                    }}
                    className="flex-1 bg-red-500 text-white px-4 py-3 rounded-md hover:bg-red-600 font-medium"
                  >
                    Cancel
                  </button>
                </div>
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
                    {submitMessage.text}
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DonatePage;
