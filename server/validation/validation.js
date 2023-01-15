const Joi = require('joi');

const login = Joi.object({
  email: Joi.string()
    .required()
    .email(),
  password: Joi.string()
    .min(6)
    .required(),
});

const signUp = Joi.object({
  displayName: Joi.string()
    .required(),
  email: Joi.string()
    .required()
    .email(),
  password: Joi.string()
    .min(6)
    .required(),
});

module.exports = {
  login,
  signUp,
};
