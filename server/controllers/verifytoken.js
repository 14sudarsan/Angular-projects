const admin = require('../config/firebase');

const verifyFirebaseToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Extract token from Authorization header

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);

    console.log(decodedToken)
    req.user = decodedToken; // Attach user info to the request
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    res.status(403).json({ message: 'Invalid or expired token' });
  }
};

module.exports = verifyFirebaseToken;
