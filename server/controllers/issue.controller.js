/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
const { IssueRepository, ColumnRepository, BoardRepository } = require('../database');

const issueRepository = new IssueRepository();
const columnRepository = new ColumnRepository();
const boardRepository = new BoardRepository();

module.exports = {

  createIssue: async (req, res) => {
    const { projectKey, workspaceKey } = req.params;
    const {
      columnId, title, description, dueDate,
    } = req.body;

    const board = await boardRepository.findBoard({ projectKey, workspaceKey });
    if (!board) return res.status(404).json({ message: 'board not found' });

    const column = await columnRepository.findColumnById({ columnId });
    if (!column) return res.status(404).json({ message: 'column not found' });

    const issue = await issueRepository.createIssue({
      workspaceKey, projectKey, title, description, key: `${projectKey}-${board.totalIssueCount + 1}`, isDone: false, dueDate,
    });

    if (!issue) return res.status(500).json({ message: 'could not create' });

    board.totalIssueCount += 1;

    board.save();

    column.issues.push(issue._id);

    await column.save();

    return res.status(201).json({ message: 'successfully created issue', issueId: issue._id });
  },

  getIssueDetails: async (req, res) => {
    const { workspaceKey, projectKey, issueKey } = req.params;
    const issue = await issueRepository.getIssueDetails({ workspaceKey, projectKey, issueKey });

    if (!issue) return res.status(404).json({ message: 'not found' });
    return res.status(200).json({ issue });
  },

  updateIssue: async (req, res) => {
    const {
      issueId, title, description, isDone, dueDate,
    } = req.body;
    const issue = await issueRepository.updateIssue({
      issueId, title, description, isDone, dueDate,
    });
    return res.status(200).json({ message: 'successfully updated issue' });
  },

  moveIssue: async (req, res) => {
    const {
      columnId, issueId, fromIndex, toIndex,
    } = req.body;

    const column = await columnRepository.findColumnById({ columnId });

    if (!column) return res.status(404).json({ message: 'not found' });

    column.issues.splice(fromIndex, 1);
    column.issues.splice(toIndex, 0, issueId);

    await column.save();
    return res.status(200).json({ message: 'successfully moved the issue' });
  },

  switchIssue: async (req, res) => {
    const {
      fromColumnId, toColumnId, issueId, fromIndex, toIndex,
    } = req.body;

    const fromColumn = await columnRepository.findColumnById({ columnId: fromColumnId });
    const toColumn = await columnRepository.findColumnById({ columnId: toColumnId });

    if (!fromColumn || !toColumn) return res.status(404).json({ message: 'not found' });

    fromColumn.issues.splice(fromIndex, 1);
    toColumn.issues.splice(toIndex, 0, issueId);

    await fromColumn.save();
    await toColumn.save();

    return res.status(200).json({ message: 'successfully switched issues' });
  },

};
