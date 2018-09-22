const {
  Item, Sale, SaleEntry, Inventory,
} = require('../models');

function getItem(sku) {
  return Item.find({ where: { sku } });
}

function getInventory(id) {
  return Inventory.findById(id);
}

module.exports = {
  up: async () => {
    // Get items
    const item1 = await getItem('ballpens01');

    // Get item inventories (hard coding)
    const inventory1 = await getInventory(1); // quantity = 200
    const inventory2 = await getInventory(2); // quantity = 250

    // Create sales 1
    const sale1 = await Sale.create({
      itemId: item1.id,
      quantity: 50,
      price: 20, // change it as you like
      createdAt: '2016-01-03 12:00:00 +00:00',
      updatedAt: '2016-01-03 12:00:00 +00:00',
    }).catch(err => err);

    // Create entries for sale 1
    await SaleEntry.create({
      itemId: item1.id,
      purchaseId: inventory1.purchaseId,
      quantity: 50,
      costPrice: inventory1.costPrice,
      saleId: sale1.id,
      createdAt: '2016-01-03 12:00:00 +00:00',
      updatedAt: '2016-01-03 12:00:00 +00:00',
    });

    await inventory1.update({ quantity: 150 }); // 200 - 50


    // Create sale 2
    const sale2 = await Sale.create({
      itemId: item1.id,
      quantity: 225,
      price: 25, // change it as you like
      createdAt: '2016-01-08 12:00:00 +00:00',
      updatedAt: '2016-01-08 12:00:00 +00:00',
    }).catch(err => err);

    // Create entries for sale 2
    await SaleEntry.create({
      itemId: item1.id,
      purchaseId: inventory1.purchaseId,
      quantity: 75,
      costPrice: inventory1.costPrice,
      saleId: sale2.id,
      createdAt: '2016-01-08 12:00:00 +00:00',
      updatedAt: '2016-01-08 12:00:00 +00:00',
    });

    await inventory1.destroy(); // 150 - 150 (75 remaining for next entry)

    await SaleEntry.create({
      itemId: item1.id,
      purchaseId: inventory2.purchaseId,
      quantity: 75,
      costPrice: inventory2.costPrice,
      saleId: sale2.id,
      createdAt: '2016-01-08 12:00:00 +00:00',
      updatedAt: '2016-01-08 12:00:00 +00:00',
    });

    await inventory2.update({ quantity: 75 }); // 150 - 75


    // Create sale 3
    const sale3 = await Sale.create({
      itemId: item1.id,
      quantity: 50,
      price: 16, // change it as you like
      createdAt: '2016-01-11 12:00:00 +00:00',
      updatedAt: '2016-01-11 12:00:00 +00:00',
    }).catch(err => err);

    // Create entries for sale 3
    await SaleEntry.create({
      itemId: item1.id,
      purchaseId: inventory2.purchaseId,
      quantity: 50,
      costPrice: inventory2.costPrice,
      saleId: sale3.id,
      createdAt: '2016-01-11 12:00:00 +00:00',
      updatedAt: '2016-01-11 12:00:00 +00:00',
    });

    await inventory2.update({ quantity: 25 }); // 75 - 50
  },

  down: queryInterface => queryInterface.bulkDelete('sale', null, {}),
};
