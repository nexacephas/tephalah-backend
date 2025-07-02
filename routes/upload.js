const express = require('express');
const router = express.Router();
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../utils/cloudinary');
const Product = require('../models/Product');

// Configure Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'tephilah_products',
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});

const upload = multer({ storage });

// @POST /api/products
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, price, category } = req.body;

    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Image is required' });
    }

    const imageUrl = req.file.path || req.file.secure_url; // fallback handling

    const newProduct = new Product({
      title,
      price,
      category,
      image: imageUrl,
    });

    await newProduct.save();

    res.status(201).json({
      success: true,
      message: '✅ Product uploaded successfully',
      product: newProduct,
    });
  } catch (err) {
    console.error('❌ Upload error:', err.message);
    res.status(500).json({ success: false, message: 'Upload failed. Please try again.' });
  }
});

module.exports = router;
