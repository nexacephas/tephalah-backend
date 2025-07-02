const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true, lowercase: true },
  image: String,
  description: String,
  price: { type: Number, required: true },
  category: String,
  inStock: { type: Boolean, default: true },
  rating: { type: Number, default: 0 },
  numReviews: { type: Number, default: 0 },
  tags: [String],
  variants: [
    {
      size: String,
      color: String,
      stock: Number,
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
