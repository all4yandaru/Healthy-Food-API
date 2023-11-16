"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const permissionrole = sequelize.define(
    "permissionroles",
    {},
    { timestamps: false, tableName: "permissionroles" }
  );
  class role extends Model {
    static associate(models) {
      models.role.belongsToMany(models.permission, { through: permissionrole });
      models.role.hasMany(models.user);
    }
  }
  role.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "role",
    }
  );
  return role;
};
