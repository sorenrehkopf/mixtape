'use strict';
module.exports = (sequelize, DataTypes) => {
  const Song = sequelize.define('Song', {
    albumName: DataTypes.STRING,
    artistName: DataTypes.STRING,
    danceability: DataTypes.FLOAT,
    durationFriendly: DataTypes.STRING,
    durationMs: DataTypes.INTEGER,
    energy: DataTypes.FLOAT,
    imageUrl: DataTypes.STRING,
    key: DataTypes.STRING,
    loudness: DataTypes.FLOAT,
    name: DataTypes.STRING,
    previewUrl: DataTypes.STRING,
    spotifyId: DataTypes.STRING,
    tags: DataTypes.JSONB,
    tempo: DataTypes.FLOAT,
    timeSignature: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    valence: DataTypes.FLOAT
  });

  Song.associate = function(models) {
    Song.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return Song;
};