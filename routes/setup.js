const express = require('express');
const router = express.Router();
const SetupController = require('../controllers/setup');

router.get('/', SetupController.generate_tables);

module.exports = router;