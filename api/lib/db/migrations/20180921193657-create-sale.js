module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('sale', {
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

    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },

    price: {
      type: Sequelize.DOUBLE,
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

  down: queryInterface => queryInterface.dropTable('sale'),
};
