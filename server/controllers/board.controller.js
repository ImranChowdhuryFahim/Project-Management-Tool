const { BoardRepository } = require('../database');

const boardRepository = new BoardRepository();

module.exports = {

  getBoardDetails: async (req, res) => {
    const { projectKey, workspaceKey } = req.params;

    const board = await boardRepository.getBoardDetails({ projectKey, workspaceKey });

    if (!board) return res.status(404).json({ message: 'not found' });

    return res.status(200).json({ board });
  },

};
