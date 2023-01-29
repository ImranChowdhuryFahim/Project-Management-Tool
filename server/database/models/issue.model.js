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
 *         - projectId
 *       properties:
 *         projectId:
 *          type: string
 *         _id:
 *           type: string
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         order:
 *           type: number
 *         key:
 *           type: string
 *         assignee:
 *           type: array
 *           items:
 *              type: object
 *              properties:
 *                _id:
 *                  type: string
 *                displayName:
 *                  type: string
 *                email:
 *                  type: string
 *                avatarLink:
 *                  type: string
 *         isDone:
 *           type: boolean
 *         dueDate:
 *           type: datetime
 */

const AssigneeSchema = new Schema({
  _id: { type: mongoose.Types.ObjectId },
  displayName: { type: String },
  email: { type: String },
  avatarLink: { type: String },
});

const IssueSchema = new Schema({
  projectId: {
    type: String,
    required: true,
  },
  boadId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: Number,
  },
  order: {
    type: Number,
    required: true,
  },
  key: {
    type: String,
    required: true,
  },
  isDone: {
    type: Boolean,
    default: false,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  assignee: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
});

module.exports = mongoose.model('issue', IssueSchema);
