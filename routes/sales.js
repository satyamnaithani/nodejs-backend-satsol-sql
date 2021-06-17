const express = require('express');
const router = express.Router();
const SalesController = require('../controllers/sales');

router.get('/', SalesController.get_all_sales);
router.post('/', SalesController.create_sale);

module.exports = router;