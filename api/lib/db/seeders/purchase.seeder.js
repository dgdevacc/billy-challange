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
      price: 10,
      createdAt: '2016-01-01 12:00:00 +00:00',
      updatedAt: '2016-01-01 12:00:00 +00:00',
    });
    const purchase2 = await Purchase.create({
      itemId: item1.id,
      quantity: 250,
      price: 15,
      createdAt: '2016-01-05 12:00:00 +00:00',
      updatedAt: '2016-01-05 12:00:00 +00:00',
    });
    const purchase3 = await Purchase.create({
      itemId: item1.id,
      quantity: 150,
      price: 12.5,
      createdAt: '2016-01-10 12:00:00 +00:00',
      updatedAt: '2016-01-10 12:00:00 +00:00',
    });

    // Add them to inventory
    await Inventory.create({
      itemId: item1.id,
      purchaseId: purchase1.id,
      costPrice: purchase1.price,
      quantity: purchase1.quantity,
    });

    await Inventory.create({
      itemId: item1.id,
      purchaseId: purchase2.id,
      costPrice: purchase2.price,
      quantity: purchase2.quantity,
    });

    await Inventory.create({
      itemId: item1.id,
      purchaseId: purchase3.id,
      costPrice: purchase3.price,
      quantity: purchase3.quantity,
    });
  },

  down: queryInterface => queryInterface.bulkDelete('purchase', null, {}),
};
