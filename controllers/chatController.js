'use strict';

const User = require('../db').User;

module.exports.getLobby = async (req, res) => {
  const users = await User.findAll();
  res.render('index', { users });
};
