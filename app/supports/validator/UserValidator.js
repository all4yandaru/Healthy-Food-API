const { check } = require("express-validator");
const { user } = require("../../models");
const Validator = require("../Validator");
const express = require("express");

class UserRegisterValidator extends Validator {
  rules = [
    check("name")
      .notEmpty()
      .isLength({ min: 1, max: 255 })
      .withMessage("Name must be between 1 and 255 characters"),

    check("email")
      .notEmpty()
      .isEmail()
      .isLength({ min: 1, max: 255 })
      .custom(async (email) => {
        const checkEmail = await user.findOne({ where: { email: email } });
        if (checkEmail !== null) {
          throw Error(`email ${email} is already used`);
        }
      }),

    check("password")
      .notEmpty()
      .isLength({ min: 1, max: 255 })
      .withMessage("Password must be between 1 and 255 characters"),

    check("phone")
      .notEmpty()
      .isLength({ min: 12, max: 13 })
      .withMessage("phone must be between 12 and 13 numbers"),

    check("roleId")
      .notEmpty()
      .isNumeric()
      .withMessage("role id must be between 1 and 2 numbers"),
  ];
}

class UserUpdateValidator extends Validator {
  rules = [
    check("name")
      .notEmpty()
      .isLength({ min: 1, max: 255 })
      .withMessage("Name must be between 1 and 255 characters"),

    check("email")
      .notEmpty()
      .isEmail()
      .isLength({ min: 1, max: 255 })
      .withMessage("Email must be between 1 and 255 characters"),

    check("password")
      .notEmpty()
      .isLength({ min: 1, max: 255 })
      .withMessage("Password must be between 1 and 255 characters"),

    check("phone")
      .notEmpty()
      .isLength({ min: 12, max: 13 })
      .withMessage("phone must be between 12 and 13 numbers"),
  ];
}

module.exports = { UserRegisterValidator, UserUpdateValidator };
