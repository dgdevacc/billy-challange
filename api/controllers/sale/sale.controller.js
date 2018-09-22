const _ = require('lodash');

const { Sale, SaleEntry, Inventory } = require('./../../lib/db').models;
const HttpError = require('./../../lib/utils/http-error');

const saleController = {};

/**
 * Create a new sale
 * @param {array} data
 */

saleController.create = async (data) => {
  const filteredData = _.pick(data, [
    'itemId',
    'quantity',
    'price',
  ]);

  const sale = await Sale.create(filteredData).catch((err) => {
    if (err.name === 'SequelizeValidationError') {
      throw new HttpError('Bad Request', 'Required fields are missing', 400);
    }

    throw new HttpError('Bad Request', 'Something went wrong', 400);
  });

  return saleController.processInventory(sale.id, filteredData.itemId, filteredData.quantity)
    .then(() => ({ done: true }));
};

/**
 * Get an sale
 * @param {number} saleId
 */

saleController.findById = saleId => Sale.findById(saleId).then((sale) => {
  if (!sale) throw new HttpError('Not Found', 'Sale not found', 404);
  return sale;
});

/**
 * Get all sales
 */

saleController.findAll = () => Sale.findAll();

/**
 * Delete an sale
 * @param {number} saleId
 */

saleController.delete = saleId => Sale.destroy({ where: { id: saleId } }).then((sale) => {
  if (!sale) throw new HttpError('Not Found', 'Sale not found', 404);
  return { done: true };
});

/**
 * Process inventory
 * @param {number} saleId
 */

saleController.processInventory = async (saleId, itemId, desiredQuantity) => {
  // Check if we have any stock for this item
  const totalStock = await Inventory.sum('quantity', { where: { itemId } });
  if (!totalStock) throw new HttpError('Not Found', 'There is no inventory for this item', 404);

  // Check if the desired quantity exceeds the current stock
  if (desiredQuantity > totalStock) {
    throw new HttpError('Not Found', 'We do not have enough stock', 404);
  }

  // Take the first stock list
  const inventory = await Inventory.findOne({ where: { itemId } });

  // If we got enough q
  if (desiredQuantity < inventory.quantity) {
    await inventory.update({ quantity: inventory.quantity - desiredQuantity });
    await SaleEntry.create({
      itemId,
      purchaseId: inventory.purchaseId,
      quantity: desiredQuantity,
      costPrice: inventory.costPrice,
      saleId,
    }).catch(err => err);
    return;
  }

  if (Number(desiredQuantity) === Number(inventory.quantity)) {
    await inventory.destroy();
    await SaleEntry.create({
      itemId,
      purchaseId: inventory.purchaseId,
      quantity: desiredQuantity,
      costPrice: inventory.costPrice,
      saleId,
    }).catch(err => err);
    return;
  }

  const newDesierQuantity = desiredQuantity - inventory.quantity;

  await inventory.destroy();
  await SaleEntry.create({
    itemId,
    purchaseId: inventory.purchaseId,
    quantity: inventory.quantity,
    costPrice: inventory.costPrice,
    saleId,
  }).catch(err => err);

  saleController.processInventory(saleId, itemId, newDesierQuantity);
};

module.exports = saleController;
