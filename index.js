'use strict';

const express = require('express');
const cookieParser = require('cookie-parser');
const { HTTP_PORT } = require('./app.json');
const routes = require('./routes/web');
const { requireAuth } = require('./middleware/authMiddleware');
const app = express();

app.set('view engine', 'pug');
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use(routes);

app.get('/', requireAuth, (req, res) => res.render('index'));
app.get('/grid', (req, res) => res.render('grid'));

app.listen(HTTP_PORT);
