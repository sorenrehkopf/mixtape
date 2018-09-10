'use strict';
module.exports = (sequelize, DataTypes) => {
  const Mix = sequelize.define('Mix', {
    name: DataTypes.STRING,
    parameters: DataTypes.JSONB,
    order: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    uses: DataTypes.INTEGER
  });

  Mix.associate = function(models) {
    Mix.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return Mix;
};