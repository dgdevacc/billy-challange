const {
  Item,
  Inventory,
  Sale,
  SaleEntry,
  Purchase,
} = require('./../api/lib/db').models;

/*
 Data
*/

const data = {
  items: {},
  purchases: {},
  inventories: {},
  sales: {},
};

/*
 Seed
*/

const seedData = async () => {
  // Create items
  data.items.item1 = await Item.create({
    name: 'Ballpens',
    sku: 'ballpens01',
    createdAt: '2015-12-25 00:00:00 +00:00',
    updatedAt: '2015-12-25 00:00:00 +00:00',
  });

  data.items.item2 = await Item.create({
    name: 'Jacket',
    sku: 'jacket01',
    createdAt: '2018-09-21 20:49:00 +00:00',
    updatedAt: '2018-09-21 20:49:00 +00:00',
  });

  data.items.item3 = await Item.create({
    name: 'PlayStation 5',
    sku: 'ps5',
    createdAt: '2018-09-21 23:24:00 +00:00',
    updatedAt: '2018-09-21 23:24:00 +00:00',
  });

  // Make purchases
  data.purchases.purchase1 = await Purchase.create({
    itemId: data.items.item1.id,
    quantity: 200,
    price: 10,
    createdAt: '2016-01-01 12:00:00 +00:00',
    updatedAt: '2016-01-01 12:00:00 +00:00',
  });

  data.purchases.purchase2 = await Purchase.create({
    itemId: data.items.item1.id,
    quantity: 250,
    price: 15,
    createdAt: '2016-01-05 12:00:00 +00:00',
    updatedAt: '2016-01-05 12:00:00 +00:00',
  });

  data.purchases.purchase3 = await Purchase.create({
    itemId: data.items.item1.id,
    quantity: 250,
    price: 15,
    createdAt: '2016-01-05 12:00:00 +00:00',
    updatedAt: '2016-01-05 12:00:00 +00:00',
  });

  data.purchases.purchase4 = await Purchase.create({
    itemId: data.items.item3.id,
    quantity: 6,
    price: 3600,
    createdAt: '2016-01-05 12:00:00 +00:00',
    updatedAt: '2016-01-05 12:00:00 +00:00',
  });

  // Add them to inventory
  data.inventories.inventory1 = await Inventory.create({
    itemId: data.items.item1.id,
    purchaseId: data.purchases.purchase1.id,
    costPrice: data.purchases.purchase1.price,
    quantity: data.purchases.purchase1.quantity,
  });

  data.inventories.inventory2 = await Inventory.create({
    itemId: data.items.item1.id,
    purchaseId: data.purchases.purchase2.id,
    costPrice: data.purchases.purchase2.price,
    quantity: data.purchases.purchase2.quantity,
  });

  data.inventories.inventory3 = await Inventory.create({
    itemId: data.items.item1.id,
    purchaseId: data.purchases.purchase3.id,
    costPrice: data.purchases.purchase3.price,
    quantity: data.purchases.purchase3.quantity,
  });

  data.inventories.inventory4 = await Inventory.create({
    itemId: data.items.item3.id,
    purchaseId: data.purchases.purchase4.id,
    costPrice: data.purchases.purchase4.price,
    quantity: data.purchases.purchase4.quantity,
  });

  // Create sales 1
  data.sales.sale1 = await Sale.create({
    itemId: data.items.item1.id,
    quantity: 50,
    price: 20, // change it as you like
    createdAt: '2016-01-03 12:00:00 +00:00',
    updatedAt: '2016-01-03 12:00:00 +00:00',
  }).catch(err => err);

  // Create entries for sale 1
  await SaleEntry.create({
    itemId: data.items.item1.id,
    purchaseId: data.inventories.inventory1.purchaseId,
    quantity: 50,
    costPrice: data.inventories.inventory1.costPrice,
    saleId: data.sales.sale1.id,
    createdAt: '2016-01-03 12:00:00 +00:00',
    updatedAt: '2016-01-03 12:00:00 +00:00',
  });

  data.inventories.inventory1 = await data.inventories.inventory1
    .update({ quantity: 150 }); // 200 - 50

  // Create sale 2
  data.sales.sale2 = await Sale.create({
    itemId: data.items.item1.id,
    quantity: 225,
    price: 25, // change it as you like
    createdAt: '2016-01-08 12:00:00 +00:00',
    updatedAt: '2016-01-08 12:00:00 +00:00',
  }).catch(err => err);

  // Create entries for sale 2
  await SaleEntry.create({
    itemId: data.items.item1.id,
    purchaseId: data.inventories.inventory1.purchaseId,
    quantity: 75,
    costPrice: data.inventories.inventory1.costPrice,
    saleId: data.sales.sale2.id,
    createdAt: '2016-01-08 12:00:00 +00:00',
    updatedAt: '2016-01-08 12:00:00 +00:00',
  });

  data.inventories.inventory1 = await data.inventories.inventory1
    .destroy(); // 150 - 150 (75 remaining for next entry)

  await SaleEntry.create({
    itemId: data.items.item1.id,
    purchaseId: data.inventories.inventory2.purchaseId,
    quantity: 75,
    costPrice: data.inventories.inventory2.costPrice,
    saleId: data.sales.sale2.id,
    createdAt: '2016-01-08 12:00:00 +00:00',
    updatedAt: '2016-01-08 12:00:00 +00:00',
  });

  data.inventories.inventory2 = await data.inventories.inventory2
    .update({ quantity: 75 }); // 150 - 75

  // Create sale 3
  data.sales.sale3 = await Sale.create({
    itemId: data.items.item1.id,
    quantity: 50,
    price: 16, // change it as you like
    createdAt: '2016-01-11 12:00:00 +00:00',
    updatedAt: '2016-01-11 12:00:00 +00:00',
  }).catch(err => err);

  // Create entries for sale 3
  await SaleEntry.create({
    itemId: data.items.item1.id,
    purchaseId: data.inventories.inventory2.purchaseId,
    quantity: 50,
    costPrice: data.inventories.inventory2.costPrice,
    saleId: data.sales.sale3.id,
    createdAt: '2016-01-11 12:00:00 +00:00',
    updatedAt: '2016-01-11 12:00:00 +00:00',
  });

  data.inventories.inventory2 = data.inventories.inventory2
    .update({ quantity: 25 }); // 75 - 50

  // Create sale 4
  data.sales.sale4 = await Sale.create({
    itemId: data.items.item3.id,
    quantity: 1,
    price: 7000,
    createdAt: '2016-01-11 12:00:00 +00:00',
    updatedAt: '2016-01-11 12:00:00 +00:00',
  }).catch(err => err);

  // Create entries for sale 4
  await SaleEntry.create({
    itemId: data.items.item3.id,
    purchaseId: data.inventories.inventory4.purchaseId,
    quantity: 1,
    costPrice: data.inventories.inventory4.costPrice,
    saleId: data.sales.sale4.id,
    createdAt: '2018-09-22 08:12:00 +00:00',
    updatedAt: '2018-09-22 08:12:00 +00:00',
  });

  data.inventories.inventory4 = await data.inventories.inventory4
    .update({ quantity: 5 }); // 6 - 1
};

/*
 Remove
*/

const removeData = async () => {
  const options = { where: {} }; // select all

  await SaleEntry.destroy(options);
  await Sale.destroy(options);
  await Inventory.destroy(options);
  await Purchase.destroy(options);
  await Item.destroy(options);
};

module.exports = {
  usedData: data,
  seedData,
  removeData,
};
