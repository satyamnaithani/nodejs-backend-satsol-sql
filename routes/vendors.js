const express = require('express');
const router = express.Router();
const VendorsController = require('../controllers/vendors');

router.get('/', VendorsController.get_all_vendors);
router.post('/', VendorsController.create_vendor);

module.exports = router;