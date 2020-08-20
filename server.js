const express = require('express');
const app = express();
const WebSocket = require('ws');
const socketServer = new WebSocket.Server({ port: 8080, secure: false })
const PORT = 3000;

app.set('view engine', 'pug');
app.use(express.static('public'));

socketServer.on('connection', socket => {
  socket.on('message', message => {
    socket.send(message);
  });
});

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
});
