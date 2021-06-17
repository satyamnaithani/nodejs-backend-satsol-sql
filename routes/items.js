const express = require('express');
const router = express.Router();
const ItemsController = require('../controllers/items');

router.get('/', ItemsController.get_all_items);
router.post('/', ItemsController.create_item);

module.exports = router;