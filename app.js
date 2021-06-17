const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();
const itemRoutes = require('./routes/items');
const setupRoutes = require('./routes/setup');
const vendorRoutes = require('./routes/vendors');
const customerRoutes = require('./routes/customers');
const purchaseRoute = require('./routes/purchase');
const stockRoutes = require('./routes/stock');
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/items', itemRoutes);
app.use('/vendors', vendorRoutes);
app.use('/customers', customerRoutes);
app.use('/purchase', purchaseRoute);
app.use('/stock', stockRoutes);
app.use('/setup', setupRoutes);
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      author: "Satyam Naithani",
      descrption: "Invalid Route",
      message: error.message,
    },
  });
});
module.exports = app;