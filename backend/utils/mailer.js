const nodemailer = require('nodemailer');

const sendEmail = async ({ to, subject, html, attachments }) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER, // your gmail
      pass: process.env.EMAIL_PASS  // your app password
    }
  });

  await transporter.sendMail({
    from: `"ENTION" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
    attachments
  });
};

module.exports = sendEmail;
