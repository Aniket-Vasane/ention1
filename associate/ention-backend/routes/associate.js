const express = require("express");
const router = express.Router();
const Associate = require("../models/Associate");
//const nodemailer = require("nodemailer");

router.post("/", async (req, res) => {
  const { name, email, phone, message } = req.body;

  try {
    const newEntry = new Associate({ name, email, phone, message });
    await newEntry.save();

    // Send thank-you email
    // const transporter = nodemailer.createTransport({
    //   service: "gmail",
    //   auth: {
    //     user: process.env.EMAIL,
    //     pass: process.env.EMAIL_PASS
    //   }
    // });

    // await transporter.sendMail({
    //   from: process.env.EMAIL,
    //   to: email,
    //   subject: "Thank You for Contacting EnTion",
    //   text: `Hi ${name},\n\nThank you for reaching out to EnTion. We'll get back to you shortly.\n\nBest Regards,\nTeam EnTion`
    // });

    res.status(200).json({ message: "Form submitted successfully." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
