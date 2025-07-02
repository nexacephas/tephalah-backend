// server/templates/baseTemplate.js
module.exports = (title, content) => `
  <div style="font-family: 'Segoe UI', sans-serif; background-color: #f4f4f4; padding: 30px;">
    <div style="max-width: 600px; margin: auto; background: white; border-radius: 10px; padding: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
      <h2 style="color: #4B0082; text-align: center;">Tephila Brand</h2>
      <h3 style="text-align: center; color: #444;">${title}</h3>
      <div style="font-size: 16px; color: #333;">${content}</div>
      <p style="text-align: center; margin-top: 30px; font-size: 12px; color: #888;">
        If you didn't request this, please ignore this email.
      </p>
    </div>
  </div>
`;
