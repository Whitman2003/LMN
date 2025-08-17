const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

//Post for User
router.post('/', usersController.createUser);
router.post('/signin', usersController.signIn);

module.exports = router;