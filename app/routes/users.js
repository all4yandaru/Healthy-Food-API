const express = require("express");
const { user, token } = require("../models");
const router = express.Router();
const allowedTo = require("../constants/permissions");
const { tokenAuth } = require("../middlewares/tokenAuth");
const { permissionCheck } = require("../middlewares/permissionAuth");
const {
  UserRegisterValidator,
  UserUpdateValidator,
} = require("../supports/validator/UserValidator");
const bcrypt = require("bcrypt");
require("dotenv").config();

// REGISTER ===============================================================================
router.post(
  "/register",
  new UserRegisterValidator().validate(),
  async (req, res) => {
    const roleId = req.body.roleId;
    if (roleId != 1 && roleId != 2) {
      res.send("role must be 1 or 2");
    }
    req.body.createdAt = new Date();
    req.body.updatedAt = new Date();
    await user.create(req.body).then(() => {
      res.status(200).send("user added successfully");
    });
  }
);

// NEED AUTHORIZATION =====================================================================
router.use(tokenAuth);

// GET ALL USERS (ADMIN ONLY) =============================================================
router.get(
  "/getAll",
  permissionCheck(allowedTo.BROWSE_USERS),
  async (req, res) => {
    await user.findAll({ include: "role" }).then((users) => {
      res.json(users);
    });
  }
);

// GET OWN USER DATA BY ID ================================================================
router.get("/", async (req, res) => {
  // get token data
  const tokenData = await token.findOne({
    where: { token: req.headers["authorization"] },
    include: "user",
  });

  await user
    .scope("withPassword")
    .findOne({ where: { id: tokenData.user.id } })
    .then((val) => res.json(val));
});

// UPDATE USER BY ID ===================================================================
router.put("/:id", new UserUpdateValidator().validate(), async (req, res) => {
  // mendapatkan user data dari token
  const tokenData = await token.findOne({
    where: { token: req.headers["authorization"] },
    include: "user",
  });

  const userData = await user
    .scope("withPassword")
    .findOne({ where: { id: tokenData.user.id } });

  if (userData.email != req.body.email) {
    const checkEmail = await user.findOne({
      where: { email: req.body.email },
    });
    if (checkEmail !== null) {
      res.send("email has been already used");
    } else {
      userData.name = req.body.name;
      userData.phone = req.body.phone;
      userData.updatedAt = new Date();
      userData.email = req.body.email;
      await userData.save();
      res.send("Data Updated");
    }
  } else {
    userData.name = req.body.name;
    userData.phone = req.body.phone;
    userData.updatedAt = new Date();
    userData.email = req.body.email;
    await userData.save();
    res.send("Data Updated");
  }
});

module.exports = router;
