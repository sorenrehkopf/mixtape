'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    displayName: DataTypes.STRING,
    displayPhoto: DataTypes.STRING,
    spotifyId: DataTypes.STRING,
    spotifyAccessToken: DataTypes.STRING,
    spotifyRefreshToken: DataTypes.STRING
  });

  User.associate = function(models) {
    User.hasMany(models.Song, { foreignKey: 'userId' });
  };

  return User;
};