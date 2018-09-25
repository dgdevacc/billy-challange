module.exports = (sequelize, DataTypes) => {
  /*
    MODEL DEFINITION
  */

  const SaleEntry = sequelize.define('SaleEntry', { // properties

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
      type: DataTypes.DOUBLE,
      allowNull: false,
    },

    totalCostPrice: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },

    saleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'sale',
        key: 'id',
        as: 'saleId',
      },
    },

  }, { // options
    freezeTableName: true,
    tableName: 'sale_entry',
  });

  /*
    ASSOCIATIONS
  */

  SaleEntry.associate = (models) => {
    SaleEntry.belongsTo(models.Purchase, {
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


  return SaleEntry;
};
