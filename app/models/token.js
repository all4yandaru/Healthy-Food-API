"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class token extends Model {
    static associate(models) {
      models.token.belongsTo(models.user);
    }
  }
  token.init(
    {
      token: DataTypes.STRING,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "token",
    }
  );
  return token;
};
