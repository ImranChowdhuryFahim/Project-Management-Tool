/* eslint-disable class-methods-use-this */
// eslint-disable-next-line no-unused-vars
const mongoose = require('mongoose');
const BoardModel = require('../models/board.model');
const IssueModel = require('../models/issue.model');

class IssueRepository {
  async createIssue({
    projectId, boardId, title, description, order, key, isDone, dueDate,
  }) {
    const issue = new IssueModel({
      projectId,
      boardId,
      title,
      description,
      order,
      key,
      isDone,
      dueDate,
    });
    return issue.save();
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

module.exports = IssueRepository;
