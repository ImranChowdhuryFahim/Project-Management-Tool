/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');

const { Schema } = mongoose;

/**
 * @swagger
 * components:
 *   schemas:
 *     Issue:
 *       type: object
 *       required:
 *         - title
 *         - key
 *         - order
 *         - workspaceKey
 *         - projectKey
 *       properties:
 *         workspaceKey:
 *          type: string
 *         projectKey:
 *          type: string
 *         _id:
 *           type: string
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         priority:
 *           type: number
 *         key:
 *           type: string
 *         assignee:
 *           type: array
 *         isDone:
 *           type: boolean
 *         dueDate:
 *           type: datetime
 *         createdAt:
 *           type: datetime
 *         updatedAt:
 *           type: datetime
 */

const AssigneeSchema = new Schema({
  _id: { type: mongoose.Types.ObjectId },
  displayName: { type: String },
  email: { type: String },
  avatarLink: { type: String },
});

const IssueSchema = new Schema({
  workspaceKey: { type: String, required: true },
  projectKey: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String },
  priority: { type: String, default: 'LOW' },
  key: { type: String, required: true },
  isDone: { type: Boolean, default: false },
  dueDate: { type: Date, required: true },
  assignee: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
}, { timestamps: true });

module.exports = mongoose.model('issue', IssueSchema);
