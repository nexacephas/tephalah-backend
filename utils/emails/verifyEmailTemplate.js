// utils/emails/verifyEmailTemplate.js

module.exports = (name, link) => `
  <div style="max-width:600px;margin:auto;padding:20px;font-family:Arial,sans-serif;background-color:#f9f9f9;">
    <div style="text-align:center;">
      <h2 style="color:#5c2d91;">Tephila Brand</h2>
      <p style="font-size:16px;color:#333;">Hello <strong>${name}</strong>,</p>
      <p style="font-size:15px;">Thank you for registering with us! Please verify your email address to activate your account.</p>
      <a href="${link}" style="display:inline-block;margin-top:20px;padding:12px 24px;background-color:#5c2d91;color:#fff;text-decoration:none;border-radius:5px;">
        Verify Email
      </a>
      <p style="margin-top:30px;font-size:13px;color:#777;">If you didn't request this, you can safely ignore it.</p>
      <p style="margin-top:20px;font-size:12px;color:#aaa;">&copy; ${new Date().getFullYear()} Tephila Brand. All rights reserved.</p>
    </div>
  </div>
`;
