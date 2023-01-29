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
      title, description, order: column.issues.length + 1, key: `${projectKey}-${board.totalIssueCount + 1}`, isDone: false, dueDate,
    });

    if (!issue) return res.status(500).json({ message: 'could not create' });

    board.totalIssueCount += 1;

    board.save();

    column.issues.push({ issue: issue._id });

    await column.save();

    return res.status(201).json({ message: 'successfully created issue', issueId: issue._id });
  },

};
