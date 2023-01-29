const jwt = require('jsonwebtoken');
const { UserRepository } = require('../database');

const repository = new UserRepository();

module.exports.authenticate = async (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) {
    return res.status(401).json({ message: 'access denied' });
  }
  try {
    const varifiedUser = jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await repository.findUserById({ _id: varifiedUser._id });
    if (!user) res.status(404).json({ message: 'user not found' });
    const { _id } = user;
    req.user = { _id };
    return next();
  } catch (err) {
    return res.status(498).json({ message: 'invalid token' });
  }
};
