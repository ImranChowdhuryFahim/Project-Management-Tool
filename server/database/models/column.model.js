/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');

const { Schema } = mongoose;

/**
 * @swagger
 * components:
 *   schemas:
 *     Column:
 *       type: object
 *       required:
 *         - title
 *         - order
 *       properties:
 *         _id:
 *           type: string
 *         title:
 *           type: string
 *         order:
 *           type: number
 *         issues:
 *           type: array
 *           items:
 *              type: object
 *              properties:
 *                _id:
 *                  type: string
 *                title:
 *                  type: string
 *                description:
 *                  type: string
 *                order:
 *                  type: number
 *                key:
 *                  type: string
 *                isDone:
 *                  type: boolean
 *                dueDate:
 *                  type: datetime
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
  title: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    required: true,
  },
  issues: [{ issue: { type: mongoose.Types.ObjectId, ref: 'issue' } }],
});

module.exports = mongoose.model('column', ColumnSchema);
