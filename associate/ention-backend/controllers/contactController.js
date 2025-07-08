// controllers/contactController.js
const nodemailer = require('nodemailer');

const sendContactMail = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Thanks for contacting ENTION! 🎉',
    html: `<p>Dear ${name},</p><p>Thank you for reaching out to ENTION. Your request has been received and our team will get back to you shortly.</p><p>Regards,<br>ENTION Team</p>`
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully.' });
  } catch (err) {
    console.error('Email send error:', err);
    res.status(500).json({ error: 'Failed to send email.' });
  }
};

module.exports = { sendContactMail };
