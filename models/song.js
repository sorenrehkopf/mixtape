'use strict';
module.exports = (sequelize, DataTypes) => {
  var Song = sequelize.define('Song', {
    name: DataTypes.STRING,
    artistName: DataTypes.STRING,
    albumName: DataTypes.STRING,
    durationFriendly: DataTypes.STRING,
    durationMs: DataTypes.INTEGER,
    energy: DataTypes.FLOAT,
    imageUrl: DataTypes.STRING,
    previewUrl: DataTypes.STRING,
    tempo: DataTypes.FLOAT,
    timeSignature: DataTypes.STRING,
    key: DataTypes.STRING,
    valence: DataTypes.FLOAT,
    danceability: DataTypes.FLOAT,
    loudness: DataTypes.FLOAT,
    tags: DataTypes.JSONB
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.Song.belongsTo(models.User);
      }
    }
  });
  return Song;
};