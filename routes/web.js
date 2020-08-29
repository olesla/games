'use strict';

const { Router } = require('express');
const { requireAuth, checkUser } = require('../middleware/authMiddleware');
const authController = require('../controllers/authController');
const chatController = require('../controllers/chatController');
const router = Router();

// Execute checkUser for all requests
router.get('*', checkUser);

// Authentication routes
router.get('/register', authController.getRegister);
router.post('/register', authController.postRegister);
router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
router.get('/logout', authController.getLogout);

// Chat routes
router.get('/', requireAuth, chatController.getLobby);

module.exports = router;
