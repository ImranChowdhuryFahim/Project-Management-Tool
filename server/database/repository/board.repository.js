/* eslint-disable class-methods-use-this */
// eslint-disable-next-line no-unused-vars
const mongoose = require('mongoose');
const BoardModel = require('../models/board.model');
const IssueModel = require('../models/issue.model');

class BoardRepository {
  async createBoard({
    projectId, title,
  }) {
    const board = new BoardModel({
      projectId,
      title,
    });
    return board.save();
  }

  async getBoardDetails({ projectId }) {
    const board = await BoardModel.findOne({ projectId }).select(['-columns._id']).populate({
      path: 'columns.column',
      select: ['-__v'],
      populate: {
        path: 'issues.issue',
        model: IssueModel,
      },
    });
    return board;
  }
}

module.exports = BoardRepository;
