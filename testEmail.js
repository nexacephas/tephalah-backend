require('dotenv').config();
const sendEmail = require('./utils/sendEmail');

sendEmail({
  to: 'ayojola75@gmail.com',
  subject: 'Test from Tephila Resend Setup',
  html: '<h2>Hello 👋</h2><p>This is a styled test email from <b>Tephila Brand</b>.</p>',
});
