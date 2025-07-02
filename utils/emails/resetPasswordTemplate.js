// utils/emails/resetPasswordTemplate.js

module.exports = (name, link) => `
  <div style="max-width:600px;margin:auto;padding:20px;font-family:Arial,sans-serif;background-color:#fefefe;">
    <div style="text-align:center;">
      <h2 style="color:#e63946;">Reset Your Password</h2>
      <p style="font-size:16px;color:#333;">Hi <strong>${name}</strong>,</p>
      <p style="font-size:15px;">We received a request to reset your password. Click the button below to create a new one.</p>
      <a href="${link}" style="display:inline-block;margin-top:20px;padding:12px 24px;background-color:#e63946;color:#fff;text-decoration:none;border-radius:5px;">
        Reset Password
      </a>
      <p style="margin-top:30px;font-size:13px;color:#777;">If you didn't request a password reset, no action is needed.</p>
      <p style="margin-top:20px;font-size:12px;color:#aaa;">&copy; ${new Date().getFullYear()} Tephila Brand. All rights reserved.</p>
    </div>
  </div>
`;
