'use strict';

const Sequelize = require('sequelize');
const User = require('./models/User');

const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'sqlite',
  logging: false,
  // SQLite only
  storage: 'database.sqlite',
});

const models = {
  User: User.init(sequelize, Sequelize),
};

module.exports = {
  ...models,
  sequelize,
};
