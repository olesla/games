'use strict';

const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../app.json');
const { User } = require('../db');

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check jwt exists and is verified
  try {
    jwt.verify(token, JWT_SECRET);
  }

  catch (err) {
    return res.redirect('/login');
  }
  next();
};

// check current user
const checkUser = async (req, res, next) => {
  const token = req.cookies.jwt;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findOne({ where: { id: decoded.id } });
    res.locals.user = user;
    next();
  }

  catch (err) {
    res.locals.user = null;
    next();
  }
};

module.exports = { requireAuth, checkUser };
