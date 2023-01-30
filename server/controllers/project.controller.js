const {
  UserRepository, WorkspaceRepository, ProjectRepository, BoardRepository, ColumnRepository,
} = require('../database');

const userRepository = new UserRepository();
const workspaceRepository = new WorkspaceRepository();
const projectRepository = new ProjectRepository();
const boardRepository = new BoardRepository();
const columnRepository = new ColumnRepository();

module.exports = {

  createProject: async (req, res) => {
    const { workspaceKey } = req.params;
    const {
      title, description, key,
    } = req.body;

    const workspace = await workspaceRepository.findWorkspaceByKey({ workspaceKey });

    if (!workspace) return res.status(404).json({ message: 'workspace not found' });

    const alreadyExit = await projectRepository.findDuplicatePoject({ workspaceKey, title });
    if (alreadyExit) return res.status(409).json({ message: 'project already exists' });

    const project = await projectRepository.createProject({
      workspaceKey, title, key, description, teamLead: req.user._id,
    });

    if (!project) return res.status(500).json({ message: 'could not create the workspace' });

    project.members.push({ member: req.user._id, role: 'TEAM_LEAD' });

    await project.save();

    const board = await boardRepository.createBoard({ projectKey: project.key, workspaceKey, title: `${project.key} board'` });

    const column1 = await columnRepository.createColumn({ title: 'TO DO' });
    const column2 = await columnRepository.createColumn({ title: 'IN PROGRESS' });
    const column3 = await columnRepository.createColumn({ title: 'DONE' });

    board.columns.push(column1._id);
    board.columns.push(column2._id);
    board.columns.push(column3._id);

    await board.save();

    await userRepository.addProject({
      _id: req.user._id, projectId: project._id,
    });

    return res.status(201).json({ message: 'successfully created project', projectId: project._id });
  },

  //   addMember: async (req, res) => {

  //   },

  //   updateProject: async (req, res) => {

  //   },

};
