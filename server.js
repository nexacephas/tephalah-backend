require('dotenv').config(); // 🔐 Load environment variables

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Route imports
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const authRoutes = require('./routes/authRoutes'); // 🔐 Include this if you’re using auth

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON request bodies

mongoose.set('debug', true); // Log Mongoose queries (can be turned off in production)

// Routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/auth', authRoutes); // 👈 Ensure auth routes are registered
console.log('✅ EMAIL_USER:', process.env.EMAIL_USER);
console.log('✅ EMAIL_PASS:', process.env.EMAIL_PASS ? 'Loaded' : 'Missing');
app.use('/uploads', express.static('uploads'));
// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB Connected');
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
})
.catch((err) => console.error('❌ MongoDB connection error:', err));
