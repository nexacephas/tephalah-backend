// server/templates/resetPasswordTemplate.js
const baseTemplate = require('./baseLayout');

module.exports = (name, link) => {
  const content = `
    <p>Hi <strong>${name}</strong>,</p>
    <p>We received a request to reset your password.</p>
    <p>Click the button below to choose a new password:</p>
    <div style="text-align: center; margin: 20px 0;">
      <a href="${link}" style="background-color: #FF4500; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px;">
        Reset Password
      </a>
    </div>
    <p>If you didn’t request this, you can safely ignore it.</p>
  `;
  return baseTemplate('Reset Your Password', content);
};
