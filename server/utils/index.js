const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config');

const generateSalt = async () => bcrypt.genSalt(10);

const generateHash = async (password) => {
  const salt = await generateSalt();
  return bcrypt.hash(password, salt);
};

// eslint-disable-next-line max-len
const validatePassword = async (password, savedPassword) => bcrypt.compare(password, savedPassword);

const generateSignature = async (payload) => jwt.sign(payload, config.token_secret);

const validateSignature = async (token) => jwt.verify(token, config.token_secret);

module.exports = {
  generateHash,
  validatePassword,
  generateSignature,
  validateSignature,
};
