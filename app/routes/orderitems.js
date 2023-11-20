const express = require("express");
const router = express.Router();
const allowedTo = require("../constants/permissions");
const { tokenAuth } = require("../middlewares/tokenAuth");
const { permissionCheck } = require("../middlewares/permissionAuth");
const { orderitem, token, cartitem, order, product } = require("../models");
const {
  OrderItemAddValidator,
  OrderItemUpdateValidator,
} = require("../supports/validator/OrderItemValidator");

router.use(tokenAuth);

// ADMIN ======================================================================
// Get All Order Items
router.get(
  "/getAll",
  permissionCheck(allowedTo.BROWSE_ORDERITEMS),
  async (req, res) => {
    await orderitem
      .findAll({ include: ["product", "order"] })
      .then((val) => res.json(val));
  }
);

// CUSTOMER ===================================================================
// Add Order Item
router.post(
  "/",
  permissionCheck(allowedTo.ADD_ORDERITEM),
  new OrderItemAddValidator().validate(),
  async (req, res) => {
    const tokenData = await token.findOne({
      where: { token: req.headers["authorization"] },
      include: "user",
    });

    const cartData = await cartitem.findOne({
      where: { id: req.body.cartId },
      include: "product",
    });

    const orderData = await order.findOne({ where: { id: req.body.orderId } });

    // cek cart ada atau engga
    // cek order data ada atau engga
    if (cartData && orderData) {
      // cocokin cart dengan id user
      // cek order dgn id user
      if (
        cartData.userId == tokenData.user.id &&
        orderData.userId == tokenData.user.id
      ) {
        // cek order status
        if (orderData.paymentStatus == "Waiting for Order") {
          // cek quantity & stock
          if (cartData.product.stock > cartData.quantity) {
            const productData = await product.findOne({
              where: { id: cartData.product.id },
            });
            // daftarin order item dgn cart data
            await orderitem
              .create({
                productId: cartData.productId,
                orderId: orderData.id,
                quantity: cartData.quantity,
              })
              .then(() => {
                // kurangi stock
                productData.stock = productData.stock - cartData.quantity;
                // edit total
                orderData.total =
                  orderData.total + cartData.quantity * productData.price;
                productData.save();
                orderData.save();
                // hapus cart item
                cartData.destroy();
              });

            res.send("order added successfully");
          } else {
            res.send("out of stock, please edit your cart");
          }
        } else {
          res.send("order has been placed");
        }
      } else {
        res.send("data is not yours");
      }
    } else {
      res.send("data not available");
    }
  }
);

// Update Order Item (review only)
router.put(
  "/:id",
  permissionCheck(allowedTo.EDIT_ORDERITEM),
  new OrderItemUpdateValidator().validate(),
  async (req, res) => {
    const tokenData = await token.findOne({
      where: { token: req.headers["authorization"] },
      include: "user",
    });

    const orderitemData = await orderitem.findOne({
      where: { id: req.params.id },
      include: "order",
    });

    // cek id
    if (orderitemData.order.userId == tokenData.user.id) {
      // cek status
      if (orderitemData.order.paymentStatus == "Payment Successfull") {
        orderitemData.review = req.body.review;
        orderitemData.save();
        res.send("reveiw added");
      } else {
        res.send("your order is not completed yet");
      }
    } else {
      res.send("you dont have this order");
    }
  }
);

module.exports = router;
