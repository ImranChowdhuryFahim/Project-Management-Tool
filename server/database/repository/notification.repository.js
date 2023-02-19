/* eslint-disable class-methods-use-this */
// eslint-disable-next-line no-unused-vars
const mongoose = require('mongoose');
const NotificationModel = require('../models/notification.model');

class ProjectRepository {
  async findNotifications({ email }) {
    return NotificationModel.find({ email });
  }

  async createNotification({
    email,body
  }) {
    const notification = new NotificationModel({
      email,body
    });
    return notification.save();
  }

  
}

module.exports = ProjectRepository;
