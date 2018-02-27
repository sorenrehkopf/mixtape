'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Songs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      artistName: {
        type: Sequelize.STRING
      },
      albumName: {
        type: Sequelize.STRING
      },
      energy: {
        type: Sequelize.FLOAT
      },
      tempo: {
        type: Sequelize.FLOAT
      },
      key: {
        type: Sequelize.STRING
      },
      valence: {
        type: Sequelize.FLOAT
      },
      danceability: {
        type: Sequelize.FLOAT
      },
      loudness: {
        type: Sequelize.FLOAT
      },
      tags: {
        type: Sequelize.JSONB
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
    return queryInterface.dropTable('Songs');
  }
};