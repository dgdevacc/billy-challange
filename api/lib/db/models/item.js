module.exports = (sequelize, DataTypes) => {
  /*
    MODEL DEFINITION
  */

  const Item = sequelize.define('Item', { // properties

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    sku: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

  }, { // options
    freezeTableName: true,
    tableName: 'item',
  });

  /*
    ASSOCIATIONS
  */

  Item.associate = (models) => {
    Item.hasMany(models.Sale, {
      foreignKey: 'itemId',
      onDelete: 'CASCADE',
      as: 'sales',
    });

    Item.hasMany(models.SaleEntry, {
      foreignKey: 'itemId',
      onDelete: 'CASCADE',
      as: 'saleEntries',
    });

    Item.hasMany(models.Purchase, {
      foreignKey: 'itemId',
      onDelete: 'CASCADE',
      as: 'purchases',
    });

    Item.hasMany(models.Inventory, {
      foreignKey: 'itemId',
      onDelete: 'CASCADE',
      as: 'inventories',
    });
  };

  /*
    INSTANCE METHODS
  */


  /*
    HOOK METHODS
  */


  return Item;
};
