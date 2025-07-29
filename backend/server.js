// backend/server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load env vars right at the top
dotenv.config({ path: "./.env" });

// Connect to Database
connectDB();

const app = express();

// --- Middleware ---
// Enable CORS for all origins
app.use(cors());
// Body parser to accept JSON data
app.use(express.json());

// A simple welcome route
app.get("/", (req, res) => res.send("API is Running"));

// --- Define Routes ---
// This path MUST match the structure of your routes file
app.use("/api/auth", require("./routes/authRoutes"));
// --- content upload route ---
app.use("/api/content", require("./routes/contentRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/payment", require("./routes/paymentRoutes"));
app.use("/api/contact", require("./routes/contactRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
