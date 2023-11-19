const { check } = require("express-validator");
const { order } = require("../../models");
const Validator = require("../Validator");
const express = require("express");

class OrderAddValidator extends Validator {
  rules = [
    // check("paymentStatus")
    //   .notEmpty.isLength({ min: 1, max: 255 })
    //   .withMessage("payment status must be between 1 and 255 characters"),
    // status: Waiting for Order, Waiting for Payment, Canceled, Payment Successfull, In Delivery, Delivered

    check("paymentMethod")
      .notEmpty()
      .isLength({ min: 1, max: 255 })
      .withMessage("payment method must be between 1 and 255 characters"),
    // method: Cash, DC, CC, eMoney
  ];
}

module.exports = { OrderAddValidator };
