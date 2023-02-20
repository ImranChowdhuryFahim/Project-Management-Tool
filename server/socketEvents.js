/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
/* eslint-disable no-multi-assign */
/* eslint-disable func-names */
/* eslint-disable no-console */
// const ChannelMessageSchema = require('./models/channelMessage');
// const DirectMessageSchema = require('./models/directMessages');
// const GroupMessageSchema = require('./models/groupMessage');

const { NotificationRepository } = require("./database");

// const UnreadBadgeCountSchema = require('./models/unreadBadgeCount');
const notificationRepository = new NotificationRepository(); 

exports = module.exports = function (io) {
  io.on('connection', (socket) => {
    console.log('joined ...');

    socket.on('joinRoom', (data) => {
      socket.join(data.rooms[0]);

      console.log(data.rooms)
      socket.emit('notification', { room: 'bot', notification: 'Welcome dadu' });
      // socket.broadcast.to(data.roomName).emit('message', { userName: 'bot', message: `New User ${data.userName} has Joined` });
    });


    socket.on('notification', async(notificationPayload)=>{
        console.log(notificationPayload);
        const {body,userId} = notificationPayload;
        socket.emit('notification',{userId,body})
        delete notificationPayload.email;
        delete notificationPayload.type;
        notificationRepository.createNotification({userId,body})
        
        
    })

    // socket.on('comment', async({room, comment})=>{
    //     console.log(room,notification);
    // })

    // socket.on('groupMessage', async({room, message})=>{
    //     console.log(room,message);
    // })

    socket.on('disconnect', () => {
      console.log('disconnected');
    });
  });
};
