const mongoose = require('mongoose');

const { Schema } = mongoose;

/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       required:
 *         - issueId
 *         - commentBody
 *         - sender
 *       properties:
 *         _id:
 *           type: string
 *         issueId:
 *           type: string
 *         commentBody:
 *           type: string
 *         sender:
 *           type: string
 *         isEdited:
 *           type: boolean
 *         createdAt:
 *           type: datetime
 *         updatedAt:
 *           type: datetime
 */

const CommentSchema = new Schema({
  issueId: { type: mongoose.Types.ObjectId, required: true, ref: 'issue' },
  commentBody: { type: String, required: true },
  senderId: { type: mongoose.Types.ObjectId, required: true, ref: 'user' },
  isEdited: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('comment', CommentSchema);
