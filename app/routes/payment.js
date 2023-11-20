const express = require("express");
const router = express.Router();
const allowedTo = require("../constants/permissions");
const { tokenAuth } = require("../middlewares/tokenAuth");
const { permissionCheck } = require("../middlewares/permissionAuth");
const { order, token } = require("../models");
const {
  PaymentAddValidator,
} = require("../supports/validator/PaymentValidator");

router.use(tokenAuth);

// lock order
router.post(
  "/order/:id",
  permissionCheck(allowedTo.EDIT_ORDER),
  async (req, res) => {
    const tokenData = await token.findOne({
      where: { token: req.headers["authorization"] },
      include: "user",
    });

    const orderData = await order.findOne({
      where: { id: req.params.id, userId: tokenData.user.id },
    });

    // cek ada order atau engga
    if (orderData) {
      // cek status order
      if (orderData.paymentStatus == "Waiting for Order") {
        // ubah status dan date check out
        orderData.paymentStatus = "Waiting for Payment";
        orderData.save();
        res.send("Your order has been placed");
      } else {
        res.send(
          `this order has been placed with status ${orderData.paymentStatus}`
        );
      }
    } else {
      res.send("payment failed, you don't have this order");
    }
  }
);

// pay
router.post(
  "/pay/:id",
  permissionCheck(allowedTo.EDIT_ORDER),
  new PaymentAddValidator().validate(),
  async (req, res) => {
    const tokenData = await token.findOne({
      where: { token: req.headers["authorization"] },
      include: "user",
    });

    const orderData = await order.findOne({
      where: { id: req.params.id, userId: tokenData.user.id },
    });

    // cek ada order atau engga
    if (orderData) {
      // cek statusnya
      if (orderData.paymentStatus == "Waiting for Payment") {
        // cek methodnya sama atau engga
        if (orderData.paymentMethod == req.body.paymentMethod) {
          // cek total & amount
          if (req.body.amount >= orderData.total) {
            // ganti status ke Payment Successfull
            orderData.paymentStatus = "Payment Successfull";
            orderData.save();
            const change = req.body.amount - orderData.total;
            res.send(`your change is ${change}, thank you :)`);
          } else {
            res.send("payment failed, you don't have enough money");
          }
        } else {
          res.send("payment failed, your payment method is different");
        }
      } else {
        res.send(`this order has status ${orderData.paymentStatus}`);
      }
    } else {
      res.send("payment failed, you don't have this order");
    }
  }
);

module.exports = router;
