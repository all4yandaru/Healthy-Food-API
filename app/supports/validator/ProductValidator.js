const { check } = require("express-validator");
const { product } = require("../../models");
const Validator = require("../Validator");
const express = require("express");

class ProductAddValidator extends Validator {
  rules = [
    check("name")
      .notEmpty()
      .isLength({ min: 1, max: 255 })
      .custom(async (value) => {
        const checkCategory = await product.findOne({ where: { name: value } });
        if (checkCategory !== null) {
          throw Error(`Product with name ${value} is already used`);
        }
      }),

    check("calories")
      .notEmpty()
      .isInt({ min: 1 })
      .withMessage("calories must be minimum 1"),

    check("description")
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage("description must be minimum 1 characters"),

    check("price")
      .notEmpty()
      .isInt({ min: 500 })
      .withMessage("calories must be minimum Rp 500"),

    check("rating")
      .notEmpty()
      .isInt({ min: 1, max: 100 })
      .withMessage("calories must be between 1 and 100"),

    check("stock")
      .notEmpty()
      .isInt({ min: 1 })
      .withMessage("calories must be minimum 1"),
  ];
}

class ProductUpdateValidator extends Validator {
  rules = [
    check("name")
      .notEmpty()
      .isLength({ min: 1, max: 255 })
      .withMessage("name must be between 1 and 255 characters"),

    check("calories")
      .notEmpty()
      .isInt({ min: 1 })
      .withMessage("calories must be minimum 1"),

    check("description")
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage("description must be minimum 1 characters"),

    check("price")
      .notEmpty()
      .isInt({ min: 500 })
      .withMessage("calories must be minimum Rp 500"),

    check("rating")
      .notEmpty()
      .isInt({ min: 1, max: 100 })
      .withMessage("calories must be between 1 and 100"),

    check("stock")
      .notEmpty()
      .isInt({ min: 1 })
      .withMessage("calories must be minimum 1"),
  ];
}

module.exports = { ProductAddValidator, ProductUpdateValidator };
