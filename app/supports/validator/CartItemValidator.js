const { check } = require("express-validator");
const { cartitem } = require("../../models");
const Validator = require("../Validator");
const express = require("express");

class CartAddValidator extends Validator {
  rules = [
    check("quantity")
      .notEmpty()
      .isInt({ min: 1 })
      .withMessage("quantity must be minimum 1"),

    check("productId")
      .notEmpty()
      .isInt()
      .withMessage("productId must be minimum 1"),
  ];
}

class CartUpdateValidator extends Validator {
  rules = [
    check("quantity")
      .notEmpty()
      .isInt({ min: 1 })
      .withMessage("quantity must be minimum 1"),
  ];
}

module.exports = { CartAddValidator, CartUpdateValidator };
