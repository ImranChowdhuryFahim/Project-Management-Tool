/* eslint-disable class-methods-use-this */
// eslint-disable-next-line no-unused-vars
const mongoose = require('mongoose');
const ColumnModel = require('../models/column.model');

class ColumnRepository {
  async createColumn({
    title,
  }) {
    const board = new ColumnModel({
      title,
    });
    return board.save();
  }

  async findColumnById({ columnId }) {
    return ColumnModel.findOne({ _id: columnId });
  }

  async switchIssue({ issueId, fromColumnId, toColumnId }) {
    await ColumnModel.updateOne({ _id: fromColumnId }, { $pull: { issues: issueId } });
    return ColumnModel.updateOne({ _id: toColumnId }, { $push: { issues: issueId } });
  }

  async updateColumnDescription({ columnId, title }) {
    return ColumnModel.updateOne({ _id: columnId }, { title });
  }

  async deleteColumn({ columnId }) {
    return ColumnModel.deleteOne({ _id: columnId });
  }
}

module.exports = ColumnRepository;
