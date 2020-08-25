'use strict';

const getRegister = (req, res) => {
  res.render('register');
};

const postRegister = (req, res) => {
  res.send('new registration');
};

const getLogin = (req, res) => {
  res.render('login');
};

const postLogin = (req, res) => {
  res.send('new login');
};

module.exports = {
  getRegister,
  postRegister,
  getLogin,
  postLogin,
};
