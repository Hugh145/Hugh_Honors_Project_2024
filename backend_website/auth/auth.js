const jwt = require('jsonwebtoken');

// Middleware to verify JWT token and extract user information
// const User = require('../models/userModel');
// const Blog = require('../models/BlogModel');
exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'No token provided' });

  const token = authHeader.split(' ')[1];
  jwt.verify(token, "SECRET_KEY", (err, decoded) => {
    if (err) return res.status(401).json({ message: 'Invalid token' });
    req.user = decoded;
    next();
  });
};
