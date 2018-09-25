const { Item, Purchase, Inventory } = require('../models');

function getItem(sku) {
  return Item.find({ where: { sku } });
}

module.exports = {
  up: async () => {
    // Get items
    const item1 = await getItem('ballpens01');

    // Make purchases
    const purchase1 = await Purchase.create({
      itemId: item1.id,
      quantity: 200,
      costPrice: 10,
      totalCostPrice: 200 * 100,
      createdAt: '2016-01-01 12:00:00 +00:00',
      updatedAt: '2016-01-01 12:00:00 +00:00',
    });

    const purchase2 = await Purchase.create({
      itemId: item1.id,
      quantity: 250,
      costPrice: 15,
      totalCostPrice: 250 * 15,
      createdAt: '2016-01-05 12:00:00 +00:00',
      updatedAt: '2016-01-05 12:00:00 +00:00',
    });

    const purchase3 = await Purchase.create({
      itemId: item1.id,
      quantity: 150,
      costPrice: 12.5,
      totalCostPrice: 150 * 12.5,
      createdAt: '2016-01-10 12:00:00 +00:00',
      updatedAt: '2016-01-10 12:00:00 +00:00',
    });

    // Add them to inventory
    await Inventory.create({
      itemId: item1.id,
      purchaseId: purchase1.id,
      quantity: purchase1.quantity,
      costPrice: purchase1.costPrice,
      createdAt: '2016-01-01 12:00:00 +00:00',
      updatedAt: '2016-01-01 12:00:00 +00:00',
    });

    await Inventory.create({
      itemId: item1.id,
      purchaseId: purchase2.id,
      quantity: purchase2.quantity,
      costPrice: purchase2.costPrice,
      createdAt: '2016-01-05 12:00:00 +00:00',
      updatedAt: '2016-01-05 12:00:00 +00:00',
    });

    await Inventory.create({
      itemId: item1.id,
      purchaseId: purchase3.id,
      quantity: purchase3.quantity,
      costPrice: purchase3.costPrice,
      createdAt: '2016-01-10 12:00:00 +00:00',
      updatedAt: '2016-01-10 12:00:00 +00:00',
    });
  },

  down: queryInterface => queryInterface.bulkDelete('purchase', null, {}),
};
