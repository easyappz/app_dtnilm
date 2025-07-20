const JWT_SECRET = 'mysecretkey123456789';

// Simple JWT token generation
function generateToken(payload) {
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64');
  const body = Buffer.from(JSON.stringify(payload)).toString('base64');
  const signature = require('crypto')
    .createHmac('sha256', JWT_SECRET)
    .update(`${header}.${body}`)
    .digest('base64');
  return `${header}.${body}.${signature}`;
}

// Simple JWT token verification
function verifyToken(token) {
  try {
    const [header, body, signature] = token.split('.');
    const expectedSignature = require('crypto')
      .createHmac('sha256', JWT_SECRET)
      .update(`${header}.${body}`)
      .digest('base64');
    if (signature === expectedSignature) {
      return JSON.parse(Buffer.from(body, 'base64').toString('utf8'));
    }
    return null;
  } catch (error) {
    return null;
  }
}

module.exports = { generateToken, verifyToken };
