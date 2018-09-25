module.exports = (sequelize, DataTypes) => {
  /*
    MODEL DEFINITION
  */

  const Inventory = sequelize.define('Inventory', { // properties

    itemId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'item',
        key: 'id',
        as: 'itemId',
      },
    },

    purchaseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'purchase',
        key: 'id',
        as: 'purchaseId',
      },
    },

    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    costPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

  }, { // options
    freezeTableName: true,
    tableName: 'inventory',
  });

  /*
    ASSOCIATIONS
  */

  Inventory.associate = (models) => {
    Inventory.belongsTo(models.Purchase, {
      foreignKey: 'purchaseId',
      onDelete: 'CASCADE',
      as: 'purchase',
    });
  };

  /*
    INSTANCE METHODS
  */


  /*
    HOOK METHODS
  */


  return Inventory;
};
