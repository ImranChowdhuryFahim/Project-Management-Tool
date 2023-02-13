const { UserRepository, WorkspaceRepository } = require('../database');

const userRepository = new UserRepository();
const workspaceRepository = new WorkspaceRepository();

module.exports = {

  createWorkspace: async (req, res) => {
    const { title, description, key } = req.body;

    const alreadyExit = await workspaceRepository.findWorkspaceByTitle({ title });
    if (alreadyExit) return res.status(409).json({ message: 'workspace already exists' });

    const workspace = await workspaceRepository.createWorkspace({
      title, key, description, owner: req.user._id,
    });

    if (!workspace) return res.status(500).json({ message: 'could not create the workspace' });

    workspace.members.push({ member: req.user._id, role: 'OWNER' });
    await workspace.save();

    await userRepository.addWorkspace({ _id: req.user._id, workspaceId: workspace._id, role: 'OWNER' });

    return res.status(201).json({ message: 'successfully created workspace', workspaceId: workspace._id });
  },

  //   generateInvitation: async (req, res) => {

  //   },

  //   join: async (req, res) => {

  //   },

  addMember: async (req, res) => {
    const { workspaceKey } = req.params;
    const { userId, role } = req.body;

    const workspace = await workspaceRepository.findWorkspaceByKey({ workspaceKey });

    if (!workspace) return res.status(404).json({ message: 'not found' });

    const alreadyExit = await workspaceRepository.findmember({ workspaceKey, userId });
    if (alreadyExit) return res.status(409).json({ message: 'member already exist' });

    workspace.members.push({ member: userId, role });
    await workspace.save();

    return res.status(200).json({ message: 'successfully added user' });
  },

  getWorkspaceDetails: async (req, res) => {
    const { workspaceKey } = req.params;
    const workspace = await workspaceRepository.findWorkspaceDetailsByKey({ workspaceKey });

    if (!workspace) return res.status(404).json({ message: 'not found' });

    return res.status(200).json({ workspace });
  },

};
