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
      durationFriendly: {
        type: Sequelize.STRING
      },
      durationMs: {
        type: Sequelize.INTEGER
      },
      energy: {
        type: Sequelize.FLOAT
      },
      imageUrl: {
        type: Sequelize.STRING
      },
      previewUrl: {
        type: Sequelize.STRING
      },
      tempo: {
        type: Sequelize.FLOAT
      },
      timeSignature: {
        type: Sequelize.STRING
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