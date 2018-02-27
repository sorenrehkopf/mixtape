'use strict';
module.exports = (sequelize, DataTypes) => {
  var Song = sequelize.define('Song', {
    name: DataTypes.STRING,
    artistName: DataTypes.STRING,
    albumName: DataTypes.STRING,
    energy: DataTypes.FLOAT,
    tempo: DataTypes.FLOAT,
    key: DataTypes.STRING,
    valence: DataTypes.FLOAT,
    danceability: DataTypes.FLOAT,
    loudness: DataTypes.FLOAT,
    tags: DataTypes.JSONB
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Song;
};