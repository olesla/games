'use strict';

const express = require('express');
const config = require('./config.json');
const routes = require('./routes/web');
const app = express();

app.use(express.json());
app.use(express.static('public'));

app.set('view engine', 'pug');

app.use(routes);
app.get('/', (req, res) => res.render('index'));

app.listen(config.HTTP_PORT);
