const express = require('express');
const router = express.Router();
const CustomersController = require('../controllers/customers');

router.get('/', CustomersController.get_all_customers);
router.post('/', CustomersController.create_customer);

module.exports = router;