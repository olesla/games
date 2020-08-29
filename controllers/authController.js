'use strict';

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../db').User;
const { JWT_SECRET } = require('../app.json');
const THREE_DAYS_S = 3 * 24 * 60 * 60;
const THREE_DAYS_MS = THREE_DAYS_S * 1000;
const INVALID_LOGIN = { errors: { generic: ['Invalid login'] } };

/**
 * Handler for errors
 * @param {Error} err
 * @return {Object}
 */
const handleErrors = err => {
  const errors = {
    generic: [],
    email: [],
    password: [],
  };

  if (err.name === 'SequelizeUniqueConstraintError') {
    errors.email.push('That email is already in use');
  }

  if (err.name === 'SequelizeValidationError') {
    for (let i = 0; i < err.errors.length; i++) {
      errors[err.errors[i].path].push(err.errors[i].message);
    }
  }

  // Return a generic error message if we didn't catch any errors at this point
  if (errors.email.length === 0 && errors.password.length === 0) {
    errors.generic.push('Something went wrong');
  }

  return errors;
};

const createToken = id => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: THREE_DAYS_S,
  });
};

module.exports.getRegister = async (req, res) => {
  res.render('auth/register');
};

module.exports.postRegister = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    const token = createToken(user.id);
    res.cookie('jwt', token, {
      maxAge: THREE_DAYS_MS,
    });
    res.status(201).json({ user: user.id });
  }
  catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

module.exports.getLogin = (req, res) => {
  res.render('auth/login');
};

// TODO: Add timingsafe
module.exports.postLogin = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });
  if (!user) return res.send(INVALID_LOGIN);

  const auth = await bcrypt.compare(password, user.password);
  if (!auth) return res.send(INVALID_LOGIN);

  const token = createToken(user.id);
  res.cookie('jwt', token, {
    maxAge: THREE_DAYS_MS,
  });
  res.status(200).json({ user: user.id });
};

module.exports.getLogout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.redirect('/');
};
