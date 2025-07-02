const express = require('express');
const router = express.Router();
const {
  register,
  login,
  forgotPassword,
  googleLogin,
  verifyEmail,
  resendVerification,
} = require('../controllers/authController');
const authController = require('../controllers/authController'); 
const protect = require('../middleware/authMiddleware');
router.post('/reset-password/:token', authController.resetPassword);
// Auth Routes
router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/google-login', googleLogin);

// Email verification
router.get('/verify-email/:token', verifyEmail);
router.post('/resend-verification', resendVerification);

// Protected route example
router.get('/profile', protect, async (req, res) => {
  res.json(req.user);
});

module.exports = router;
