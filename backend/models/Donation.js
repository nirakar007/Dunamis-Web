// backend/models/Donation.js
const mongoose = require('mongoose');

const DonationSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    currency: {
        type: String,
        default: 'npr', // Assuming Nepalese Rupee
    },
    donorName: {
        type: String,
        default: 'Anonymous',
    },
    donorEmail: {
        type: String,
    },
    purpose: {
        type: String,
        default: 'General Fund'
    },
    // This is the session ID from Stripe
    stripeCheckoutId: {
        type: String,
        required: true,
        unique: true,
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'failed'],
        default: 'pending'
    }
}, { timestamps: true });

module.exports = mongoose.model('Donation', DonationSchema);