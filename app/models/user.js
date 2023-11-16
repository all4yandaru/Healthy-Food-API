"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
require("dotenv").config();
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    static associate(models) {
      models.user.hasMany(models.cartitem);
      models.user.hasMany(models.order);
      models.user.hasMany(models.token);
      models.user.belongsTo(models.role);
    }
  }
  user.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      phone: DataTypes.STRING,
      roleId: DataTypes.INTEGER,
    },
    {
      defaultScope: {
        attributes: { exclude: ["password"] },
      },
      scopes: {
        withPassword: {
          attributes: {},
        },
      },
      sequelize,
      modelName: "user",
    }
  );
  user.beforeCreate((user, options) => {
    return bcrypt
      .hash(user.password, parseInt(process.env.BCRYPT_ROUND) || 10)
      .then((hash) => {
        user.password = hash;
      })
      .catch((Err) => {
        throw new Error();
      });
  });

  return user;
};
