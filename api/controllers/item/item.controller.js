const _ = require('lodash');

const { Item } = require('./../../lib/db').models;
const HttpError = require('./../../lib/utils/http-error');

const itemController = {};

/**
 * Create a new item
 * @param {array} data
 */

itemController.create = (data) => {
  const filteredData = _.pick(data, [
    'name',
    'sku',
  ]);

  return Item.create(filteredData).catch((err) => {
    if (err.name === 'SequelizeValidationError') {
      throw new HttpError('Bad Request', 'Required fields are missing', 400);
    }

    if (err.name === 'SequelizeUniqueConstraintError') {
      throw new HttpError('Bad Request', 'Duplicated SKU', 400);
    }

    throw new HttpError('Bad Request', 'Something went wrong', 400);
  });
};

/**
 * Get an item
 * @param {number} itemId
 */

itemController.findById = itemId => Item.findById(itemId).then((item) => {
  if (!item) throw new HttpError('Not Found', 'Item not found', 404);
  return item;
});

/**
 * Get all items
 */

itemController.findAll = () => Item.findAll();

/**
 * Delete an item
 * @param {number} itemId
 */

itemController.delete = itemId => Item.destroy({ where: { id: itemId } }).then((item) => {
  if (!item) throw new HttpError('Not Found', 'Item not found', 404);
  return { done: true };
});

module.exports = itemController;
