"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    static associate(models) {
      models.order.belongsTo(models.user);
      models.order.hasMany(models.orderitem);
    }
  }
  order.init(
    {
      userId: DataTypes.INTEGER,
      total: DataTypes.INTEGER,
      date: DataTypes.DATE,
      paymentStatus: DataTypes.STRING,
      paymentMethod: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "order",
    }
  );
  return order;
};
