const {
  SaleEntry, Purchase,
} = require('./../../lib/db').models;

const itemController = global.getController('item');
const saleController = global.getController('sale');

const reportController = {};

/**
 * Get stock quantity for an item
 * @param {*} data contains itemId, startingFrom, upTo
 */

reportController.getItemStockQuantity = async (data) => {
  await itemController.findById(data.itemId); // check if item exits

  // Query options
  const whereObj = { itemId: data.itemId };
  const createdAtObj = {};

  if (data.startingFrom) createdAtObj.gt = new Date(data.startingFrom);
  if (data.upTo) createdAtObj.lt = new Date(data.upTo);

  if (Object.keys(createdAtObj).length > 0) whereObj.createdAt = createdAtObj;

  const purchasesAfter = await Purchase.sum('quantity', { where: whereObj }) || 0;
  const salesAfter = await SaleEntry.sum('quantity', { where: whereObj }) || 0;

  return purchasesAfter - salesAfter;
};

/**
 * Get stock value for an item
 * @param {*} data contains itemId, startingFrom, upTo
 */
reportController.getItemStockValue = async (data) => {
  await itemController.findById(data.itemId); // check if item exits

  // Query options
  const whereObj = { itemId: data.itemId };
  const createdAtObj = {};

  if (data.startingFrom) createdAtObj.gt = new Date(data.startingFrom);
  if (data.upTo) createdAtObj.lt = new Date(data.upTo);

  if (Object.keys(createdAtObj).length > 0) whereObj.createdAt = createdAtObj;

  const purchasesAfter = await Purchase.sum('totalCostPrice', { where: whereObj }) || 0;
  const salesAfter = await SaleEntry.sum('totalCostPrice', { where: whereObj }) || 0;

  return purchasesAfter - salesAfter;
};

/**
 * Get cost value for one sale
 * @param {Number} saleId
 */
reportController.getSaleCost = async (saleId) => {
  await saleController.findById(saleId); // check if sale exits

  return SaleEntry.sum('totalCostPrice', { where: { saleId } }) || 0;
};

/**
 * Get sales cost for an item
 * @param {*} data contains itemId, startingFrom, upTo
 */
reportController.getItemSalesCost = async (data) => {
  await itemController.findById(data.itemId); // check if item exits

  // Query options
  const whereObj = { itemId: data.itemId };
  const createdAtObj = {};

  if (data.startingFrom) createdAtObj.gt = new Date(data.startingFrom);
  if (data.upTo) createdAtObj.lt = new Date(data.upTo);

  if (Object.keys(createdAtObj).length > 0) whereObj.createdAt = createdAtObj;

  return SaleEntry.sum('totalCostPrice', { where: whereObj }) || 0;
};

module.exports = reportController;
