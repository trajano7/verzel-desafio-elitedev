'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Movie', {
      movie_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      release_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      rating: {
        type: Sequelize.DECIMAL(5, 4),
      },
      poster_path: {
        type: Sequelize.STRING(255),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Movie');
  },
};
