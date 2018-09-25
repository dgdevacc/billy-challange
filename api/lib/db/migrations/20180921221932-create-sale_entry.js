module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('sale_entry', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },

    itemId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'item',
        key: 'id',
        as: 'itemId',
      },
    },

    purchaseId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'purchase',
        key: 'id',
        as: 'purchaseId',
      },
    },

    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },

    costPrice: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },

    totalCostPrice: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },

    saleId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'sale',
        key: 'id',
        as: 'saleId',
      },
    },

    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },

    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  }),

  down: queryInterface => queryInterface.dropTable('sale_entry'),
};
