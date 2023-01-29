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
 *         workspaceId:
 *           type: string
 *         actorId:
 *           type: string
 *         activityBody:
 *           type: string
 *         createdAt:
 *           type: datetime
 *         updatedAt:
 *           type: datetime
 */

const ActivitySchema = new Schema({
  workspaceId: { type: mongoose.Types.ObjectId, required: true, ref: 'workspace' },
  actorId: { type: mongoose.Types.ObjectId, required: true, ref: 'user' },
  activityBody: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('activity', ActivitySchema);
