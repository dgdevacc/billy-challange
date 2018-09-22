module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('item', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },

    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },

    sku: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
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

  down: queryInterface => queryInterface.dropTable('item'),
};
