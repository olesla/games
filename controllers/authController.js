'use strict';

const User = require('../db').User;

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

module.exports.getRegister = async (req, res) => {
  res.render('register');
};

module.exports.postRegister = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    res.status(201).json(user);
  }
  catch (err) {
    const errors = handleErrors(err);
    res.status(400).json(errors);
  }
};

module.exports.getLogin = (req, res) => {
  res.render('login');
};

module.exports.postLogin = async (req, res) => {
  res.send('login');
};
