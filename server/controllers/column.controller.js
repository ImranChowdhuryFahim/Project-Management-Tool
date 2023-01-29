const { UserRepository, WorkspaceRepository, ProjectRepository } = require('../database');

const userRepository = new UserRepository();
const workspaceRepository = new WorkspaceRepository();
const projectRepository = new ProjectRepository();

module.exports = {

  createProject: async (req, res) => {
    const {
      workspaceId, title, description, key,
    } = req.body;

    const workspace = await workspaceRepository.findWorkspaceById({ _id: workspaceId });

    if (!workspace) return res.status(404).json({ message: 'workspace not found' });

    const alreadyExit = await projectRepository.findDuplicatePoject({ workspaceId, title, key });
    if (alreadyExit) return res.status(409).json({ message: 'project already exists' });

    const project = await projectRepository.createProject({
      workspaceId, title, key, description, teamLead: req.user._id,
    });

    if (!project) return res.status(500).json({ message: 'could not create the workspace' });

    project.members.push({ member: req.user._id, role: 'TEAM_LEAD' });

    await project.save();
    const user = await userRepository.findUserById({ _id: req.user._id });

    user.projects.push({ project: project._id, role: 'TEAM_LEAD' });
    await user.save();

    return res.status(201).json({ message: 'successfully created project', projectId: project._id });
  },

};
