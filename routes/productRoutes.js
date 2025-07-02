const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  createProduct,
  deleteProduct,
  updateProduct,
} = require('../controllers/productController');

const upload = require('../utils/multer');
const protect = require('../middleware/authMiddleware');

// GET all products
router.get('/', getAllProducts);

// POST new product (with Cloudinary upload)
router.post('/', protect, upload.single('image'), createProduct);

// DELETE a product
router.delete('/:id', protect, deleteProduct);

// UPDATE a product
router.put('/:id', protect, upload.single('image'), updateProduct);

module.exports = router;
