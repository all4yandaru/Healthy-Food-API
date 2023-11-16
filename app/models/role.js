"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  const permissionrole = sequelize.define(
    "permissionrole",
    {},
    { timestamps: false, tableName: "permissionrole" }
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
