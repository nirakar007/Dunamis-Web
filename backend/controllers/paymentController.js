// backend/controllers/paymentController.js
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Donation = require("../models/Donation");

// --- FUNCTION 1: To create the payment page for the user ---
// This function is called by YOUR frontend.
exports.createCheckoutSession = async (req, res) => {
  const { amount, purpose, donorName, donorEmail } = req.body;

  try {
    // Amount in Stripe must be in the smallest currency unit (e.g., paisa for NPR)
    const amountInPaisa = Math.round(parseFloat(amount) * 100);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "npr",
            product_data: {
              name: "Donation to Dunamis",
              description: purpose || "General Fund",
            },
            unit_amount: amountInPaisa,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/donation-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/donate`,
      metadata: {
        donorName: donorName || "Anonymous",
        donorEmail: donorEmail || "N/A",
      },
    });

    // Create a pending donation record in our database
    await Donation.create({
      amount: parseFloat(amount),
      purpose: purpose || "General Fund",
      donorName: donorName || "Anonymous",
      donorEmail: donorEmail || "N/A",
      stripeCheckoutId: session.id,
      status: "pending",
    });

    // Send the session ID back to the frontend to redirect
    res.json({ id: session.id });
  } catch (error) {
    console.error("Stripe Session Error:", error);
    res.status(500).json({ msg: "Failed to create payment session." });
  }
};

// --- FUNCTION 2: To listen for confirmation from Stripe ---
// This function is called by THE STRIPE SERVERS, not your frontend.
exports.handleStripeWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  let event;

  try {
    // Verify the event came from Stripe
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error("Webhook signature verification failed.", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the checkout.session.completed event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    console.log("✅ Payment successful! Session ID:", session.id);

    // Find the corresponding donation in your database and update its status
    try {
      const updatedDonation = await Donation.findOneAndUpdate(
        { stripeCheckoutId: session.id },
        { status: "completed" },
        { new: true } // Return the updated document
      );
      console.log("Database updated for donation:", updatedDonation);
    } catch (dbError) {
      console.error("Failed to update donation status in database:", dbError);
    }
  }

  // Return a 200 response to acknowledge receipt of the event
  res.status(200).json({ received: true });
};


// --- FUNCTION 3: To simulate a donation for presentation purposes ---
// This function creates a 'completed' donation record directly.
exports.createManualDonation = async (req, res) => {
    const { amount, purpose, donorName, donorEmail } = req.body;

    try {
        const donationAmount = parseFloat(amount);
        if (isNaN(donationAmount) || donationAmount <= 0) {
            return res.status(400).json({ msg: 'Invalid donation amount.' });
        }

        // Create a COMPLETED donation record in our database
        const newDonation = await Donation.create({
            amount: donationAmount,
            purpose: purpose || 'General Fund',
            donorName: donorName || 'Anonymous',
            donorEmail: donorEmail || 'N/A',
            stripeCheckoutId: `manual_${Date.now()}`, // Create a fake ID
            status: 'completed', // <-- The key difference!
        });

        console.log('✅ Manual donation recorded successfully:', newDonation);
        res.status(201).json({ success: true, msg: 'Donation recorded successfully!' });

    } catch (error) {
        console.error("Manual Donation Error:", error);
        res.status(500).json({ msg: 'Failed to record manual donation.' });
    }
};