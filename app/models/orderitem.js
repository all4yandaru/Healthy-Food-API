"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class orderitem extends Model {
    static associate(models) {
      models.orderitem.belongsTo(models.product);
      models.orderitem.belongsTo(models.order);
    }
  }
  orderitem.init(
    {
      productId: DataTypes.INTEGER,
      orderId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      review: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "orderitem",
    }
  );
  return orderitem;
};
