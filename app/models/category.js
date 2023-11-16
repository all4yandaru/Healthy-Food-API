"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const categoryproduct = sequelize.define(
    "categoryproducts",
    {},
    { timestamps: false, tableName: "categoryproducts" }
  );
  class category extends Model {
    static associate(models) {
      models.category.belongsToMany(models.product, {
        through: categoryproduct,
      });
    }
  }
  category.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "category",
    }
  );
  return category;
};
