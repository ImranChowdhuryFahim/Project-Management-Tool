const { NotificationRepository } = require('../database');

const notificationRepository = new NotificationRepository()

module.exports = {

  getNotifications: async (req, res) => {
    const { email } = req.params;

    const notification = await notificationRepository.findNotifications({ email });

    return res.status(200).json({ notification });
  },

};
