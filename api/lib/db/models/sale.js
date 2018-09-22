module.exports = (sequelize, DataTypes) => {
  /*
    MODEL DEFINITION
  */

  const Sale = sequelize.define('Sale', { // properties

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
    tableName: 'sale',
  });

  /*
    ASSOCIATIONS
  */

  Sale.associate = (models) => {
    Sale.hasMany(models.SaleEntry, {
      foreignKey: 'saleId',
      onDelete: 'CASCADE',
      as: 'saleEntries',
    });
  };

  /*
    INSTANCE METHODS
  */


  /*
    HOOK METHODS
  */


  return Sale;
};
