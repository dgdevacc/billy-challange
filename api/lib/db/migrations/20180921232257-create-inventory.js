module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('inventory', {
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

    costPrice: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },

    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
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

  down: queryInterface => queryInterface.dropTable('inventory'),
};
