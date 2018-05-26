'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all[
      queryInterface.addColumn('Songs', 'acousticness', {
        type: Sequelize.FLOAT
      }),
      queryInterface.addColumn('Songs', 'instrumentalness', {
        type: Sequelize.FLOAT
      })
    ]
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all[
      queryInterface.dropColumn('Songs', 'acousticness'),
      queryInterface.dropColumn('Songs', 'instrumentalness')
    ]
  }
};
