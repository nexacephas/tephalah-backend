// server/templates/verifyEmailTemplate.js
const baseTemplate = require('./baseLayout');

module.exports = (name, link) => {
  const content = `
    <p>Hello <strong>${name}</strong>,</p>
    <p>Thank you for registering with Tephila Brand.</p>
    <p>Please click the button below to verify your email address:</p>
    <div style="text-align: center; margin: 20px 0;">
      <a href="${link}" style="background-color: #4B0082; color: white; padding: 12px 20px; text-decoration: none; border-radius: 5px;">
        Verify Email
      </a>
    </div>
  `;
  return baseTemplate('Verify Your Email', content);
};
