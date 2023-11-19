const express = require("express");
const { cartitem, token, product } = require("../models");
const router = express.Router();
const allowedTo = require("../constants/permissions");
const { tokenAuth } = require("../middlewares/tokenAuth");
const { permissionCheck } = require("../middlewares/permissionAuth");
const { CartAddValidator } = require("../supports/validator/CartItemValidator");

router.use(tokenAuth);

// Admin =================================================================================
// get All Cart Data (Admin only)
router.get(
  "/getAll",
  permissionCheck(allowedTo.BROWSE_CARTITEMS),
  async (req, res) => {
    const cartData = await cartitem.findAll();
    res.json(cartData);
  }
);

// Customer ==============================================================================
// Get Cart item
router.get("/", permissionCheck(allowedTo.READ_CARTITEM), async (req, res) => {
  const tokenData = await token.findOne({
    where: { token: req.headers["authorization"] },
    include: "user",
  }); // ambil id user dari token

  cartitem
    .findAll({ where: { userId: tokenData.user.id } })
    .then((cartitem) => {
      res.json(cartitem);
    });
});

// Add Cart
router.post(
  "/",
  permissionCheck(allowedTo.ADD_CARTITEM),
  new CartAddValidator().validate(),
  async (req, res) => {
    // ambil data user
    const tokenData = await token.findOne({
      where: { token: req.headers["authorization"] },
      include: "user",
    });

    // ambil data produk
    const productData = await product.findOne({
      where: { id: req.body.productId },
    });
    if (productData != null) {
      // cek quantity & stock
      if (productData.stock > req.body.quantity) {
        /* 
        update stock product
        const stock = productData.stock - req.body.quantity;
        console.log("stock sisa: ", stock);
        productData.stock = stock;
        await productData.save(); 
        */

        // add data
        await cartitem.create({
          userId: tokenData.user.id,
          quantity: req.body.quantity,
          note: req.body.note,
          productId: productData.id,
        });
        res.send("cart added");
      } else {
        res.send("stock kurang");
      }
    } else {
      res.send("product not found");
    }
  }
);

// update cart
router.put(
  "/:id",
  permissionCheck(allowedTo.EDIT_CARTITEM),
  async (req, res) => {
    // ambil data user
    const tokenData = await token.findOne({
      where: { token: req.headers["authorization"] },
      include: "user",
    });

    // ambil data cart
    await cartitem
      .findOne({ where: { id: req.params.id, userId: tokenData.user.id } })
      .then(async (val) => {
        if (val) {
          // ambil data produk
          const productData = await product.findOne({
            where: { id: val.productId },
          });

          // cek stock & quantity
          if (productData != null) {
            if (req.body.quantity) {
              if (productData.stock > req.body.quantity) {
                // update
                val.quantity = req.body.quantity;
                val.note = req.body.note;
                val.save();
                res.send("cart updated");
              } else {
                res.send("stock kurang");
              }
            } else {
              val.note = req.body.note;
              val.save();
              res.send("cart updated");
            }
          } else {
            res.send("product not found");
          }
        } else {
          res.send("cart not found");
        }
      });
  }
);

// Delete Cart
router.delete(
  "/:id",
  permissionCheck(allowedTo.DELETE_CARTITEM),
  async (req, res) => {
    const cartData = await cartitem.findOne({
      where: { id: req.params.id },
      include: "user",
    }); // ambil id user dari parameter id dari cart item

    cartData == null ? res.send("no cart item") : 0;

    const tokenData = await token.findOne({
      where: { token: req.headers["authorization"] },
      include: "user",
    }); // ambil user id dari token

    if (cartData.user.id == tokenData.user.id) {
      // di check apakah sama idnya? jika sama maka delete success
      // jika idnya beda maka delete failed
      await cartitem.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.send("Delete Success");
    } else {
      res.send("id tidak sama");
    }
  }
);

module.exports = router;
