const jwt = require('jsonwebtoken');

module.exports.authenticate = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) {
    return res.status(401).message({ message: 'access denied' });
  }
  try {
    const varifiedUser = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = varifiedUser;
    return next();
  } catch (err) {
    return res.status(498).jons({ message: 'invalid token' });
  }
};
