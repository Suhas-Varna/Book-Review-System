// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  let token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Remove 'Bearer ' from token if present
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length);
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded data to the request object
    next(); // Proceed to the next middleware or route
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = protect;
