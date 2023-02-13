const {
  ColumnRepository, BoardRepository, IssueRepository,
} = require('../database');

const boardRepostiory = new BoardRepository();
const columnRepository = new ColumnRepository();
const issueRepostiory = new IssueRepository();

module.exports = {

  createColumn: async (req, res) => {
    const { boardId } = req.params;
    const { title } = req.body;
    const board = await boardRepostiory.findBoardById({ boardId });
    if (!board) return res.status(404).json({ message: 'not found' });
    const column = await columnRepository.createColumn({
      title,
    });
    board.columns.push(column);
    await board.save();
    return res.status(200).json({ message: 'successfully created column', columnId: column._id });
  },

  updateColumn: async (req, res) => {
    const { columnId } = req.params;
    const { title } = req.body;

    await columnRepository.updateColumnTitle({ columnId, title });

    return res.status(200).json({ message: 'updated column successfully' });
  },

  deleteColumn: async (req, res) => {
    const { boardId, columnId } = req.params;

    const column = await columnRepository.findColumnById({ columnId });
    if (!column) return res.status(404).json({ message: 'not found' });
    const board = await boardRepostiory.findBoardById({ boardId });
    if (!board) return res.status(404).json({ message: 'not found' });
    board.columns.pull(columnId);
    // board.totalIssueCount -= column.issues.length;
    // await board.save();

    const issueIds = column.issues;
    await issueRepostiory.deleteIssues({ issueIds });

    await columnRepository.deleteColumn({ columnId });

    return res.status(200).json({ message: 'successfully deleted column' });
  },

  moveColumn: async (req, res) => {
    const { boardId, columnId } = req.params;
    const {
      fromIndex, toIndex,
    } = req.body;

    const board = await boardRepostiory.findBoardById({ boardId });

    if (!board) return res.status(404).json({ message: 'not found' });

    board.columns.splice(fromIndex, 1);
    board.columns.splice(toIndex, 0, columnId);

    await board.save();
    return res.status(200).json({ message: 'successfully moved the column' });
  },

};
