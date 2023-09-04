const jwt = require('jsonwebtoken');
const { secretKey } = require('./authRoutes');

module.exports = (req, res, next) => {
  try {
    // Get the token from the request headers
    const token = req.headers.authorization.split(' ')[1];
    
    // Verify the token
    const decodedToken = jwt.verify(token, secretKey);
    
    // Add user data to the request for further use
    req.userData = { userId: decodedToken.userId };
    
    next(); // Continue to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ message: 'Authentication failed' });
  }
};
