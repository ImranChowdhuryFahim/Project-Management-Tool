/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');

const { Schema } = mongoose;

/**
 * @swagger
 * components:
 *   schemas:
 *     Board:
 *       type: object
 *       required:
 *         - title
 *         - projectId
 *       properties:
 *         _id:
 *           type: string
 *         title:
 *           type: string
 *         projectId:
 *           type: string
 *         columns:
 *          type: object
 */

const IssueSchema = new Schema({
  _id: { type: mongoose.Types.ObjectId },
  title: { type: String },
  description: { type: String },
  order: { type: Number },
  key: { type: String },
  isDone: { type: Boolean },
  dueDate: { type: Date },
});

const ColumnSchema = new Schema({
  _id: { type: String },
  title: { type: String },
  order: { type: Number },
  issues: [{ issue: IssueSchema }],
});

const BoardSchema = new Schema({
  title: { type: String },
  projectId: { type: mongoose.Types.ObjectId },
  columns: [{ column: { type: mongoose.Types.ObjectId, ref: 'column' } }],
});
module.exports = mongoose.model('board', BoardSchema);
