import { ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const DonationSuccess = () => {
  useEffect(() => {
    // Here you would typically take the session_id from the URL,
    // send it to your backend to verify the payment and update the
    // donation status from 'pending' to 'completed'.
    // For now, we'll just show a success message.
    console.log("Donation successful!");
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1 className="font-semibold mb-2 text-2xl">
        Thank You For Your Donation!
      </h1>
      <p>Your support helps us continue our mission.</p>
      <div className="flex justify-center items-center p-4 mt-4 rounded-xl">
        <ArrowLeft />
        <Link
          to="/"
          className="text-white bg-custom-blue p-4 hover:bg-blue-500 rounded-lg"
        >
          Go Back to Home
        </Link>
      </div>
    </div>
  );
};

export default DonationSuccess;
