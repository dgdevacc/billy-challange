const router = require('express').Router({ mergeParams: true });

const saleController = global.getController('sale');

// POST /api/sales - Creat new sale
router.post('/', (req, res, next) => {
  saleController.create(req.body)
    .then(result => res.json(result))
    .catch(next);
});

// GET /api/sales/:saleId - Get an sale
router.get('/:saleId', (req, res, next) => {
  saleController.findById(req.params.saleId)
    .then(result => res.json(result))
    .catch(next);
});

// GET /api/sales - Get all sales
router.get('/', (req, res, next) => {
  saleController.findAll()
    .then(result => res.json(result))
    .catch(next);
});

// DELETE /api/sales/:saleId - Delete an sale
router.delete('/:saleId', (req, res, next) => {
  saleController.delete(req.params.saleId)
    .then(result => res.json(result))
    .catch(next);
});

module.exports = router;
