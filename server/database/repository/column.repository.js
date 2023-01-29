/* eslint-disable class-methods-use-this */
// eslint-disable-next-line no-unused-vars
const mongoose = require('mongoose');
const ColumnModel = require('../models/column.model');

class ColumnRepository {
  async createColumn({
    title, order,
  }) {
    const board = new ColumnModel({
      title,
      order,
    });
    return board.save();
  }
}

module.exports = ColumnRepository;
