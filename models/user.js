'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    displayName: DataTypes.STRING,
    displayPhoto: DataTypes.STRING,
    settings: DataTypes.JSONB,
    spotifyId: DataTypes.STRING,
    spotifyAccessToken: DataTypes.STRING,
    spotifyRefreshToken: DataTypes.STRING
  });

  User.associate = function(models) {
    User.hasMany(models.Song, { foreignKey: 'userId' });
    User.hasMany(models.Tag, { foreignKey: 'userId' });
  };

  return User;
};