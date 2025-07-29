// backend/routes/paymentRoutes.js
const express = require("express");
const router = express.Router();
const {
  createCheckoutSession,
  handleStripeWebhook,
  createManualDonation
} = require("../controllers/paymentController");

// This route is public, anyone can initiate a donation
router.post("/create-checkout-session", createCheckoutSession);

// This route is for Stripe's servers to talk to
router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  handleStripeWebhook
);

router.post('/manual-donation', createManualDonation);

module.exports = router;
