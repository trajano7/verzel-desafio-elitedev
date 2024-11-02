'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Favorite', {
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'User',
          key: 'user_id',
        },
        onDelete: 'CASCADE',
        primaryKey: true,
      },
      movie_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'Movie',
          key: 'movie_id',
        },
        onDelete: 'CASCADE',
        primaryKey: true,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Favorite');
  },
};
