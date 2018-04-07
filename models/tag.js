'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER
  });

  Tag.associate = function(models) {
    Tag.belongsTo(models.User, { foreignKey: 'userId' });
    Tag.belongsToMany(models.Song, { through: 'SongTag', foreignKey: 'tagId' })
  };

  return Tag;
};