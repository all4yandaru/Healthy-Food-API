const express = require("express");
const { category } = require("../models");
const router = express.Router();
const allowedTo = require("../constants/permissions");
const { tokenAuth } = require("../middlewares/tokenAuth");
const { permissionCheck } = require("../middlewares/permissionAuth");
const {
  CategoryAddValidator,
} = require("../supports/validator/CategoryValidator");

router.use(tokenAuth);

router.get("/", (req, res) => {
  category.findAll().then((categories) => {
    res.json(categories);
  });
});

router.get("/:id", (req, res) => {
  category.findOne({ where: { id: req.params.id } }).then((categories) => {
    res.json(categories);
  });
});

router.post(
  "/add",
  permissionCheck(allowedTo.ADD_CATEGORY),
  new CategoryAddValidator().validate(),
  (req, res) => {
    category
      .create({ name: req.body.name })
      .then(() => res.send("add success"));
  }
);

router.put(
  "/update/:id",
  permissionCheck(allowedTo.EDIT_CATEGORY),
  new CategoryAddValidator().validate(),
  async (req, res) => {
    const categoryData = await category.findOne({
      where: { id: req.params.id },
    });

    if (categoryData != null) {
      categoryData.name = req.body.name;
      await categoryData.save();
      res.send("update success");
    } else {
      res.send("update failed, data not found");
    }
  }
);

router.delete(
  "/delete/:id",
  permissionCheck(allowedTo.DELETE_CATEGORY),
  async (req, res) => {
    await category
      .destroy({
        where: {
          id: req.params.id,
        },
      })
      .then((val) => {
        if (val != 0) {
          res.send("delete Success");
        } else {
          res.send("delete failed");
        }
      })
      .catch((err) => {
        throw Error(err);
      });
  }
);

module.exports = router;
