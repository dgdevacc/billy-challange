const router = require('express').Router({ mergeParams: true });

const purchaseController = global.getController('purchase');

// POST /api/purchases - Creat new purchase
router.post('/', (req, res, next) => {
  purchaseController.create(req.body)
    .then(result => res.json(result))
    .catch(next);
});

// GET /api/purchases/:purchaseId - Get an purchase
router.get('/:purchaseId', (req, res, next) => {
  purchaseController.findById(req.params.purchaseId)
    .then(result => res.json(result))
    .catch(next);
});

// GET /api/purchases - Get all purchases
router.get('/', (req, res, next) => {
  purchaseController.findAll()
    .then(result => res.json(result))
    .catch(next);
});

// DELETE /api/purchases/:purchaseId - Delete an purchase
router.delete('/:purchaseId', (req, res, next) => {
  purchaseController.delete(req.params.purchaseId)
    .then(result => res.json(result))
    .catch(next);
});

module.exports = router;
