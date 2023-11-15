"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class cartitem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.cartitem.belongsTo(models.product);
      models.cartitem.belongsTo(models.user);
    }
  }
  cartitem.init(
    {
      userId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
      note: DataTypes.TEXT,
      productId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "cartitem",
    }
  );
  return cartitem;
};
