const { createPool } = require('mysql');
const { DB_CONFIG } = require('../global');
exports.connection = createPool(DB_CONFIG);