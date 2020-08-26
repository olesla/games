'use strict';

const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../app.json');

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check jwt exists and is verified
  try {
    jwt.verify(token, JWT_SECRET);
  }
  catch (err) {
    console.log(err);
    return res.redirect('/login');
  }
  next();
};

module.exports = { requireAuth };
