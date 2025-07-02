const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  items: [
    {
      title: String,
      price: Number,
      quantity: Number,
      size: String,
      color: String,
      image: String,
    },
  ],
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    country: String,
    postalCode: String,
  },
  shippingCost: { type: Number, required: true },
  total: { type: Number, required: true },
  paymentMethod: { type: String, default: 'paystack' },
  paymentDetails: {
    transactionId: String,
    paidAt: Date,
    paymentStatus: {
      type: String,
      enum: ['pending', 'success', 'failed'],
      default: 'pending',
    },
  },
  status: {
    type: String,
    enum: ['pending', 'paid', 'shipped', 'delivered', 'cancelled'],
    default: 'pending',
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);
