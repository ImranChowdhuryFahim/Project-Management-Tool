const mongoose = require('mongoose');

const { Schema } = mongoose;

/**
 * @swagger
 * components:
 *   schemas:
 *     Activity:
 *       type: object
 *       required:
 *         - workspaceId
 *         - actorId
 *         - activityBody
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated mongodb id of the activity
 *         workspaceId:
 *           type: string
 *           description: The id of the workspace
 *         actorId:
 *           type: string
 *           description: The id of the user who performed the activity
 *         activityBody:
 *           type: string
 *           description: The description of the activity
 *         timestamp:
 *           type: datetime
 *           description: The time of the activity taking place
 */

const ActivitySchema = new Schema({
  workspaceId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'workspace',
  },
  actorId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  activityBody: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('activity', ActivitySchema);
