const _ = require('lodash');

const { Purchase, Inventory } = require('./../../lib/db').models;
const HttpError = require('./../../lib/utils/http-error');

const purchaseController = {};

/**
 * Create a new purchase
 * @param {array} data
 */

purchaseController.create = async (data) => {
  const filteredData = _.pick(data, [
    'itemId',
    'quantity',
    'price',
  ]);

  const purchase = await Purchase.create(filteredData).catch((err) => {
    if (err.name === 'SequelizeValidationError') {
      throw new HttpError('Bad Request', 'Required fields are missing', 400);
    }

    throw new HttpError('Bad Request', 'Something went wrong', 400);
  });

  await Inventory.create({
    itemId: purchase.itemId,
    purchaseId: purchase.id,
    costPrice: purchase.price,
    quantity: purchase.quantity,
  });

  return { done: true };
};

/**
 * Get an purchase
 * @param {number} purchaseId
 */

purchaseController.findById = purchaseId => Purchase.findById(purchaseId).then((purchase) => {
  if (!purchase) throw new HttpError('Not Found', 'Purchase not found', 404);
  return purchase;
});

/**
 * Get all purchases
 */

purchaseController.findAll = () => Purchase.findAll();

/**
 * Delete an purchase
 * @param {number} purchaseId
 */

purchaseController.delete = purchaseId => Purchase.destroy({ where: { id: purchaseId } })
  .then((purchase) => {
    if (!purchase) throw new HttpError('Not Found', 'Purchase not found', 404);
    return { done: true };
  });

module.exports = purchaseController;
