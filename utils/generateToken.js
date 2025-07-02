// utils/generateToken.js
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET || 'secret123', // fallback in case .env is missing
    { expiresIn: '7d' }                    // token valid for 7 days
  );
};

module.exports = generateToken;
