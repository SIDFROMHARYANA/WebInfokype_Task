const jwt = require('jsonwebtoken');


const verifyToken = (req, res, next) => {
  
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, 'secret_key', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    req.adminId = decoded.id;
    next();
  });
}



  module.exports.verifyToken = verifyToken