const express = require("express");
const { product } = require("../models");
const router = express.Router();
const allowedTo = require("../constants/permissions");
const { tokenAuth } = require("../middlewares/tokenAuth");
const { permissionCheck } = require("../middlewares/permissionAuth");
const {
  ProductAddValidator,
  ProductUpdateValidator,
} = require("../supports/validator/ProductValidator");

router.use(tokenAuth);

// Customer & Admin ============================================================
// read all products
router.get("/", async (req, res) => {
  await product.findAll({ include: "categories" }).then((val) => {
    res.json(val);
  });
});

// read product detail
router.get("/:id", async (req, res) => {
  await product
    .findOne({ where: { id: req.params.id }, include: "categories" })
    .then((val) => {
      res.json(val);
    });
});

// Admin =======================================================================
// add product
router.post(
  "/",
  permissionCheck(allowedTo.ADD_PRODUCT),
  new ProductAddValidator().validate(),
  async (req, res) => {
    await product.create(req.body).then((val) => res.json(val));
  }
);

// update product
router.put(
  "/:id",
  permissionCheck(allowedTo.EDIT_PRODUCT),
  new ProductUpdateValidator().validate(),
  async (req, res) => {
    const productData = await product.findOne({ where: { id: req.params.id } });

    if (productData != null) {
      // update here
      if (productData.name != req.body.name) {
        const checkProduct = await product.findOne({
          where: { name: req.body.name },
        });
        if (checkProduct != null) {
          res.send("product name has been already used");
        } else {
          productData.name = req.body.name;
          productData.calories = req.body.calories;
          productData.description = req.body.description;
          productData.price = req.body.price;
          productData.rating = req.body.rating;
          productData.stock = req.body.stock;
          productData.image = req.body.image;
          productData.save();
          res.send("Data Updated");
        }
      } else {
        productData.name = req.body.name;
        productData.calories = req.body.calories;
        productData.description = req.body.description;
        productData.price = req.body.price;
        productData.rating = req.body.rating;
        productData.stock = req.body.stock;
        productData.image = req.body.image;
        productData.save();
        res.send("Data Updated");
      }
    } else {
      res.send("Product doesn't exist");
    }
  }
);

// delete product
router.delete(
  "/:id",
  permissionCheck(allowedTo.DELETE_PRODUCT),
  async (req, res) => {
    await product
      .findOne({ where: { id: req.params.id } })
      .then(async (val) => {
        if (val != null) {
          await product.destroy({ where: { id: req.params.id } }).then(() => {
            res.send("Product Deleted");
          });
        } else {
          res.send("Product doesn't exist");
        }
      });
  }
);

module.exports = router;
