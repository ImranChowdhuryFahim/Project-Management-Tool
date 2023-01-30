const { generateHash, generateSignature, validatePassword } = require('../utils');
const { UserRepository } = require('../database');
const { sendAccountCreatedEmail } = require('../utils/email/mail.service');

const repository = new UserRepository();

module.exports = {
  login: async (req, res) => {
    const { email, password } = req.body;

    const user = await repository.findUserByEmail({ email });
    if (!user) return res.status(404).json({ message: 'no such user exists' });

    const validPass = await validatePassword(password, user.password);
    if (!validPass) return res.status(401).json({ message: 'credentials do not match' });

    const token = await generateSignature({ _id: user._id });

    return res.status(200).json({ message: 'successfully logged in', token });
  },
  register: async (req, res) => {
    const { displayName, email, password } = req.body;

    const emailExist = await repository.findUserByEmail({ email });
    if (emailExist) return res.status(409).json({ message: 'user already exists' });

    const hashedPassword = await generateHash(password);

    const newUser = await repository.createUser({ displayName, email, hashedPassword });

    if (newUser === null) return res.status(400).json({ message: 'could not save the user' });

    sendAccountCreatedEmail({ email, userName: displayName });

    return res.status(200).json({ message: 'successfully registered' });
  },

  getProfileDetails: async (req, res) => {
    const { _id } = req.user;

    const result = await repository.getUserProfile({ _id });
    if (!result) return res.status(404).json({ message: 'user not found' });
    return res.status(200).json({ profileDetails: result });
  },

  updateProfile: async (req, res) => {
    const { _id } = req.user;
    const { displayName, avatarLink } = req.body;

    await repository.updateUserProfile({ _id, displayName, avatarLink });
    return res.status(200).json({ message: 'successfully updated user info' });
  },

  addWorkspace: async (req, res) => {
    const { _id } = req.user;
    const { workspaceId, role } = req.body;

    await repository.addWorkspace({ _id, workspaceId, role });
    return res.status(200).json({ message: 'successfully added workspace' });
  },

  getWorkspaces: async (req, res) => {
    const { _id } = req.user;
    const workspaces = await repository.getWorkspaces({ _id });

    if (!workspaces) return res.status(404).json({ message: 'not found' });

    return res.status(200).json({ workspaces });
  },

  addProject: async (req, res) => {
    const { _id } = req.user;
    const { projectId, role } = req.body;

    await repository.addProject({ _id, projectId, role });
    return res.status(200).json({ message: 'successfully added project' });
  },

  getProjects: async (req, res) => {
    const { _id } = req.user;
    const projects = await repository.getProjects({ _id });

    if (!projects) return res.status(404).json({ message: 'not found' });

    return res.status(200).json({ projects });
  },

  getWorkspaceProjects: async (req, res) => {
    const { _id } = req.user;
    const { workspaceKey } = req.params;
    const projects = await repository.getWorkspaceProjects({ _id, workspaceKey });
    if (!projects) return res.status(404).json({ message: 'not found' });

    return res.status(200).json({ projects });
  },

};
