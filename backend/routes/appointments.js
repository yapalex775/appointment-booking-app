const express = require('express');
const router = express.Router();

const auth = require('../middleware/authMiddleware');
const checkOwnership = require('../middleware/checkOwnership');
const appointmentController = require('../controllers/appointmentController');
const { validateUpdateAppointment } = require('../validators/appointmentSchema');
const { Appointment } = require('../models');

router.get('/', auth, appointmentController.index);
router.post('/', auth, appointmentController.make);
router.patch('/:id', auth, validateUpdateAppointment, checkOwnership(Appointment), appointmentController.update);

module.exports = router;
