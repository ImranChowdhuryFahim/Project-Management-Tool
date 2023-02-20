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
  email: Joi.string().required(),
  role: Joi.string().required(),
});

const addProjectMemberPayload = Joi.object({
  userId: Joi.string().required(),
  role: Joi.string().required(),
});

const projectPayload = Joi.object({
  title: Joi.string().required(),
  key: Joi.string().required(),
  description: Joi.string().required(),
});

const issuePayload = Joi.object({
  title: Joi.string().required(),
  priority: Joi.string().required(),
  description: Joi.string().required(),
  dueDate: Joi.date(),
});

const updateIssuePayload = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  isDone: Joi.boolean().required(),
  priority: Joi.string().required(),
  dueDate: Joi.date().required(),
});

const moveIssuePayload = Joi.object({
  columnId: Joi.string().required(),
  fromIndex: Joi.number().required(),
  toIndex: Joi.number().required(),
});

const switchIssuePayload = Joi.object({
  fromColumnId: Joi.string().required(),
  toColumnId: Joi.string().required(),
  fromIndex: Joi.number().required(),
  toIndex: Joi.number().required(),
});

const moveColumnPayload = Joi.object({
  fromIndex: Joi.number().required(),
  toIndex: Joi.number().required(),
});

const columnPayload = Joi.object({
  title: Joi.string().required(),
});

const updateProject = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
});

const assignDeveloperPayload = Joi.object({
  userId: Joi.string().required(),
});

module.exports = {
  login,
  signUp,
  workspacePayload,
  profilePayload,
  addMemberPayload,
  projectPayload,
  issuePayload,
  updateIssuePayload,
  moveIssuePayload,
  switchIssuePayload,
  moveColumnPayload,
  columnPayload,
  updateProject,
  assignDeveloperPayload,
  addProjectMemberPayload,
};
