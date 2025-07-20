const crypto = require('crypto');

// Simple password hashing using SHA256
function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

// Compare password with hashed password
function comparePassword(password, hashedPassword) {
  return hashPassword(password) === hashedPassword;
}

module.exports = { hashPassword, comparePassword };
