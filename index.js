'use strict';

const express = require('express');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const { HTTP_PORT, JWT_SECRET } = require('./app.json');
const routes = require('./routes/web');
const { User } = require('./db');
const app = express();

const WebSocket = require('ws');
const socketServer = new WebSocket.Server({
  port: 8080,
  secure: false,
});

app.set('view engine', 'pug');
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use(routes);

socketServer.on('connection', socket => {
  socket.on('message', async function(json) {
    const data = JSON.parse(json);
    if (!data) return;

    try {
      const decoded = jwt.verify(data.jwt, JWT_SECRET);
      const user = await User.findOne({
        attributes: ['email'],
        where: { id: decoded.id },
      });
      if (!user) return;
      socketServer.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ user: user.email, msg: data.msg }));
        }
      });
    }

    catch (err) {
      console.log(err);
    }
  });
});

app.listen(HTTP_PORT);
