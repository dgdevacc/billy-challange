const router = require('express').Router({ mergeParams: true });

const itemController = global.getController('item');

// POST /api/items - Creat new item
router.post('/', (req, res, next) => {
  itemController.create(req.body)
    .then(result => res.json(result))
    .catch(next);
});

// GET /api/items/:itemId - Get an item
router.get('/:itemId', (req, res, next) => {
  itemController.findById(req.params.itemId)
    .then(result => res.json(result))
    .catch(next);
});

// GET /api/items - Get all items
router.get('/', (req, res, next) => {
  itemController.findAll()
    .then(result => res.json(result))
    .catch(next);
});

// DELETE /api/items/:itemId - Delete an item
router.delete('/:itemId', (req, res, next) => {
  itemController.delete(req.params.itemId)
    .then(result => res.json(result))
    .catch(next);
});

module.exports = router;
