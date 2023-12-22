const jwt = require('jsonwebtoken');
const configToken = require('../conf/token');

module.exports = {
  client: (request, response, next) => {
    const token = request.header('Authorization');
    if (!token) return response.status(401).json({ message: 'Invalid Token' });

    try {
      const verified = jwt.verify(token, configToken.secret);
      next();
    } catch (err) {
      return response.status(400).json({ message: 'Invalid Token' });
    }
  },

  counselors: (request, response, next) => {
    const token = request.header('Authorization');
    if (!token) return response.status(401).json({ message: 'Invalid Token' });

    try {
      const verified = jwt.verify(token, configToken.secret);
      next();
    } catch (err) {
      return response.status(400).json({ message: 'Invalid Token' });
    }
  },
  admin: (request, response, next) => {
    const token = request.header('Authorization');
    if (!token) return response.status(401).json({ message: 'Invalid Token' });

    try {
      const verified = jwt.verify(token, configToken.secret);
      if (verified.role !== 'admin') {
        return response.status(401).json({ message: 'Invalid Token' })
      }
      next();
    } catch (err) {
      return response.status(400).json({ message: 'Invalid Token' });
    }
  },
}