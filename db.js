'use strict';

const Sequelize = require('sequelize');
const User = require('./models/User');
const {
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
  DB_DIALECT,
} = require('./app.json');

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DIALECT,
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
