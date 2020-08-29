const WebSocket = require('ws');
const socketServer = new WebSocket.Server({ port: 8080, secure: false });

socketServer.on('connection', socket => {
  console.log('new connection');
  socket.on('message', message => {
    console.log(message);
  });
});
