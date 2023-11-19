const { check } = require("express-validator");
const { order } = require("../../models");
const Validator = require("../Validator");
const express = require("express");

class OrderItemAddValidator extends Validator {
  rules = [
    check("cartId")
      .notEmpty()
      .isInt({ min: 1 })
      .withMessage("cart id must be minimum 1"),

    check("orderId")
      .notEmpty()
      .isInt({ min: 1 })
      .withMessage("cart id must be minimum 1"),
  ];
}

class OrderItemUpdateValidator extends Validator {
  rules = [
    check("review")
      .notEmpty()
      .isLength({ min: 1 })
      .withMessage("review must be added"),
  ];
}

module.exports = { OrderItemAddValidator, OrderItemUpdateValidator };
