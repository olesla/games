'use strict';

const { Model } = require('sequelize');
const bcrypt = require('bcrypt');

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
        allowNull: false,
        unique: {
          args: true,
          msg: 'Email already in use',
        },
        validate: {
          isEmail: {
            msg: 'Invalid email',
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        minLength: 8,
        validate: {
          len: {
            args: [8, 255],
            msg: 'Password must be between 8 and 255 characters',
          },
        },
      },
    }, {
      hooks: {
        beforeCreate: async user => {
          const salt = await bcrypt.genSalt();
          user.password = await bcrypt.hash(user.password, salt);
        },
      },
      sequelize,
    });
  }
}

module.exports = User;
