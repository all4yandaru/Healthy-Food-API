const express = require("express");
const router = express.Router();
const allowedTo = require("../constants/permissions");
const { tokenAuth } = require("../middlewares/tokenAuth");
const { permissionCheck } = require("../middlewares/permissionAuth");
const { order, token } = require("../models");
const { OrderAddValidator } = require("../supports/validator/OrderValidator");

router.use(tokenAuth);

// ADMIN ==========================================================================
// Get All Order Data
router.get(
  "/getAll",
  permissionCheck(allowedTo.BROWSE_ORDERS),
  async (req, res) => {
    await order
      .findAll({
        include: ["user", "orderitems"],
      })
      .then((val) => res.json(val));
  }
);

// CUSTOMER =======================================================================
// Get Order Data
router.get("/", permissionCheck(allowedTo.READ_ORDER), async (req, res) => {
  const tokenData = await token.findOne({
    where: { token: req.headers["authorization"] },
    include: "user",
  });

  await order
    .findAll({
      where: { userId: tokenData.user.id },
    })
    .then((val) => res.json(val));
});

// Get Order Detail
router.get("/:id", permissionCheck(allowedTo.READ_ORDER), async (req, res) => {
  const tokenData = await token.findOne({
    where: { token: req.headers["authorization"] },
    include: "user",
  });

  await order
    .findOne({
      where: { id: req.params.id, userId: tokenData.user.id },
      include: ["user", "orderitems"],
    })
    .then((val) => {
      if (val != null) {
        res.json(val);
      } else {
        res.send("Data not available");
      }
    });
});

// Add Order Data
router.post(
  "/",
  permissionCheck(allowedTo.ADD_ORDER),
  new OrderAddValidator().validate(),
  async (req, res) => {
    const tokenData = await token.findOne({
      where: { token: req.headers["authorization"] },
      include: "user",
    });

    // buat order
    await order
      .create({
        userId: tokenData.user.id,
        total: 0,
        date: new Date(),
        paymentStatus: "waiting for order",
        paymentMethod: req.body.paymentMethod,
      })
      .then(async (val) => {
        res.json({ orderId: val.id, message: `your order id is ${val.id}` });
      });
  }
);

// Update Order Data

module.exports = router;
