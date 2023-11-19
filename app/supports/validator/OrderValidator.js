const { check } = require("express-validator");
const { order } = require("../../models");
const Validator = require("../Validator");
const express = require("express");

class OrderAddValidator extends Validator {
  rules = [
    // check("paymentStatus")
    //   .notEmpty.isLength({ min: 1, max: 255 })
    //   .withMessage("payment status must be between 1 and 255 characters"),
    // status: waiting for order, waiting for payment, canceled, paid

    check("paymentMethod")
      .notEmpty()
      .isLength({ min: 1, max: 255 })
      .withMessage("payment method must be between 1 and 255 characters"),
    // method: cash, transfer, credit card, e-wallet
  ];
}

module.exports = { OrderAddValidator };
