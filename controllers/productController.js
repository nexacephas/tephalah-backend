// server/controllers/productController.js
// This file handles product-related operations like fetching, creating, updating, and deleting products.
const slugify = require('slugify');
const Product = require('../models/Product');
const { cloudinary } = require('../utils/cloudinary');

// GET all products
const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

// CREATE product
// CREATE product

const createProduct = async (req, res) => {
  try {
    const { title, price, category } = req.body;
    let imageUrl = '';
    let slug = slugify(title, { lower: true });

    // Ensure uniqueness of slug
    const existing = await Product.findOne({ slug });
    if (existing) {
      slug = `${slug}-${Date.now()}`; // or use nanoid for shorter random string
    }

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'tephilah-products',
      });
      imageUrl = result.secure_url;
    }

    const newProduct = new Product({
      title,
      slug,
      price,
      category,
      image: imageUrl,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    console.error('❌ Upload failed:', err);
    res.status(500).json({ error: 'Product upload failed' });
  }
};




// DELETE product
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Deletion failed' });
  }
};

// UPDATE product
const updateProduct = async (req, res) => {
  try {
    const { title, price, category } = req.body;
    const updatedData = { title, price, category };

    if (title) {
      updatedData.slug = slugify(title, { lower: true, strict: true });
    }

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'tephilah-products',
      });
      updatedData.image = result.secure_url;
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    console.error('❌ Update failed:', err);
    res.status(500).json({ error: 'Update failed' });
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  deleteProduct,
  updateProduct,
};
