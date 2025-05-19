const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/:id/schedules', userController.getSchedules);

module.exports = router;
