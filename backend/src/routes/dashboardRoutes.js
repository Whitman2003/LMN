const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

//Post for User
router.get('/', dashboardController.dashboardCheck);

module.exports = router;