'use strict';

const express = require('express');
const WebSocket = require('ws');
const db = require('./db');
const app = express();
const socketServer = new WebSocket.Server({ port: 8080, secure: false });
// should move this to some form of env file
const PORT = 3000;

app.set('view engine', 'pug');
app.use(express.static('public'));
// makes req.body available in nodejs
app.use(express.urlencoded({extended: true}));

socketServer.on('connection', socket => {
  socket.on('message', message => {
    socket.send(message);
  });
});

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/login', async (req, res) => {});

app.get('/register', (req, res) => {
  res.render('register');
});

app.post('/register', async (req, res) => {
  const email    = req.body.email;
  const password = req.body.password;
  const username = req.body.username;

  console.log(email, password, username);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
});
