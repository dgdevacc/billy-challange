const router = require('express').Router();

// [V1] Defining the routes
const itemRouter = require('./item/item.router');
const purchaseRouter = require('./purchase/purchase.router');
const saleRouter = require('./sale/sale.router');
const reportRouter = require('./report/report.router');

// Set the routes
router.use('/items', itemRouter); // /api/items
router.use('/purchases', purchaseRouter); // /api/purchases
router.use('/sales', saleRouter); // /api/sales
router.use('/reports', reportRouter); // /api/reports

module.exports = router;
