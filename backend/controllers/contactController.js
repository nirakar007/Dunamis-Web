// backend/controllers/contactController.js
const nodemailer = require("nodemailer");

exports.sendContactEmail = async (req, res) => {
  console.log("--- Mailtrap Credentials Check ---");
  console.log("HOST:", process.env.MAILTRAP_HOST);
  console.log("USER:", process.env.MAILTRAP_USER);
  console.log("PASS:", process.env.MAILTRAP_PASS ? "Exists" : "MISSING!"); // Don't log the actual password
  console.log("---------------------------------");

  const { email, phone, query } = req.body;

  if (!email || !query) {
    return res.status(400).json({ msg: "Email and query are required." });
  }

  // --- The content of the email remains the same ---
  const output = `
        <p>You have a new contact request</p>
        <h3>Contact Details</h3>
        <ul>  
            <li>Email: ${email}</li>
            <li>Phone: ${phone || "Not Provided"}</li>
        </ul>
        <h3>Message</h3>
        <p>${query}</p>
    `;

  // --- THIS IS THE UPDATED PART ---
  // 1. Create a transporter object using Mailtrap credentials from .env
  let transporter = nodemailer.createTransport({
    host: process.env.MAILTRAP_HOST,
    port: process.env.MAILTRAP_PORT,
    auth: {
      user: process.env.MAILTRAP_USER,
      pass: process.env.MAILTRAP_PASS,
    },
  });

  // 2. Set up email data
  let mailOptions = {
    from: '"Dunamis Contact Form" <from@dunamis.com>', // The 'from' address can be anything
    to: process.env.EMAIL_TO, // The address where the email appears to be sent
    subject: "New Message from Dunamis Contact Page",
    html: output,
  };

  // 3. Send the email
  try {
    await transporter.sendMail(mailOptions);
    console.log("Message sent successfully to Mailtrap!");
    res.status(200).json({ success: true, msg: "Message sent successfully!" });
  } catch (error) {
    console.error("Error sending email to Mailtrap:", error);
    res.status(500).json({ msg: "Server error: Could not send email." });
  }
};
