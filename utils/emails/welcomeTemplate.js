// utils/emails/welcomeTemplate.js
const welcomeTemplate = (name) => `
  <div style="font-family:Arial,sans-serif;line-height:1.5;">
    <h2>Welcome to Tephila Brand, ${name}!</h2>
    <p>We’re excited to have you onboard.</p>
    <p>Feel free to explore our latest collections, products, and deals.</p>
    <p style="margin-top:20px;">Thanks,<br/><strong>The Tephila Team</strong></p>
  </div>
`;

module.exports = welcomeTemplate;
