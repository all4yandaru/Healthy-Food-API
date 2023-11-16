"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const categoryproduct = sequelize.define(
    "categoryproducts",
    {},
    { timestamps: false, tableName: "categoryproducts" }
  );
  class product extends Model {
    static associate(models) {
      models.product.belongsToMany(models.category, {
        through: categoryproduct,
      });
      models.product.hasMany(models.cartitem);
      models.product.hasMany(models.orderitem);
    }
  }
  product.init(
    {
      name: DataTypes.STRING,
      calories: DataTypes.INTEGER,
      description: DataTypes.TEXT,
      price: DataTypes.INTEGER,
      rating: DataTypes.INTEGER,
      stock: DataTypes.INTEGER,
      image: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "product",
    }
  );
  return product;
};
