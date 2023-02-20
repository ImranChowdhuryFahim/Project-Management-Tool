const { string } = require('joi');
const mongoose = require('mongoose');

const { Schema } = mongoose;

/**
 * @swagger
 * components:
 *   schemas:
 *     Notification:
 *       type: object
 *       required:
 *         - notifyeeId
 *         - notificationBody
 *       properties:
 *         _id:
 *           type: string
 *         notifyeeId:
 *           type: string
 *         notificationBody:
 *           type: string
 *         createdAt:
 *           type: datetime
 *         updatedAt:
 *           type: datetime
 */

const NotificationSchema = new Schema({
  userId: { type: String, required: true },
  body: {type: String, required:true},
  createdAt : {type: Date, default: Date.now()}
}, { timestamps: true });

module.exports = mongoose.model('notification', NotificationSchema);
