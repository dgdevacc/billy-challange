const _ = require('lodash');

const { sequelize } = require('./../../lib/db');
const {
  Inventory, SaleEntry, Sale, Item,
} = require('./../../lib/db').models;
const HttpError = require('./../../lib/utils/http-error');

const itemController = global.getController('item');
const reportController = {};

/**
 * Get stock quantity for an item
 */

reportController.getItemStockQuantity = async (data) => {
  await itemController.findById(data.itemId); // check if item exits

  const totalStock = await Inventory.sum('quantity', { where: { itemId: data.itemId } });
  if (!totalStock) return 0;

  return Number(totalStock);
};

/**
 * Get stock value for an item
 * @param {*} data contains itemId
 */
reportController.getItemStockValue = async (data) => {
  await itemController.findById(data.itemId); // check if item exits

  const stock = await Item.find({
    where: { id: data.itemId },
    group: ['Item.id'],

    attributes: [
      [sequelize.literal('SUM(inventories."costPrice" * inventories.quantity )'), 'value'],
    ],

    include: [{
      model: Inventory,
      as: 'inventories',
      attributes: [],
    }],

    raw: true,
  });

  if (!stock || !stock.value) return 0;

  return Number(stock.value);
};

/**
 * Get cost value for one sale
 * @param {Number} saleId
 */
reportController.getSaleCost = async (saleId) => {
  const sale = await Sale.findOne({
    where: { id: saleId },
    group: ['Sale.id'],

    attributes: [
      [sequelize.literal('SUM("saleEntries"."costPrice" * "saleEntries".quantity )'), 'totalCostValue'],
    ],

    include: [{
      model: SaleEntry,
      as: 'saleEntries',
      attributes: [],
    }],

    raw: true,
  });

  if (!sale) throw new HttpError('Not Found', 'Sale not found', 404);

  return Number(sale.totalCostValue);
};

/**
 * Get sales cost for an item
 * @param {*} data contains itemId
 */
reportController.getItemSalesCost = async (data) => {
  await itemController.findById(data.itemId); // check if item exits

  const salesCost = await Sale.findAll({
    where: { itemId: data.itemId },
    group: ['Sale.id'],
    attributes: [
      [sequelize.literal('SUM("saleEntries"."costPrice" * "saleEntries".quantity )'), 'costValue'],
    ],

    include: [{
      model: SaleEntry,
      as: 'saleEntries',
      attributes: [],
    }],

    raw: true,
  }).then(sales => _.sumBy(sales, sale => Number(sale.costValue)));

  return Number(salesCost);
};

module.exports = reportController;
