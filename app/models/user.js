"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {
      models.user.hasMany(models.cartitem);
      models.user.hasMany(models.order);
      models.user.hasMany(models.token);
      models.user.belongsTo(models.role);
    }
  }
  user.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      phone: DataTypes.STRING,
      roleId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return user;
};
