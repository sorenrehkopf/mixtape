'use strict';
module.exports = (sequelize, DataTypes) => {
  const SongTag = sequelize.define('SongTag', {
    songId: DataTypes.INTEGER,
    tagId: DataTypes.INTEGER,
    value: DataTypes.JSONB
  });

  return SongTag;
};