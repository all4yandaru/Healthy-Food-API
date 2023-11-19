const { check } = require("express-validator");
const { order } = require("../../models");
const Validator = require("../Validator");
const express = require("express");

class PaymentAddValidator extends Validator {
  rules = [
    check("paymentMethod")
      .notEmpty()
      .isLength({ min: 1, max: 255 })
      .withMessage("payment method must be between 1 and 255 characters"),

    check("amount")
      .notEmpty()
      .isInt({ min: 1 })
      .withMessage("amount must be minimum 1"),
  ];
}

module.exports = { PaymentAddValidator };
