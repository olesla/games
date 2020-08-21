'use strict';

const { Model } = require('sequelize');

class User extends Model {
  static init(sequelize, DataTypes) {
    return super.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
      },
      username: {
        type: DataTypes.STRING(16),
      },
    }, {sequelize});
  }
}

module.exports = User;
