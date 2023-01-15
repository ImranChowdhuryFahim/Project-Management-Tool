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
 *           description: The auto-generated mongodb id of the comment
 *         issueId:
 *           type: string
 *           description: The id of the issue
 *         commentBody:
 *           type: string
 *           description: The text of the comment
 *         sender:
 *           type: string
 *           description: The id of the user who added the comment
 *         isEdited:
 *           type: boolean
 *           description: The flag to check if the comment is edited of not
 *         timestamp:
 *           type: datetime
 *           description: The time of the comment posted or edited
 */

const CommentSchema = new Schema({
  issueId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'issue',
  },
  commentBody: {
    type: String,
    required: true,
  },
  senderId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  isEdited: {
    type: Boolean,
    default: false,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('comment', CommentSchema);
