require('dotenv').config(); // 🔐 Load environment variables

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const authRoutes = require('./routes/authRoutes'); // 🔐 Auth routes

const app = express();

// ✅ CORS: Allow local and live frontend origins
app.use(
  cors({
    origin: [
      'http://localhost:5173', // Dev environment
      'https://teqilah-brand-6p53sjeh7-cephas-projects-87e03470.vercel.app', // Live Vercel frontend
    ],
    credentials: true, // Allows sending cookies/tokens between origins
  })
);

app.use(express.json()); // Parse JSON request bodies

// ✅ Static file access (uploads, if used)
app.use('/uploads', express.static('uploads'));

// ✅ Route setup
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/auth', authRoutes);

// ✅ Debugging (Email + Mongo)
console.log('✅ EMAIL_USER:', process.env.EMAIL_USER);
console.log('✅ EMAIL_PASS:', process.env.EMAIL_PASS ? 'Loaded' : 'Missing');

// ✅ Mongoose config
mongoose.set('strictQuery', false);
mongoose.set('debug', true); // Optional: disable in production

mongoose
  .connect(process.env.MONGO_URI, {
    dbName: 'nexacluster', // Or your DB name
  })
  .then(() => {
    console.log('✅ MongoDB Connected');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
  })
  .catch((err) => console.error('❌ MongoDB connection error:', err));
