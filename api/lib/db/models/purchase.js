module.exports = (sequelize, DataTypes) => {
  /*
    MODEL DEFINITION
  */

  const Purchase = sequelize.define('Purchase', { // properties

    itemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'item',
        key: 'id',
        as: 'itemId',
      },
    },

    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },

  }, { // options
    freezeTableName: true,
    tableName: 'purchase',
  });

  /*
    ASSOCIATIONS
  */

  Purchase.associate = (models) => {
    Purchase.belongsTo(models.Item, {
      foreignKey: 'itemId',
      onDelete: 'CASCADE',
      as: 'item',
    });

    Purchase.hasMany(models.Inventory, {
      foreignKey: 'purchaseId',
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


  return Purchase;
};
