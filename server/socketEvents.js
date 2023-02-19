/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
/* eslint-disable no-multi-assign */
/* eslint-disable func-names */
/* eslint-disable no-console */
// const ChannelMessageSchema = require('./models/channelMessage');
// const DirectMessageSchema = require('./models/directMessages');
// const GroupMessageSchema = require('./models/groupMessage');
// const UnreadBadgeCountSchema = require('./models/unreadBadgeCount');

exports = module.exports = function (io) {
  io.on('connection', (socket) => {
    console.log('joined ...');

    socket.on('joinRoom', (data) => {
      socket.join(data.rooms);

      console.log(data.rooms)
      socket.emit('notification', { room: 'bot', notification: 'Welcome dadu' });
      // socket.broadcast.to(data.roomName).emit('message', { userName: 'bot', message: `New User ${data.userName} has Joined` });
    });


    socket.on('notification', async({room, notification})=>{
        console.log(room,notification);
    })

    socket.on('comment', async({room, comment})=>{
        console.log(room,notification);
    })

    socket.on('groupMessage', async({room, message})=>{
        console.log(room,message);
    })

    // socket.on('message', async ({ room, message }) => {
    //   console.log(message);
    //   const channelMessage = new ChannelMessageSchema(message);
    //   channelMessage.save().then((result) => {
    //     io.to(room).emit('message', { room, body: result });
    //     UnreadBadgeCountSchema.updateMany({
    //       workspaceId: message.workspaceId,
    //       [`unreadMessageCount.${message.channelId}`]: { $exists: true },
    //       userId: { $ne: message.sender },
    //     }, {
    //       $inc: {
    //         [`unreadMessageCount.${message.channelId}`]: 1,
    //       },
    //     }).then(() => {}).catch((err) => { console.log(err); });
    //   }).catch((err) => {
    //     console.log(err);
    //   });
    // });

    // socket.on('groupMessage', ({ room, message }) => {
    //   console.log(message);
    //   const groupMessage = new GroupMessageSchema(message);
    //   groupMessage.save().then((result) => {
    //     io.to(room).emit('groupMessage', { room, body: result });
    //     UnreadBadgeCountSchema.updateMany({
    //       workspaceId: message.workspaceId,
    //       [`unreadMessageCount.${message.groupId}`]: { $exists: true },
    //       userId: { $ne: message.sender },
    //     }, {
    //       $inc: {
    //         [`unreadMessageCount.${message.groupId}`]: 1,
    //         directOrGroupMessageCount: 1,
    //       },
    //     }).then(() => {}).catch((err) => { console.log(err); });
    //   }).catch((err) => {
    //     console.log(err);
    //   });
    // });

    // socket.on('directMessage', ({ room, message }) => {
    //   const directMessage = new DirectMessageSchema(message);
    //   directMessage.save().then((result) => {
    //     io.to(room[0]).to(room[1]).emit('directMessage', { room, body: result });

    //     if (room[0] !== room[1]) {
    //       UnreadBadgeCountSchema.updateOne({
    //         workspaceId: message.workspaceId,
    //         userId: room[0],
    //       }, {
    //         $inc: {
    //           [`unreadMessageCount.${message.sender}`]: 1,
    //           directOrGroupMessageCount: 1,
    //         },
    //       }).then(() => {}).catch((err) => { console.log(err); });
    //     }
    //   }).catch((err) => {
    //     console.log(err);
    //   });
    // });

    // socket.on('create_channel', ({ channelData, creator, room }) => {
    //   io.to(room).emit('create_channel', { channelData, creator });
    // });

    // socket.on('create_group', ({ groupData, room }) => {
    //   io.to(room).emit('create_group', { groupData });
    // });

    // socket.on('join_channel', ({ channelId, userId, room }) => {
    //   io.to(room).emit('join_channel', { channelId, userId });
    // });

    // socket.on('joinWorkspace', ({ workspaceId }) => {
    //   io.to(workspaceId).emit('joinWorkspace', { workspaceId });
    // });

    // socket.on('addTaskList', ({ room, tasklist }) => {
    //   io.to(room).emit('addTaskList', { tasklist });
    // });

    // socket.on('updateTaskList', ({ room, tasklist }) => {
    //   io.to(room).emit('updateTaskList', { tasklist });
    // });

    // socket.on('deleteTaskList', ({ room, tasklist }) => {
    //   io.to(room).emit('deleteTaskList', { tasklist });
    // });

    // socket.on('addTask', ({ room, task }) => {
    //   io.to(room).emit('addTask', { task });
    // });

    // socket.on('deleteTask', ({ room, task }) => {
    //   io.to(room).emit('deleteTask', { task });
    // });

    // socket.on('updateTask', ({ room, task }) => {
    //   io.to(room).emit('updateTask', { task });
    // });

    // socket.on('edit_access', ({ memberMap, room }) => {
    //   io.to(room).emit('edit_access', { memberMap });
    // });

    socket.on('disconnect', () => {
      console.log('disconnected');
    });
  });
};
