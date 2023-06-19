export const socketController = (socket) => {
  console.log('Client connected', socket.id);

  socket.on('disconnect', () => {
    console.log('Client disconnected', socket.id);
  });

  socket.on('send-message-client', (payload, callback) => {
    // console.log(payload);
    callback({ message: 'Message received' });
    socket.broadcast.emit('send-message-server', payload);
  });
};
