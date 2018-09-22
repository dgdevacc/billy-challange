const router = require('express').Router({ mergeParams: true });

const reportController = global.getController('report');

// POST /api/reports/getItemStockQuantity - Get stock quantity for an item
router.post('/getItemStockQuantity', (req, res, next) => {
  reportController.getItemStockQuantity(req.body)
    .then(result => res.json(result))
    .catch(next);
});

// POST /api/reports/getItemStockValue - Get stock value
router.post('/getItemStockValue', (req, res, next) => {
  reportController.getItemStockValue(req.body)
    .then(result => res.json(result))
    .catch(next);
});

// GET /api/reports/getSaleCost/:saleId - Get cost value for one sale
router.get('/getSaleCost/:saleId', (req, res, next) => {
  reportController.getSaleCost(req.params.saleId)
    .then(result => res.json(result))
    .catch(next);
});

// POST /api/reports/getItemSalesCost - Get sales cost for an item
router.post('/getItemSalesCost', (req, res, next) => {
  reportController.getItemSalesCost(req.body)
    .then(result => res.json(result))
    .catch(next);
});

module.exports = router;
