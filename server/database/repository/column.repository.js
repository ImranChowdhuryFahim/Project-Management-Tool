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

  async updateColumnTitle({ columnId, title }) {
    return ColumnModel.updateOne({ _id: columnId }, { title });
  }

  async deleteColumn({ columnId }) {
    return ColumnModel.deleteOne({ _id: columnId });
  }
}

module.exports = ColumnRepository;
