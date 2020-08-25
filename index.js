'use strict';

const express = require('express');
const cookieParser = require('cookie-parser');
const { HTTP_PORT } = require('./config.json');
const routes = require('./routes/web');
const app = express();

app.set('view engine', 'pug');
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use(routes);

app.get('/', (req, res) => res.render('index'));

app.listen(HTTP_PORT);
