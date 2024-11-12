const jwt = require('jsonwebtoken');

// Middleware to check if the user is authenticated
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  // Check if token is present
  if (!token) {
    return res.status(401).json({ message: 'No token provided, please log in.' });
  }

  // Verify token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    // Store the decoded user information in request
    req.user = decoded;
    next();
  });
};

module.exports = verifyToken;
