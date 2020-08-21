'use strict';

const { Model } = require('sequelize');

class Room extends Model {
  static init(sequelize, DataTypes) {
    return super.init({
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(16),
      },
      password: {
        type: DataTypes.STRING(16),
      },
    }, {sequelize});
  }
}

module.exports = Room;
