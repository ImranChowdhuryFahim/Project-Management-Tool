const { BoardRepository } = require('../database');

const boardRepository = new BoardRepository();

module.exports = {

  getBoardDetails: async (req, res) => {
    const { projectId } = req.params;

    const board = await boardRepository.getBoardDetails({ projectId });

    if (!board) return res.status(404).json({ message: 'not found' });

    return res.status(200).json({ board });
  },

};
