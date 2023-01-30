const {
  ColumnRepository, BoardRepository, IssueRepository,
} = require('../database');

const boardRepostiory = new BoardRepository();
const columnRepository = new ColumnRepository();
const issueRepostiory = new IssueRepository();

module.exports = {

  createColumn: async (req, res) => {
    const { boardId, title } = req.body;
    const board = await boardRepostiory.findBoardById({ boardId });
    if (!board) return res.status(404).json({ message: 'not found' });
    const column = await columnRepository.createColumn({
      boardId,
      title,
      order: board.columns.length + 1,
    });
    return res.status(200).json({ message: 'successfully created column', columnId: column._id });
  },

  switchIssue: async (req, res) => {
    const {
      issueId, order, fromColumnId, toColumnId,
    } = req.body;

    await issueRepostiory.changeOrder({ issueId, order });
    await columnRepository.switchIssue({ issueId, fromColumnId, toColumnId });

    return res.status(200).json({ message: 'switched issue successfully' });
  },

  updateColumn: async (req, res) => {
    const { columnId, title, order } = req.body;

    await columnRepository.updateColumn({ columnId, title, order });

    return res.status(200).json({ message: 'switched issue successfully' });
  },

  deleteColumn: async (req, res) => {
    const { columnId } = req.params;

    const column = await columnRepository.findColumnById({ columnId });
    if (!column) return res.status(404).json({ message: 'not found' });
    const board = await boardRepostiory.findBoardById({ boardId: column.boardId });
    if (!board) return res.status(404).json({ message: 'not found' });
    board.columns.pull({ column: columnId });
    await board.save();

    await issueRepostiory.deleteIssuesByColumnId({ columnId });

    await columnRepository.deleteColumn({ columnId });

    return res.status(200).json({ message: 'successfully deleted column' });
  },

};
