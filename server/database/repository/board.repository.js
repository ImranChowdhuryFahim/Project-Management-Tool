/* eslint-disable class-methods-use-this */
const BoardModel = require('../models/board.model');
const IssueModel = require('../models/issue.model');
const UserModel = require('../models/user.model');

class BoardRepository {
  async createBoard({
    projectKey, workspaceKey, title,
  }) {
    const board = new BoardModel({
      projectKey,
      workspaceKey,
      title,
    });
    return board.save();
  }

  async getBoardDetails({ projectKey, workspaceKey }) {
    const board = await BoardModel.findOne({ projectKey, workspaceKey }).populate({
      path: 'columns',
      select: ['-__v', '-issues._id'],
      populate: {
        path: 'issues',
        model: IssueModel,
        select: ['-__v'],
        populate: {
          path: 'assignee',
          model: UserModel,
          select: ['-password']
        }
      },
    });
    return board;
  }

  async findBoardById({ boardId }) {
    const board = await BoardModel.findOne({ _id: boardId });
    return board;
  }

  async findBoard({ projectKey, workspaceKey }) {
    const board = await BoardModel.findOne({ projectKey, workspaceKey });
    return board;
  }

  async changeBoardColor({ workspaceKey, projectKey, colorCode }) {
    const board = await BoardModel.updateOne(
      { workspaceKey, projectKey },
      { $set: { colorCode } },
    );
    return board;
  }

  async changeBoardIssueCount({ workspaceKey, projectKey, nextIssueId }) {
    const board = await BoardModel.updateOne(
      { workspaceKey, projectKey },
      { $set: { nextIssueId } },
    );
    return board;
  }
}

module.exports = BoardRepository;
