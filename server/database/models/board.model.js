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
 *         - workspaceKey
 *         - projectKey
 *       properties:
 *         _id:
 *           type: string
 *         title:
 *           type: string
 *         workspaceKey:
 *           type: string
 *         projectKey:
 *           type: string
 *         columns:
 *          type: array
 *         colorCode:
 *          type: string
 *         nextIssueId:
 *          type: number
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
  projectKey: { type: String, required: true },
  workspaceKey: { type: String, required: true },
  columns: [{ type: mongoose.Types.ObjectId, ref: 'column' }],
  colorCode: { type: String, default: '#FFFFFF' },
  nextIssueId: { type: Number, default: 1 },
});
module.exports = mongoose.model('board', BoardSchema);
