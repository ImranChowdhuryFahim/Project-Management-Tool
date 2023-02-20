const { UserRepository, WorkspaceRepository, ProjectRepository } = require('../database');

const userRepository = new UserRepository();
const workspaceRepository = new WorkspaceRepository();
const projectRepository = new ProjectRepository();

module.exports = {

  createWorkspace: async (req, res) => {
    const { title, description, key } = req.body;

    const titleExist = await workspaceRepository.findWorkspaceByTitle({ title });
    if (titleExist) return res.status(409).json({ message: 'title already exists' });

    const keyExist = await workspaceRepository.findWorkspaceByKey({workspaceKey:key})
    if (keyExist) return res.status(409).json({ message: 'key already exists' });

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
    const { email, role } = req.body;

    const workspace = await workspaceRepository.findWorkspaceByKey({ workspaceKey });

    if (!workspace) return res.status(404).json({ message: 'workspace not found' });

    const user = await userRepository.findUserByEmail({email,role});
    if(!user) return res.status(404).json({message: 'user not found'})

    const alreadyExit = await workspaceRepository.findmember({ workspaceKey, userId:user._id });
    if (alreadyExit) return res.status(409).json({ message: 'member already exist' });

    workspace.members.push({ member: user._id, role });
    await workspace.save();

    return res.status(200).json({ message: 'successfully added user' ,user: user});
  },

  getWorkspaceDetails: async (req, res) => {
    const { workspaceKey } = req.params;
    const workspace = await workspaceRepository.findWorkspaceDetailsByKey({ workspaceKey });

    if (!workspace) return res.status(404).json({ message: 'not found' });

    return res.status(200).json({ workspace });
  },

  getProjectsList: async (req,res) => {
    const {workspaceKey} = req.params;

    const projects = await projectRepository.findAllProjects({workspaceKey});

    return res.status(200).json({projects});

  }

};
