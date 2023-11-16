"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const permissionrole = sequelize.define(
    "permissionroles",
    {},
    { timestamps: false, tableName: "permissionroles" }
  );
  class permission extends Model {
    static associate(models) {
      models.permission.belongsToMany(models.role, { through: permissionrole });
    }
  }
  permission.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "permission",
    }
  );
  return permission;
};
