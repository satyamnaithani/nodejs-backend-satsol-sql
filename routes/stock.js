const express = require('express');
const router = express.Router();
const StockController = require('../controllers/stock');

router.get('/', StockController.get_all_stock);

module.exports = router;