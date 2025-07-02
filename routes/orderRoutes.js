// server/routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const sendEmail = require('../utils/sendEmail');
const { sendOrderReceipt } = require('../controllers/orderController');

router.post('/send-receipt', sendOrderReceipt);
router.post('/', async (req, res) => {
  try {
    const { name, email, items, shippingCost, total, paymentMethod } = req.body;

    const newOrder = new Order({ name, email, items, shippingCost, total, paymentMethod });
    await newOrder.save();

    // Format items list for email
    const itemList = items.map(
      (item) => `<li>${item.title} - ₦${item.price} x ${item.quantity} (Size: ${item.size}, Color: ${item.color})</li>`
    ).join('');

    // Send confirmation email
    await sendEmail({
      to: email,
      subject: '🧾 Order Confirmation - Tephila Brand',
      html: `
        <h2>Hi ${name},</h2>
        <p>Thanks for your order! Here’s your receipt:</p>
        <ul>${itemList}</ul>
        <p><strong>Shipping:</strong> ₦${shippingCost}</p>
        <p><strong>Total:</strong> ₦${total}</p>
        <p>We’ll contact you once it’s on the way.</p>
        <br/>
        <p>Tephila Brand 💖</p>
      `
    });

    res.status(201).json({ message: '✅ Order placed & email sent!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: '❌ Failed to place order' });
  }
});

module.exports = router;
