const User = require('../models/User');
const bcrypt = require('bcryptjs'); // Add this line

const generateToken = require('../utils/generateToken');
const { OAuth2Client } = require('google-auth-library');
const crypto = require('crypto');

const sendEmail = require('../utils/sendEmail');
const verifyEmailTemplate = require('../templates/verifyEmailTemplate');
const resetPasswordTemplate = require('../templates/resetPasswordTemplate');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// 📌 REGISTER
exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'User already exists' });

    const verifyToken = crypto.randomBytes(32).toString('hex');
    const user = await User.create({ name, email, password, verifyToken });

    const link = `${process.env.CLIENT_URL}/verify-email/${verifyToken}`;
    const html = verifyEmailTemplate(user.name, link);

    await sendEmail({
      to: user.email,
      subject: 'Verify Your Tephila Brand Email',
      html,
    });

    res.status(201).json({ message: 'Registration successful. Check your email to verify your account.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

// 📌 VERIFY EMAIL
exports.verifyEmail = async (req, res) => {
  try {
    const user = await User.findOne({ verifyToken: req.params.token });
    if (!user) return res.status(400).json({ message: 'Invalid or expired token' });

    user.verified = true;
    user.verifyToken = '';
    await user.save();

    res.json({ message: 'Email verified successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Email verification failed' });
  }
};

// 📌 LOGIN
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password)))
      return res.status(401).json({ message: 'Invalid credentials' });

    if (!user.verified)
      return res.status(403).json({ message: 'Please verify your email before logging in.' });

    res.json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error during login' });
  }
};

// 📌 FORGOT PASSWORD
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetToken = resetToken;
    user.resetTokenExpiry = Date.now() + 1000 * 60 * 30; // 30 minutes
    await user.save();

    const link = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
    const html = resetPasswordTemplate(user.name, link);

    await sendEmail({
      to: user.email,
      subject: 'Reset Your Password - Tephila Brand',
      html,
    });

    res.json({ message: 'Password reset link sent to your email' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error sending reset link' });
  }
};

// 📌 GOOGLE LOGIN
exports.googleLogin = async (req, res) => {
  const { token } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { name, email } = ticket.getPayload();

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        name,
        email,
        password: email + process.env.JWT_SECRET,
        verified: true,
      });
    }

    res.json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      },
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Google login failed' });
  }
};

// 📌 RESEND VERIFICATION
exports.resendVerification = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (user.verified) return res.json({ message: 'Email already verified' });

    const verifyToken = crypto.randomBytes(32).toString('hex');
    user.verifyToken = verifyToken;
    await user.save();

    const link = `${process.env.CLIENT_URL}/verify-email/${verifyToken}`;
    const html = verifyEmailTemplate(user.name, link);

    await sendEmail({
      to: user.email,
      subject: 'Verify Your Email - Tephila Brand',
      html,
    });

    res.json({ message: 'Verification email resent' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Resend failed' });
  }
};
// 📌 RESET PASSWORD
exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password || password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    const bcrypt = require('bcryptjs'); // or keep this at top

    user.password = await bcrypt.hash(password, 10);
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });

  } catch (err) {
    console.error('Reset error:', err);
    res.status(500).json({ message: 'Something went wrong resetting password' });
  }
};

