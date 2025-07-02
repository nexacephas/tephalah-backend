// server/controllers/orderController.js
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
const puppeteer = require('puppeteer');

exports.sendOrderReceipt = async (req, res) => {
  const {
    name,
    email,
    items,
    total,
    address,
    shippingMethod,
    orderId,
    deliveryStatus,
  } = req.body;

  if (!name || !email || !items || !total) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // Render the EJS template into HTML
    const html = await ejs.renderFile(
      path.join(__dirname, '../templates/receipt.ejs'),
      {
        name,
        email,
        items,
        total,
        address,
        shippingMethod,
        orderId,
        deliveryStatus,
      }
    );

    // Launch puppeteer to generate PDF from HTML
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });

    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
    });

    await browser.close();

    // Send email with PDF
 const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // from .env
    pass: process.env.EMAIL_PASS, // app password from .env
  },
});
    await transporter.sendMail({
      from: '"Tephilah" <your_email@gmail.com>',
      to: email,
      subject: 'Your Order Receipt',
      text: `Thank you ${name}, your order is confirmed.`,
      attachments: [
        {
          filename: 'receipt.pdf',
          content: pdfBuffer,
        },
      ],
    });

    res.status(200).json({ message: 'Receipt sent successfully' });
  } catch (err) {
    console.error('❌ Failed to send receipt:', err);
    res.status(500).json({ message: 'Could not send receipt' });
  }
};
