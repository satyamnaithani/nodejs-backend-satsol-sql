const express = require('express');
const router = express.Router();
const PurchaseController = require('../controllers/purchase');

router.get('/', PurchaseController.get_all_purchases);
router.post('/', PurchaseController.create_purchase);

module.exports = router;