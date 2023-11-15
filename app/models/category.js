"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const categoryproduct = sequelize.define(
    "categoryproduct",
    {},
    { timestamps: false, tableName: "categoryproduct" }
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
