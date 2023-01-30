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

const moveIssuePayload = Joi.object({
  columnId: Joi.string().required(),
  issueId: Joi.string().required(),
  fromIndex: Joi.string().required(),
  toIndex: Joi.string().required(),
});

const switchIssuePayload = Joi.object({
  fromColumnId: Joi.string().required(),
  toColumnId: Joi.string().required(),
  issueId: Joi.string().required(),
  fromIndex: Joi.number().required(),
  toIndex: Joi.number().required(),
});

module.exports = {
  login,
  signUp,
  workspacePayload,
  profilePayload,
  addMemberPayload,
  projectPayload,
  issuePayload,
  moveIssuePayload,
  switchIssuePayload,
};
