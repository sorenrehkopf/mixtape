'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    displayName: DataTypes.STRING,
    displayPhoto: DataTypes.STRING,
    spotifyId: DataTypes.STRING,
    spotifyAccessToken: DataTypes.STRING,
    spotifyRefreshToken: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.User.hasMany(models.Song, { as: 'songs' });
      }
    }
  });
  return User;
};