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

const profilePayload = Joi.object({
  displayName: Joi.string().required(),
  avatarLink: Joi.string().allow('', null),
});

const workspacePayload = Joi.object({
  title: Joi.string().required(),
  key: Joi.string().required(),
  description: Joi.string().allow('', null),
});

const addMemberPayload = Joi.object({
  workspaceId: Joi.string().required(),
  role: Joi.string().required(),
});

const projectPayload = Joi.object({
  title: Joi.string().required(),
  key: Joi.string().required(),
  description: Joi.string().required(),
});

const issuePayload = Joi.object({
  columnId: Joi.string().required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  dueDate: Joi.date(),
});

module.exports = {
  login,
  signUp,
  workspacePayload,
  profilePayload,
  addMemberPayload,
  projectPayload,
  issuePayload,
};
