'use strict';
module.exports = (sequelize, DataTypes) => {
  const timelog = sequelize.define('timelog', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    num: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    date: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  timelog.associate = function(models) {
    // associations can be defined here
  };
  return timelog;
};
