// server/utils/sendEmail.js
require('dotenv').config(); // ✅ Load environment variables at the top

const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY); // ✅ Uses env

const sendEmail = async ({ to, subject, html }) => {
  try {
    const response = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to,
      subject,
      html,
    });

    console.log('✅ Email sent with Resend:', response);

  } catch (err) {
    console.error('❌ Email failed:', err.message);
  }
};

module.exports = sendEmail;
