const express = require('express');
const router = express.Router();
const officeController = require('../controllers/officeController');

router.get('/', officeController.index);
router.get('/:id/users', officeController.getUsers);

module.exports = router;