/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
const {
  IssueRepository, ColumnRepository, BoardRepository, ProjectRepository,
} = require('../database');

const issueRepository = new IssueRepository();
const columnRepository = new ColumnRepository();
const boardRepository = new BoardRepository();
const projectRepository = new ProjectRepository();

module.exports = {

  createIssue: async (req, res) => {
    const { projectKey, workspaceKey, columnId } = req.params;
    const {
      title, description,priority, dueDate,
    } = req.body;

    const board = await boardRepository.findBoard({ projectKey, workspaceKey });
    if (!board) return res.status(404).json({ message: 'board not found' });

    const column = await columnRepository.findColumnById({ columnId });
    if (!column) return res.status(404).json({ message: 'column not found' });

    const issue = await issueRepository.createIssue({
      workspaceKey, projectKey, title, description, key: `${projectKey}-${board.nextIssueId}`, isDone: false, dueDate,priority
    });

    if (!issue) return res.status(500).json({ message: 'could not create' });

    board.nextIssueId += 1;

    board.save();

    column.issues.push(issue._id);

    await column.save();

    return res.status(201).json({ message: 'successfully created issue', issueId: issue._id, issueKey: issue.key });
  },

  getIssueDetails: async (req, res) => {
    const { workspaceKey, projectKey, issueKey } = req.params;
    const issue = await issueRepository.getIssueDetails({ workspaceKey, projectKey, issueKey });

    if (!issue) return res.status(404).json({ message: 'issue not found' });
    return res.status(200).json({ issue });
  },

  updateIssue: async (req, res) => {
    const { issueId } = req.params;
    const {
      title, description, isDone, priority, dueDate,
    } = req.body;
    const issue = await issueRepository.updateIssue({
      issueId, title, description, isDone, dueDate, priority,
    });
    return res.status(200).json({ message: 'successfully updated issue' });
  },

  moveIssue: async (req, res) => {
    const { issueId } = req.params;
    const {
      columnId, fromIndex, toIndex,
    } = req.body;

    const column = await columnRepository.findColumnById({ columnId });

    if (!column) return res.status(404).json({ message: 'column not found' });

    column.issues.splice(fromIndex, 1);
    column.issues.splice(toIndex, 0, issueId);

    await column.save();
    return res.status(200).json({ message: 'successfully moved the issue' });
  },

  switchIssue: async (req, res) => {
    const { issueId } = req.params;
    const {
      fromColumnId, toColumnId, fromIndex, toIndex,
    } = req.body;

    const fromColumn = await columnRepository.findColumnById({ columnId: fromColumnId });
    const toColumn = await columnRepository.findColumnById({ columnId: toColumnId });

    if (!fromColumn || !toColumn) return res.status(404).json({ message: 'column not found' });

    fromColumn.issues.splice(fromIndex, 1);
    toColumn.issues.splice(toIndex, 0, issueId);

    await fromColumn.save();
    await toColumn.save();

    return res.status(200).json({ message: 'successfully switched issues' });
  },

  deleteIssue: async (req, res) => {
    const { boardId, columnId, issueId } = req.params;

    const board = await boardRepository.findBoardById({ boardId });

    if (!board) return res.status(404).json({ message: 'board not found' });

    const column = await columnRepository.findColumnById({ columnId });

    if (!column) return res.status(404).json({ message: 'column not found' });

    column.issues.pull(issueId);
    await column.save();

    // board.totalIssueCount -= 1;
    // await board.save();

    await issueRepository.deleteIssue(issueId);
    return res.status(200).json({ message: 'successfully deleted issues' });
  },

  assignDeveloper: async (req, res) => {
    const { projectId, issueId } = req.params;
    const { userId } = req.body;

    const isMemberOfProject = await projectRepository.findMember({ projectId, userId });
    if (!isMemberOfProject) return res.status(404).json({ message: 'member not found in project' });

    const issue = await issueRepository.findIssueById({ issueId });
    if (!issue) return res.status(200).json({ message: 'issue not found' });

    const assigneeExist = await issueRepository.findAssignee({ issueId, userId });
    if (assigneeExist) return res.status(409).json({ message: 'assignee already exist' });

    issue.assignee.push(userId);
    await issue.save();

    return res.status(200).json({ message: 'successfully assigned developer' });
  },

};
