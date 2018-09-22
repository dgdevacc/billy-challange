const { Item } = require('../models');

const data = {
  item1: {
    name: 'Ballpens',
    sku: 'ballpens01',
    createdAt: '2018-09-21 19:49:00 +00:00',
    updatedAt: '2018-09-21 19:49:00 +00:00',
  },
};

module.exports = {
  up: async () => {
    // Create items
    await Item.create(data.item1);
  },

  down: queryInterface => queryInterface.bulkDelete('item', null, {}),
};
