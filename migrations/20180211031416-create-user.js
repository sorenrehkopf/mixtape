'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      displayName: {
        type: Sequelize.STRING
      },
      displayPhoto: {
        type: Sequelize.STRING(500)
      },
      settings: {
        type: Sequelize.JSONB,
        defaultValue: {}
      },
      spotifyAccessToken: {
        type: Sequelize.STRING
      },
      spotifyId: {
        type: Sequelize.STRING
      },
      spotifyRefreshToken: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};